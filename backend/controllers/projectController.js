import Project from '../models/Project.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    // .populate('owner', 'name') replaces the owner ID with the actual user's name
    // .sort({ createdAt: -1 }) returns the newest projects first
    const projects = await Project.find().populate('owner', 'name').sort({ createdAt: -1 });
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
    const project = await Project.findById(req.params.id).populate('owner', 'name');
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

    await project.deleteOne();
    res.json({ message: 'Project removed successfully' });
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
    const projects = await Project.find({ owner: req.user._id }).populate('owner', 'name').sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
