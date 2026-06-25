import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  githubUrl: { type: String, required: true },
  demoUrl: { type: String }, // Optional field
  techStack: [{ type: String }], // Array of strings (e.g., ["React", "Node.js"])
  status: {
    type: String,
    required: true,
    enum: ['Up for Adoption', 'Seeking Maintainer', 'Needs Contributors', 'Adopted', 'Archived'],
    default: 'Up for Adoption'
  },
  completionPercentage: { type: Number, default: 0 },
  whatsLeft: { type: String, required: true },
  
  // This is how we link a project to a specific user
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Tells Mongoose this ID belongs to the User collection
  },
  // If the project is adopted, this stores who adopted it
  adopter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
