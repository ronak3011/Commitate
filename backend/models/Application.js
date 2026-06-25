import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Project' // Links to the Project being applied for
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Links to the User who wants to adopt it
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // We store the owner ID to make it easy to query "Requests sent to me"
  },
  message: {
    type: String,
    required: true // The pitch from the applicant
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, {
  timestamps: true // Gives us createdAt so we know when they applied
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;
