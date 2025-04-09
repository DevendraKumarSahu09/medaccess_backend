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

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blood-bank', bloodBankRoutes);
app.use('/api/beds', bedsRoutes);
app.use('/api/hospitaldoctors', hdoctorRoutes);
app.use('/api/users', userRoutes);
app.use("/api/pharmacy", pharmacyRoutes);
app.use("/api/nonmedicalstaff", nonmedicalstaffRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Add this as the LAST middleware
app.use((err, req, res, next) => {
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
    res.status(500).json({ success: false, message: 'Server error' });
  });

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
