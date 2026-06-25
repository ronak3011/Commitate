import Project from '../models/Project.js';
import Application from '../models/Application.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    // .populate('owner', 'name') replaces the owner ID with the actual user's name
    // .populate('adopter', 'name') replaces the adopter ID with their name
    // .sort({ createdAt: -1 }) returns the newest projects first
    const projects = await Project.find().populate('owner', 'name').populate('adopter', 'name').sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single project by ID
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('owner', 'name').populate('adopter', 'name');
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (Requires login)
export const createProject = async (req, res) => {
  try {
    const { title, description, githubUrl, demoUrl, techStack, status, completionPercentage, whatsLeft } = req.body;

    const project = new Project({
      title,
      description,
      githubUrl,
      demoUrl,
      techStack,
      status,
      completionPercentage,
      whatsLeft,
      owner: req.user._id // We get the user ID from our authMiddleware!
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (Owner only)
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Security check: ensure the user trying to delete it actually owns it!
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this project' });
    }

    // Delete all applications related to this project (Cascade Delete)
    await Application.deleteMany({ project: project._id });

    await project.deleteOne();
    res.json({ message: 'Project removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (Owner only)
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Security check: ensure the user trying to update it actually owns it
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to edit this project' });
    }

    // Update fields if they were provided in the request
    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.githubUrl = req.body.githubUrl || project.githubUrl;
    project.demoUrl = req.body.demoUrl || project.demoUrl;
    project.techStack = req.body.techStack || project.techStack;
    project.status = req.body.status || project.status;
    project.completionPercentage = req.body.completionPercentage || project.completionPercentage;
    project.whatsLeft = req.body.whatsLeft || project.whatsLeft;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user's projects (For their Dashboard)
// @route   GET /api/projects/my-projects
// @access  Private
export const getMyProjects = async (req, res) => {
  try {
    // Find all projects where the owner matches the logged in user
    const projects = await Project.find({ owner: req.user._id }).populate('owner', 'name').populate('adopter', 'name').sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
