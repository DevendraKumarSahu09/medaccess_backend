import express from "express";
import { 
    createPharmacy, 
    getPharmacy, 
    addMedicine, 
    getMedications, 
    updateMedication, 
    deleteMedication, 
    searchMedications 
} from "../controllers/pharmacyController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Pharmacy management
router.post("/create", authMiddleware, createPharmacy);
router.get("/", authMiddleware, getPharmacy);

// Medication management
router.post("/medications/add", authMiddleware, addMedicine);
router.get("/medications", authMiddleware, getMedications);
router.put("/medications/:id", authMiddleware, updateMedication);
router.delete("/medications/:id", authMiddleware, deleteMedication);
router.get('/medications/search', authMiddleware, searchMedications);

export default router;
