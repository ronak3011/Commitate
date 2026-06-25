import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import User from './models/User.js';

dotenv.config();

const check = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const project = await Project.findOne({ title: 'Weather' }).populate('adopter');
    console.log('Project Adopter:', project.adopter);
    
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

check();
