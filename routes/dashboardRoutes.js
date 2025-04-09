import express from 'express';
import { 
  getStatistics, 
  getBloodInventory, 
  getRecentActivities, 
  getAnnouncements, 
  generateReport, 
  downloadData,
  getHospitals,
  getDoctors,
  getPharmacies,
  getPharmacyMedications
} from '../controllers/dashboardController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes - no authentication required
router.get('/public/hospitals', getHospitals);
router.get('/public/doctors', getDoctors);
router.get('/public/pharmacies', getPharmacies);
router.get('/public/pharmacies/:pharmacyId/medications', getPharmacyMedications);

// All private dashboard routes require authentication
router.use(authMiddleware);

// Dashboard statistics
router.get('/statistics', getStatistics);

// Blood inventory data
router.get('/blood-inventory', getBloodInventory);

// Recent activities
router.get('/activities', getRecentActivities);

// Announcements
router.get('/announcements', getAnnouncements);

// Generate report
router.post('/report/:type', generateReport);

// Download data
router.get('/download/:dataType/:format', downloadData);

// Hospital data routes - authenticated
router.get('/hospitals', getHospitals);
router.get('/doctors', getDoctors);

// Pharmacy data routes - authenticated
router.get('/pharmacies', getPharmacies);
router.get('/pharmacies/:pharmacyId/medications', getPharmacyMedications);

export default router; 