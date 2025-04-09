import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { validationResult } from 'express-validator';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bloodBankRoutes from './routes/bloodBankRoutes.js';
import bedsRoutes from './routes/bedsRoutes.js';
import pharmacyRoutes from './routes/pharmacyRoutes.js';
import nonmedicalstaffRoutes from './routes/NonMedicalStaffRoutes.js';
import hdoctorRoutes from './routes/hdoctorRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();
const app = express();

// Set up __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Increase JSON payload size limit
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Update CORS configuration for both development and production
app.use(cors({
    origin: ['http://localhost:5173', 'https://medaccess.onrender.com', 'https://medaccess-frontend.onrender.com'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root route with detailed server info
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'MedAccess API is running', 
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    mongodb_connected: mongoose.connection.readyState === 1,
    server_time: new Date().toISOString(),
    endpoints: [
      '/api/auth',
      '/api/blood-bank',
      '/api/beds',
      '/api/hospitaldoctors',
      '/api/users',
      '/api/pharmacy',
      '/api/nonmedicalstaff',
      '/api/dashboard'
    ]
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// MongoDB Connection with improved error handling
console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch((err) => {
      console.error('MongoDB Connection Error:', err.message);
      // Don't fail the server if DB connection fails - helps with debugging
    });

// Import routes with try-catch to identify problematic imports
try {
  const authRoutes = (await import('./routes/authRoutes.js')).default;
  const userRoutes = (await import('./routes/userRoutes.js')).default;
  const bloodBankRoutes = (await import('./routes/bloodBankRoutes.js')).default;
  const bedsRoutes = (await import('./routes/bedsRoutes.js')).default;
  const pharmacyRoutes = (await import('./routes/pharmacyRoutes.js')).default;
  const nonmedicalstaffRoutes = (await import('./routes/NonMedicalStaffRoutes.js')).default;
  const hdoctorRoutes = (await import('./routes/hdoctorRoutes.js')).default;
  const dashboardRoutes = (await import('./routes/dashboardRoutes.js')).default;

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/blood-bank', bloodBankRoutes);
  app.use('/api/beds', bedsRoutes);
  app.use('/api/hospitaldoctors', hdoctorRoutes);
  app.use('/api/users', userRoutes);
  app.use("/api/pharmacy", pharmacyRoutes);
  app.use("/api/nonmedicalstaff", nonmedicalstaffRoutes);
  app.use('/api/dashboard', dashboardRoutes);
  
  console.log('All routes loaded successfully');
} catch (error) {
  console.error('Error loading routes:', error.message);
  console.error('Error stack:', error.stack);
}

// Error handling for 404 - route not found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Add this as the LAST middleware for error handling
app.use((err, req, res, next) => {
    console.error('Server Error:', err.message);
    console.error('Error Stack:', err.stack);
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        errors: Object.values(err.errors).map(e => e.message)
      });
    }

    // Handle express-validator errors
    if (err.array) {
      const errors = err.array().map(e => e.msg);
      return res.status(400).json({ success: false, errors });
    }

    // Generic server error
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: err.message
    });
  });

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server started at: ${new Date().toISOString()}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
