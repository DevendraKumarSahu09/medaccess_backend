import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true,
        trim: true
    },
    experience: {
        type: Number,
        required: true
    },
    licenseNumber: {
        type: String,
        required: true
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
    },
    hospitalName: {
        type: String,
        trim: true
    },
    qualification: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    daysAvailable: {
        type: [String],
        required: true
    }, // Example: ["Monday", "Tuesday"]
    clinicTimings: {
        type: String,
        required: true
    }, // Example: "9:00 AM - 5:00 PM"
    availabilityStatus: {
        type: String,
        enum: ['Available', 'Unavailable', 'On Leave'],
        default: 'Available'
    },
    profilePicture: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2017/01/31/22/32/doctor-2027768_1280.png'
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    verified: {
        type: Boolean,
        default: false
    },
    aboutYourself: { type: String },
    profilePhoto: { type: String },
    websiteUrl: { type: String },
    affiliateHospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", default: null },
    clinicAddress: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
    },
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
