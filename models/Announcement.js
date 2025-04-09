import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  urgent: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  targetAudience: {
    type: [String],
    enum: ['all', 'doctors', 'nurses', 'staff', 'patients'],
    default: ['all']
  },
  expiresAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add pre-save hook to update the updatedAt field
AnnouncementSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create index for faster queries
AnnouncementSchema.index({ createdAt: -1 });
AnnouncementSchema.index({ urgent: 1, createdAt: -1 });
AnnouncementSchema.index({ expiresAt: 1 });

export default mongoose.model('Announcement', AnnouncementSchema); 