import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../utils/jwt.js";
import Hospital from "../models/Hospital.js";
import Doctor from "../models/Doctor.js";
import { createBloodBankForHospital } from "../utils/createBloodBankForHospital.js";


export const registerHospital = async (req, res) => {
    try {
        const { hospitalName, email, password, contact, address, registrationNumber, about, websiteUrl } = req.body;

        // Check if the email is already registered
        const existingHospital = await Hospital.findOne({ email });
        if (existingHospital) {
            return res.status(400).json({ message: "Hospital already registered." });
        }

        // Parse address (JSON string to object)
        let parsedAddress = {};
        if (address) {
            try {
                parsedAddress = JSON.parse(address);
            } catch (error) {
                return res.status(400).json({ message: "Invalid address format." });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new hospital record
        const hospital = new Hospital({
            name: hospitalName,  // Map hospitalName to name field in model
            email,
            password: hashedPassword,
            phoneNumber: contact,  // Map contact to phoneNumber field in model
            address: `${parsedAddress.street || ''}, ${parsedAddress.city || ''}, ${parsedAddress.state || ''}, ${parsedAddress.zipCode || ''}`,  // Convert address object to string
            location: parsedAddress.city || '',  // Use city as location
            hospitalProfilePhoto: req.file ? req.file.path : null,  // Cloudinary URL
            // Add any other fields required by model
            specializations: [],
            facilities: []
        });

        await hospital.save();

        res.status(201).json({ message: "Hospital registered successfully.", hospital });
    } catch (error) {
        console.error('Error during hospital registration:', error);
        res.status(500).json({ message: error.message });
    }
};

// Register a Doctor
export const registerDoctor = async (req, res) => {
    try {
        const { 
            fullName, 
            email, 
            password, 
            licenseNumber, 
            specialization, 
            experience, 
            daysAvailable, 
            clinicTimings, 
            aboutYourself, 
            websiteUrl, 
            streetAddress, 
            city, 
            state, 
            zipCode,
            clinicName,
            qualification 
        } = req.body;

        // Check if the email is already registered
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) return res.status(400).json({ message: "Doctor already registered." });

        // Create clinic address object from separate fields
        const clinicAddress = {
            street: streetAddress || '',
            city: city || '',
            state: state || '',
            zipCode: zipCode || ''
        };

        // Process days available - use default if not provided
        let processedDays = [];
        if (daysAvailable) {
            if (typeof daysAvailable === 'string') {
                // Handle comma-separated values
                processedDays = daysAvailable.split(/,\s*/).map(day => day.trim());
            } else if (Array.isArray(daysAvailable)) {
                processedDays = daysAvailable;
            }
        }
        
        // If no days provided or processing resulted in empty array, use default
        if (!processedDays.length) {
            processedDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Ensure qualification is set
        const doctorQualification = qualification || specialization || 'General Medicine';

        // Create and save the doctor
        const doctor = new Doctor({
            fullName,
            email,
            password: hashedPassword,
            licenseNumber,
            specialization,
            experience: Number(experience) || 0,
            daysAvailable: processedDays,
            clinicTimings: clinicTimings || '9:00 AM - 5:00 PM',
            aboutYourself: aboutYourself || '',
            profilePhoto: req.file ? req.file.path : null,  // Cloudinary URL
            websiteUrl: websiteUrl || '',
            clinicAddress,
            clinicName: clinicName || '',
            qualification: doctorQualification,
            phoneNumber: req.body.phoneNumber || req.body.contact || '1234567890' // Required field with fallback
        });

        await doctor.save();

        res.status(201).json({ message: "Doctor registered successfully.", doctor });
    } catch (error) {
        console.error("Doctor registration error:", error);
        res.status(500).json({ message: error.message });
    }
};


// Login for Both
export const login = async (req, res) => {
    try {
        const { email, password, userType } = req.body;

        // Determine the model based on userType
        const Model = userType === "hospital" ? Hospital : Doctor;

        // Find user by email
        const user = await Model.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found." });

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials." });

        if (userType === "hospital") {
            await createBloodBankForHospital(user._id);  // Call your existing function to create blood bank data
        }

        // Generate JWT
        const token = generateToken(user._id, userType); // Pass user ID and userType to generate the token

        res.status(200).json({ message: "Login successful.", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const { userType, userId } = req.user; // Extract userType and userId from the JWT (set by authMiddleware)

        // Determine the model based on the userType
        const Model = userType === "hospital" ? Hospital : Doctor;

        // Find the user by ID (either a hospital or a doctor)
        const user = await Model.findById(userId).select('-password'); // Exclude the password field from the response

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // For doctor profiles, return all needed fields
        if (userType === "doctor") {
            // Log the user data to help identify field issues
            console.log("Profile data received:", user);
            
            return res.json({
                fullName: user.fullName,
                email: user.email,
                contact: user.phoneNumber || null, // Map phoneNumber to contact for frontend consistency
                clinicAddress: user.clinicAddress || null,
                licenseNumber: user.licenseNumber || null,
                specialization: user.specialization || null,
                experience: user.experience || null,
                aboutYourself: user.aboutYourself || null,
                profilePhoto: user.profilePhoto || null,
                websiteUrl: user.websiteUrl || null,
                clinicName: user.clinicName || null,
                clinicTimings: user.clinicTimings || null,
                daysAvailable: user.daysAvailable || [],
                // Add any other fields needed by the doctor profile
            });
        }

        // For hospital profiles or generic profiles
        return res.json({
            fullName: user.hospitalName || user.fullName, // Adjust depending on userType
            email: user.email,
            profilePhoto: user.profilePhoto || null,
            contact: user.contact || null, // Add other details as needed
            // You can add more fields depending on what you want to return in the profile
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateHospital = async (req, res) => {
    try {
        const { userId, userType } = req.user; // Extract user details from token

        if (userType !== "hospital") {
            return res.status(403).json({ message: "Unauthorized. Only hospitals can update this data." });
        }

        const updateFields = { ...req.body };

        // Handle profile photo update
        if (req.file) {
            updateFields.profilePhoto = req.file.path; // Cloudinary URL
        }

        // If address is provided, parse it and format it as a string
        if (updateFields.address) {
            try {
                const parsedAddress = JSON.parse(updateFields.address);
                // Convert address object to string format similar to registerHospital
                updateFields.address = `${parsedAddress.street || ''}, ${parsedAddress.city || ''}, ${parsedAddress.state || ''}, ${parsedAddress.zipCode || ''}`;
            } catch (error) {
                return res.status(400).json({ message: "Invalid address format." });
            }
        }

        const updatedHospital = await Hospital.findByIdAndUpdate(userId, updateFields, { new: true });

        if (!updatedHospital) {
            return res.status(404).json({ message: "Hospital not found." });
        }

        res.json({ message: "Hospital profile updated successfully.", updatedHospital });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateDoctor = async (req, res) => {
    try {
        const { userId, userType } = req.user; // Extract user details from token
        const doctorId = req.params.id || userId; // Use ID from params if provided, otherwise use from token

        // Log authentication info for debugging
        console.log("Auth info:", { userId, userType, doctorId });
        console.log("Request body keys:", Object.keys(req.body));
        console.log("Request file:", req.file ? req.file.path : "No file uploaded");

        if (userType !== "doctor") {
            return res.status(403).json({ message: "Unauthorized. Only doctors can update this data." });
        }

        // Verify the doctor is updating their own profile
        if (doctorId !== userId) {
            return res.status(403).json({ message: "Unauthorized. You can only update your own profile." });
        }

        // Fetch the current doctor first
        const currentDoctor = await Doctor.findById(doctorId);
        if (!currentDoctor) {
            return res.status(404).json({ message: "Doctor not found." });
        }

        // Create a base update object with existing values
        const updateFields = {
            fullName: currentDoctor.fullName,
            email: currentDoctor.email,
            phoneNumber: currentDoctor.phoneNumber,
            licenseNumber: currentDoctor.licenseNumber,
            specialization: currentDoctor.specialization,
            experience: currentDoctor.experience,
            qualification: currentDoctor.qualification,
            daysAvailable: currentDoctor.daysAvailable,
            clinicTimings: currentDoctor.clinicTimings,
            aboutYourself: currentDoctor.aboutYourself || '',
            websiteUrl: currentDoctor.websiteUrl || '',
            clinicName: currentDoctor.clinicName || '',
            clinicAddress: currentDoctor.clinicAddress || {
                street: '',
                city: '',
                state: '',
                zipCode: ''
            }
        };

        // Update with provided values from the request
        if (req.body.fullName) updateFields.fullName = req.body.fullName;
        if (req.body.email) updateFields.email = req.body.email;
        if (req.body.phoneNumber) updateFields.phoneNumber = req.body.phoneNumber;
        if (req.body.licenseNumber) updateFields.licenseNumber = req.body.licenseNumber;
        if (req.body.specialization) updateFields.specialization = req.body.specialization;
        if (req.body.aboutYourself) updateFields.aboutYourself = req.body.aboutYourself;
        if (req.body.websiteUrl) updateFields.websiteUrl = req.body.websiteUrl;
        if (req.body.clinicName) updateFields.clinicName = req.body.clinicName;
        if (req.body.clinicTimings) updateFields.clinicTimings = req.body.clinicTimings;
        
        // Process qualification
        if (req.body.qualification) {
            updateFields.qualification = req.body.qualification;
        } else if (updateFields.specialization && !updateFields.qualification) {
            updateFields.qualification = updateFields.specialization;
        }

        // Handle experience (ensure it's a number)
        if (req.body.experience) {
            updateFields.experience = Number(req.body.experience);
            if (isNaN(updateFields.experience)) {
                updateFields.experience = currentDoctor.experience || 0;
            }
        }

        // Process days available
        if (req.body.daysAvailable) {
            try {
                let daysAvailable = req.body.daysAvailable;
                
                // If it's a string representation of JSON array
                if (typeof daysAvailable === 'string') {
                    try {
                        daysAvailable = JSON.parse(daysAvailable);
                    } catch (err) {
                        // If parsing fails, try treating it as a single string
                        daysAvailable = [daysAvailable];
                    }
                }
                
                // If we got an array with a single string containing commas or "and"
                if (Array.isArray(daysAvailable) && daysAvailable.length === 1 && 
                    (daysAvailable[0].includes(',') || daysAvailable[0].includes('and'))) {
                    // Replace "and" with comma and split
                    const dayString = daysAvailable[0]
                        .replace(/ and /g, ',')
                        .replace(/,and /g, ',')
                        .replace(/ and/g, ',');
                    daysAvailable = dayString.split(/,\s*/).map(day => day.trim());
                }
                
                // Handle case where string was already split but had "and" in one of the entries
                if (Array.isArray(daysAvailable)) {
                    // Clean up each entry to remove "and" from individual day names
                    daysAvailable = daysAvailable.flatMap(day => {
                        if (typeof day === 'string' && day.includes('and')) {
                            return day
                                .replace(/ and /g, ',')
                                .replace(/,and /g, ',')
                                .replace(/ and/g, ',')
                                .split(/,\s*/)
                                .map(d => d.trim());
                        }
                        return day;
                    });
                }
                
                // Ensure it's an array
                if (!Array.isArray(daysAvailable)) {
                    daysAvailable = [daysAvailable];
                }
                
                // Filter out any empty entries
                daysAvailable = daysAvailable
                    .filter(day => day && typeof day === 'string' && day.trim() !== '')
                    .map(day => day.trim());
                
                // If array is empty, use default days
                if (!daysAvailable.length) {
                    daysAvailable = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
                }
                
                updateFields.daysAvailable = daysAvailable;
                console.log("Processed days:", updateFields.daysAvailable);
            } catch (error) {
                console.error("Error processing days available:", error);
                // Keep existing days if there's an error
            }
        }

        // Process clinic address
        if (req.body.clinicAddress) {
            try {
                let clinicAddress = req.body.clinicAddress;
                
                // If it's a string, parse it
                if (typeof clinicAddress === 'string') {
                    clinicAddress = JSON.parse(clinicAddress);
                }
                
                // Ensure it has the expected structure
                updateFields.clinicAddress = {
                    street: clinicAddress.street || currentDoctor.clinicAddress?.street || '',
                    city: clinicAddress.city || currentDoctor.clinicAddress?.city || '',
                    state: clinicAddress.state || currentDoctor.clinicAddress?.state || '',
                    zipCode: clinicAddress.zipCode || currentDoctor.clinicAddress?.zipCode || ''
                };
            } catch (error) {
                console.error("Error processing clinic address:", error);
                // Keep existing address if there's an error
            }
        }

        // Handle profile photo
        if (req.file) {
            updateFields.profilePhoto = req.file.path; // Use Cloudinary URL from multer
        }
        
        // Debug what we're updating
        console.log("Updating doctor with fields:", Object.keys(updateFields));

        try {
            const updatedDoctor = await Doctor.findByIdAndUpdate(
                doctorId, 
                { $set: updateFields }, 
                { new: true, runValidators: true }
            );

            if (!updatedDoctor) {
                return res.status(404).json({ message: "Doctor not found or update failed." });
            }

            res.json({ 
                message: "Doctor profile updated successfully.", 
                doctor: {
                    fullName: updatedDoctor.fullName,
                    email: updatedDoctor.email,
                    contact: updatedDoctor.phoneNumber,
                    specialization: updatedDoctor.specialization,
                    experience: updatedDoctor.experience,
                    profilePhoto: updatedDoctor.profilePhoto
                }
            });
        } catch (validationError) {
            console.error("Validation error:", validationError);
            return res.status(400).json({ 
                message: "Validation failed", 
                error: validationError.message,
                details: validationError.errors 
            });
        }
    } catch (error) {
        console.error("Doctor update error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

