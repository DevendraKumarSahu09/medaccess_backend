import Pharmacy from "../models/Pharmacy.js";
import Medication from "../models/Medication.js";
import Hospital from "../models/Hospital.js";

// Create or update pharmacy for a hospital
export const createPharmacy = async (req, res) => {
    try {
        console.log("Creating pharmacy - Request Body:", req.body);
        console.log("User from token:", req.user);
        
        const { name, address, contact, operatingHours } = req.body;
        
        // Extract hospitalId from the logged-in user's JWT payload
        const hospitalId = req.user.userId;
        
        console.log("Hospital ID from token:", hospitalId);
        
        // Get hospital details
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            console.log("Hospital not found with ID:", hospitalId);
            return res.status(404).json({ success: false, message: "Hospital not found" });
        }
        
        console.log("Found hospital:", hospital.name);
        
        // Check if pharmacy already exists for this hospital
        let pharmacy = await Pharmacy.findOne({ hospitalId });
        
        if (pharmacy) {
            console.log("Updating existing pharmacy:", pharmacy._id);
            // Update existing pharmacy
            pharmacy.name = name;
            pharmacy.hospital = hospital.name;
            pharmacy.address = address;
            pharmacy.contact = contact;
            pharmacy.operatingHours = operatingHours;
            pharmacy.updatedAt = Date.now();
            
            await pharmacy.save();
            console.log("Pharmacy updated successfully");
            res.status(200).json({ success: true, message: "Pharmacy updated successfully", data: pharmacy });
        } else {
            console.log("Creating new pharmacy for hospital:", hospitalId);
            // Create new pharmacy
            pharmacy = new Pharmacy({
                name,
                hospital: hospital.name,
                hospitalId,
                address,
                contact,
                operatingHours,
            });
            
            await pharmacy.save();
            console.log("New pharmacy created with ID:", pharmacy._id);
            res.status(201).json({ success: true, message: "Pharmacy created successfully", data: pharmacy });
        }
    } catch (error) {
        console.error("Error creating/updating pharmacy:", error);
        // Log more detailed error information
        if (error.name === 'ValidationError') {
            console.error("Validation error details:", error.errors);
        } else if (error.name === 'MongoError' || error.name === 'MongoServerError') {
            console.error("MongoDB error code:", error.code);
        }
        res.status(500).json({ success: false, message: "Error creating/updating pharmacy", error: error.message });
    }
};

// ✅ Add Medicine
export const addMedicine = async (req, res) => {
    try {
        const { name, category, brand, price, dosage, inStock, description, quantity, expiryDate } = req.body;

        // Extract hospitalId from the logged-in user's JWT payload
        const hospitalId = req.user.userId;

        // Find the pharmacy for this hospital
        const pharmacy = await Pharmacy.findOne({ hospitalId });
        
        if (!pharmacy) {
            return res.status(404).json({ 
                success: false, 
                message: "You need to create a pharmacy first before adding medications" 
            });
        }

        // Create a new medication
        const newMedication = new Medication({
            name,
            category,
            pharmacyId: pharmacy._id,
            price,
            inStock: inStock !== undefined ? inStock : true,
            dosage,
            description,
            brand,
            quantity,
            expiryDate,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });

        // Save the medication to the database
        await newMedication.save();
        res.status(201).json({ 
            success: true, 
            message: "Medication added successfully", 
            data: newMedication 
        });
    } catch (error) {
        console.error("Error adding medication:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error adding medication", 
            error: error.message 
        });
    }
};

// ✅ Get Pharmacy for Hospital
export const getPharmacy = async (req, res) => {
    try {
        // Extract hospitalId from the logged-in user's JWT payload
        const hospitalId = req.user.userId;

        // Find the pharmacy associated with this hospital
        const pharmacy = await Pharmacy.findOne({ hospitalId });

        if (!pharmacy) {
            return res.status(404).json({ 
                success: false, 
                message: "No pharmacy found for this hospital" 
            });
        }

        res.status(200).json({ success: true, data: pharmacy });
    } catch (error) {
        console.error("Error fetching pharmacy:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error. Could not fetch pharmacy.", 
            error: error.message 
        });
    }
};

