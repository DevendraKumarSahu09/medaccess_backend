import Doctor from '../models/Doctor.js';
import Hospital from '../models/Hospital.js';
import BloodInventory from '../models/BloodInventory.js';
import ActivityLog from '../models/ActivityLog.js';
import Announcement from '../models/Announcement.js';
import BloodBank from '../models/BloodBank.js';
import HospitalDoctor from '../models/HospitalDoctor.js';
import excel from 'exceljs';
import Pharmacy from '../models/Pharmacy.js';
import Medication from '../models/Medication.js';

// Get dashboard statistics
export const getStatistics = async (req, res) => {
  try {
    // Get counts from various collections
    const doctorsCount = await Doctor.countDocuments();
    
    // For simplicity, we'll use a placeholder for patients count
    // In a real system, you would have a Patient model
    const patientsCount = 248; // Placeholder value
    
    // For simplicity, we'll use a placeholder for appointments count
    // In a real system, you would have an Appointment model
    const appointmentsCount = 37; // Placeholder value
    
    // For simplicity, we'll use a placeholder for tests count
    // In a real system, you would have a Test model
    const testsCount = 124; // Placeholder value

    // Return the statistics
    res.json({
      doctors: doctorsCount,
      patients: patientsCount,
      appointments: appointmentsCount,
      tests: testsCount
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch dashboard statistics' 
    });
  }
};

// Get blood inventory
export const getBloodInventory = async (req, res) => {
  try {
    let bloodInventory;
    
    // First try to get from BloodInventory model
    bloodInventory = await BloodInventory.find().select('type units -_id').sort({ type: 1 });
    
    // If no data in BloodInventory, try BloodBank model
    if (!bloodInventory || bloodInventory.length === 0) {
      const bloodBankData = await BloodBank.find().select('bloodGroup unitsAvailable -_id');
      
      if (bloodBankData && bloodBankData.length > 0) {
        // Map BloodBank data to the expected format
        bloodInventory = bloodBankData.map(item => ({
          type: item.bloodGroup,
          units: item.unitsAvailable
        }));
      }
    }
    
    // If still no data, return default values
    if (!bloodInventory || bloodInventory.length === 0) {
      bloodInventory = [
        { type: 'A+', units: 12 },
        { type: 'A-', units: 5 },
        { type: 'B+', units: 8 },
        { type: 'B-', units: 3 },
        { type: 'AB+', units: 2 },
        { type: 'AB-', units: 1 },
        { type: 'O+', units: 15 },
        { type: 'O-', units: 6 }
      ];
    }
    
    res.json(bloodInventory);
  } catch (error) {
    console.error('Error fetching blood inventory:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch blood inventory data'
    });
  }
};

// Get recent activities
export const getRecentActivities = async (req, res) => {
  try {
    // Get recent activities from ActivityLog collection
    const activities = await ActivityLog.find()
      .sort({ timestamp: -1 })
      .limit(5);
    
    if (!activities || activities.length === 0) {
      // Return default activities if none exist
      return res.json([
        { time: '09:45 AM', description: 'Dr. Sarah Johnson checked in patient #1042' },
        { time: '10:15 AM', description: 'Blood sample collected for patient #890' },
        { time: '11:30 AM', description: 'New appointment scheduled for 05/15/2023' },
        { time: '12:45 PM', description: 'Medication dispensed from pharmacy' },
        { time: '02:00 PM', description: 'Emergency room patient admitted to Ward 3' }
      ]);
    }
    
    // Format the activities for the frontend
    const formattedActivities = activities.map(activity => ({
      time: new Date(activity.timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      description: activity.description
    }));
    
    res.json(formattedActivities);
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch activity data'
    });
  }
};

// Get announcements
export const getAnnouncements = async (req, res) => {
  try {
    // Get announcements from Announcement collection
    const announcements = await Announcement.find()
      .sort({ urgent: -1, createdAt: -1 })
      .limit(3);
    
    if (!announcements || announcements.length === 0) {
      // Return default announcements if none exist
      return res.json([
        { 
          title: 'System Maintenance', 
          message: 'The system will be down for maintenance on Sunday, May 28th from 2-4 AM.',
          urgent: false
        },
        {
          title: 'COVID-19 Protocol Update',
          message: 'New protocols for COVID-19 screening will be effective starting next week. All staff must review the updated guidelines.',
          urgent: true
        },
        {
          title: 'Staff Meeting',
          message: 'Monthly staff meeting scheduled for Friday, May 26th at 9:00 AM in Conference Room A.',
          urgent: false
        }
      ]);
    }
    
    res.json(announcements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch announcements'
    });
  }
};

// Generate report
export const generateReport = async (req, res) => {
  try {
    const { type } = req.params;
    
    // This would typically generate a PDF or other report format
    // For now, we'll just return a success message
    res.json({ 
      success: true, 
      message: `${type} report generated successfully`,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to generate report'
    });
  }
};

