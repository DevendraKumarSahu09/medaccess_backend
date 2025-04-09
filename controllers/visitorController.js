import BloodBank from "../models/BloodBank.js";
import Doctor from "../models/Doctor.js";
import Hospital from "../models/Hospital.js";
import HospitalDoctor from "../models/HospitalDoctor.js";


// Get all doctors (public route)
export const getDoctors = async (req, res) =>{
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}


// Get all hospitals (public route)
export const getHospitals = async(req,res) =>{
    try {
        const hospitals = await Hospital.find();
        res.status(200).json(hospitals);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}


// Get doctor details (protected route)
export const getDoctorDetails = async(req, res) =>{
    try {
        // First try to find in Doctor collection
        const doctor = await Doctor.findById(req.params.id);
        
        // If found in Doctor collection, return it
        if (doctor) {
            return res.status(200).json(doctor);
        }
        
        // If not found in Doctor collection, try in HospitalDoctor collection
        const hospitalDoctor = await HospitalDoctor.findById(req.params.id)
            .populate('hospital', 'name location');
        
        // If not found in either collection
        if (!hospitalDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        
        // Transform hospital doctor data to match expected format in frontend
        const formattedDoctor = {
            _id: hospitalDoctor._id,
            fullName: hospitalDoctor.fullName,
            specialization: hospitalDoctor.specialization,
            experience: hospitalDoctor.experience,
            qualification: hospitalDoctor.qualification,
            phoneNumber: hospitalDoctor.contactNumber,
            profilePhoto: hospitalDoctor.profilePicture,
            clinicTimings: hospitalDoctor.visitingHours,
            aboutYourself: `${hospitalDoctor.fullName} is a ${hospitalDoctor.specialization} specialist with ${hospitalDoctor.experience} years of experience.`,
            affiliateHospital: hospitalDoctor.hospital,
            availabilityStatus: hospitalDoctor.availabilityStatus,
            // Add any other fields your frontend expects
        };
        
        res.status(200).json(formattedDoctor);
    } catch (error) {
        console.error('Error fetching doctor details:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}


// Get hospital details (protected route)
export const getHospitalDetails = async(req, res) =>{
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        res.status(200).json(hospital);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const getBlood = async (req, res) => {
    try {
        const blood = await BloodBank.find();
        res.status(200).json(blood);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}




