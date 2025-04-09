import mongoose from 'mongoose';

const ActivityLogSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  action: {
    type: String,
    enum: ['create', 'update', 'delete', 'login', 'logout', 'other'],
    default: 'other'
  },
  resourceType: {
    type: String,
    enum: ['patient', 'doctor', 'appointment', 'medicine', 'test', 'staff', 'other'],
    default: 'other'
  },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId
  },
  details: {
    type: Object
  }
});

// Create index for faster queries
ActivityLogSchema.index({ timestamp: -1 });
ActivityLogSchema.index({ userId: 1, timestamp: -1 });
ActivityLogSchema.index({ resourceType: 1, resourceId: 1 });

export default mongoose.model('ActivityLog', ActivityLogSchema); 