// Download data
export const downloadData = async (req, res) => {
  try {
    const { dataType, format } = req.params;
    
    if (format !== 'excel') {
      return res.status(400).json({ message: 'Unsupported format' });
    }
    
    // Create a new Excel workbook
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Dashboard Data');
    
    // Add column headers
    worksheet.columns = [
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Value', key: 'value', width: 15 },
      { header: 'Date', key: 'date', width: 20 }
    ];
    
    // Get dashboard stats
    const doctorsCount = await Doctor.countDocuments();
    // Placeholder values for data we don't have models for
    const patientsCount = 248;
    const appointmentsCount = 37;
    const testsCount = 124;
    
    // Add rows
    const today = new Date().toISOString().split('T')[0];
    worksheet.addRow({ category: 'Total Doctors', value: doctorsCount, date: today });
    worksheet.addRow({ category: 'Total Patients', value: patientsCount, date: today });
    worksheet.addRow({ category: 'Today\'s Appointments', value: appointmentsCount, date: today });
    worksheet.addRow({ category: 'Lab Tests', value: testsCount, date: today });
    
    // Get blood inventory data
    let bloodInventory = await BloodInventory.find().sort({ type: 1 });
    
    // If no data in BloodInventory, try BloodBank model
    if (!bloodInventory || bloodInventory.length === 0) {
      const bloodBankData = await BloodBank.find();
      
      if (bloodBankData && bloodBankData.length > 0) {
        // Map BloodBank data to the expected format
        bloodInventory = bloodBankData.map(item => ({
          type: item.bloodGroup,
          units: item.unitsAvailable
        }));
      }
    }
    
    // If we have blood inventory data, add it to the worksheet
    if (bloodInventory && bloodInventory.length > 0) {
      bloodInventory.forEach(item => {
        worksheet.addRow({ 
          category: `Blood Type ${item.type}`, 
          value: item.units, 
          date: today 
        });
      });
    }
    
    // Set response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=dashboard-data-${today}.xlsx`
    );
    
    // Write to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error downloading data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to download data'
    });
  }
};

// Get all hospitals
export const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find()
      .select('name location email phoneNumber address');
    
    res.status(200).json(hospitals);
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    res.status(500).json({ message: 'Server error while fetching hospitals' });
  }
};

// Get all doctors from hospitals
export const getDoctors = async (req, res) => {
  try {
    // Fetch doctors from both Doctor and HospitalDoctor models
    const regularDoctors = await Doctor.find({ hospitalId: { $exists: true } })
      .select('fullName specialization hospitalId hospitalName experience qualification availabilityStatus profilePicture');
    
    const hospitalDoctors = await HospitalDoctor.find()
      .select('fullName specialization hospital experience qualification availabilityStatus profilePicture')
      .populate('hospital', 'name _id');
    
    // Transform hospitalDoctors to match regularDoctors format
    const formattedHospitalDoctors = hospitalDoctors.map(doctor => ({
      _id: doctor._id,
      fullName: doctor.fullName,
      specialization: doctor.specialization,
      hospitalId: doctor.hospital._id,
      hospitalName: doctor.hospital.name,
      experience: doctor.experience,
      qualification: doctor.qualification,
      availabilityStatus: doctor.availabilityStatus,
      profilePicture: doctor.profilePicture || 'https://cdn.pixabay.com/photo/2017/01/31/22/32/doctor-2027768_1280.png'
    }));
    
    // Combine both arrays
    const allDoctors = [...regularDoctors, ...formattedHospitalDoctors];
    
    res.status(200).json(allDoctors);
  } catch (error) {
    console.error('Error fetching hospital doctors:', error);
    res.status(500).json({ message: 'Server error while fetching doctors' });
  }
};

// Get all pharmacies
export const getPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find()
      .select('name hospital address contact');
    
    res.status(200).json(pharmacies);
  } catch (error) {
    console.error('Error fetching pharmacies:', error);
    res.status(500).json({ message: 'Server error while fetching pharmacies' });
  }
};

// Get medications for a specific pharmacy
export const getPharmacyMedications = async (req, res) => {
  try {
    const { pharmacyId } = req.params;
    
    console.log(`Fetching medications for pharmacy ID: ${pharmacyId}`);
    
    if (!pharmacyId) {
      return res.status(400).json({ 
        message: 'Pharmacy ID is required',
        success: false
      });
    }
    
    // Check if the pharmacy exists first
    const pharmacy = await Pharmacy.findById(pharmacyId);
    
    if (!pharmacy) {
      console.log(`Pharmacy not found with ID: ${pharmacyId}`);
      return res.status(404).json({ 
        message: 'Pharmacy not found',
        success: false 
      });
    }
    
    // Then find medications for this pharmacy
    const medications = await Medication.find({ pharmacyId })
      .select('name category price inStock dosage description');
    
    console.log(`Found ${medications.length} medications for pharmacy: ${pharmacy.name}`);
    
    // Format prices to ensure they're numbers
    const formattedMedications = medications.map(med => {
      const medication = med.toObject();
      
      // Ensure price is a number if it exists
      if (medication.price !== undefined && medication.price !== null) {
        medication.price = Number(medication.price);
      }
      
      return medication;
    });
    
    res.status(200).json(formattedMedications);
  } catch (error) {
    console.error('Error fetching medications:', error);
    res.status(500).json({ 
      message: 'Server error while fetching medications',
      error: error.message,
      success: false
    });
  }
}; 