import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
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
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    hospitalProfilePhoto: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2017/01/31/22/32/doctor-2027768_1280.png'
    },
    specializations: {
        type: [String],
        default: []
    },
    facilities: {
        type: [String],
        default: []
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Hospital = mongoose.model('Hospital', hospitalSchema);

export default Hospital;
