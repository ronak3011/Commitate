import User from '../models/User.js';
import Project from '../models/Project.js';
import Application from '../models/Application.js';
import generateToken from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password'); 
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch projects created by this user
    const createdProjects = await Project.find({ owner: req.params.id }).sort({ createdAt: -1 });

    // Fetch projects successfully adopted by this user
    const applications = await Application.find({ applicant: req.params.id, status: 'Approved' })
      .populate('project')
      .sort({ createdAt: -1 });
    
    // Extract the project objects from the applications
    const adoptedProjects = applications
      .filter(app => app.project != null) // Avoid deleted projects
      .map(app => app.project);

    res.json({
      user,
      createdProjects,
      adoptedProjects
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
