import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import { validateLogin, validateRegistration } from '../middleware/validate.js';
import { getUserProfile, login, registerDoctor, registerHospital, updateDoctor, updateHospital } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

dotenv.config();  // Load environment variables

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup Cloudinary Storage
const storage = (folder) =>
    new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: `profiles/${folder}`,  // Store images inside profiles/doctors or profiles/hospitals
            format: async (req, file) => 'png',  // Convert to PNG format
            public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`,
        },
    });

const uploadDoctor = multer({ storage: storage('doctors') }).single('profilePhoto');
const uploadHospital = multer({ storage: storage('hospitals') }).single('profilePhoto');

const router = express.Router();

router.post("/hospital/register", uploadHospital, validateRegistration, registerHospital);
router.post("/doctor/register", uploadDoctor, validateRegistration, registerDoctor);
router.post("/login", validateLogin, login);

router.get("/profile", authMiddleware, getUserProfile);
router.get("/doctor/profile", authMiddleware, getUserProfile);
router.put("/hospital/update", authMiddleware, uploadHospital, updateHospital);
router.put("/doctor/update", authMiddleware, uploadDoctor, updateDoctor);
router.put("/doctor/update/:id", authMiddleware, uploadDoctor, updateDoctor);

export default router;