// ✅ Get Medications for Pharmacy
export const getMedications = async (req, res) => {
    try {
        // Extract hospitalId from the logged-in user's JWT payload
        const hospitalId = req.user.userId;

        // Find the pharmacy associated with this hospital
        const pharmacy = await Pharmacy.findOne({ hospitalId });

        if (!pharmacy) {
            return res.status(404).json({ 
                success: false, 
                message: "No pharmacy found for this hospital" 
            });
        }

        // Find all medications for this pharmacy
        const medications = await Medication.find({ pharmacyId: pharmacy._id });

        res.status(200).json({ 
            success: true, 
            data: medications 
        });
    } catch (error) {
        console.error("Error fetching medications:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error. Could not fetch medications.", 
            error: error.message 
        });
    }
};

// ✅ Update Medicine
export const updateMedication = async (req, res) => {
    const { id } = req.params;  // Medication ID from URL parameter

    try {
        // Extract hospitalId from the logged-in user's JWT payload
        const hospitalId = req.user.userId;

        // Find the pharmacy associated with this hospital
        const pharmacy = await Pharmacy.findOne({ hospitalId });

        if (!pharmacy) {
            return res.status(404).json({ 
                success: false, 
                message: "No pharmacy found for this hospital" 
            });
        }

        // Find and update the medication
        const updatedMedication = await Medication.findOneAndUpdate(
            { _id: id, pharmacyId: pharmacy._id },
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedMedication) {
            return res.status(404).json({ 
                success: false, 
                message: "Medication not found or you do not have permission to edit it" 
            });
        }

        res.status(200).json({ 
            success: true, 
            message: "Medication updated successfully", 
            data: updatedMedication 
        });
    } catch (error) {
        console.error("Error updating medication:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error updating medication", 
            error: error.message 
        });
    }
};

// ✅ Delete Medicine
export const deleteMedication = async (req, res) => {
    const { id } = req.params;  // Medication ID from URL parameter

    try {
        // Extract hospitalId from the logged-in user's JWT payload
        const hospitalId = req.user.userId;

        // Find the pharmacy associated with this hospital
        const pharmacy = await Pharmacy.findOne({ hospitalId });

        if (!pharmacy) {
            return res.status(404).json({ 
                success: false, 
                message: "No pharmacy found for this hospital" 
            });
        }

        // Find and delete the medication
        const deletedMedication = await Medication.findOneAndDelete({
            _id: id,
            pharmacyId: pharmacy._id
        });

        if (!deletedMedication) {
            return res.status(404).json({ 
                success: false, 
                message: "Medication not found or you do not have permission to delete it" 
            });
        }

        res.status(200).json({ 
            success: true, 
            message: "Medication deleted successfully" 
        });
    } catch (error) {
        console.error("Error deleting medication:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error deleting medication", 
            error: error.message 
        });
    }
};

// Search medications
export const searchMedications = async (req, res) => {
    try {
        const { query } = req.query; // Get search term from query params
        const hospitalId = req.user.userId;

        // Find the pharmacy for this hospital
        const pharmacy = await Pharmacy.findOne({ hospitalId });
        
        if (!pharmacy) {
            return res.status(404).json({ 
                success: false, 
                message: "No pharmacy found for this hospital" 
            });
        }

        const medications = await Medication.find({
            pharmacyId: pharmacy._id,
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Search by name (case-insensitive)
                { category: { $regex: query, $options: 'i' } }, // Search by category
                { brand: { $regex: query, $options: 'i' } } // Search by brand
            ]
        });

        res.status(200).json({ success: true, data: medications });
    } catch (error) {
        console.error("Error searching medications:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error searching medications", 
            error: error.message 
        });
    }
};