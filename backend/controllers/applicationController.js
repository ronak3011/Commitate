import Application from '../models/Application.js';
import Project from '../models/Project.js';

// @desc    Apply to adopt or contribute to a project
// @route   POST /api/applications
// @access  Private (Requires login)
export const createApplication = async (req, res) => {
  try {
    const { projectId, message } = req.body;

    // 1. Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // 2. Prevent the owner from applying to their own project
    if (project.owner.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot apply to your own project' });
    }

    // 3. Create the application
    const application = new Application({
      project: projectId,
      applicant: req.user._id,
      owner: project.owner, // We grab the owner from the project so we can easily query it later
      message
    });

    const savedApplication = await application.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all applications received by the logged in user
// @route   GET /api/applications/received
// @access  Private
export const getReceivedApplications = async (req, res) => {
  try {
    // We populate 'project' to get its title, and 'applicant' to get their name
    const applications = await Application.find({ owner: req.user._id })
      .populate('project', 'title status')
      .populate('applicant', 'name email')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all applications sent by the logged in user
// @route   GET /api/applications/sent
// @access  Private
export const getSentApplications = async (req, res) => {
  try {
    // We populate 'project' to show what they applied to
    const applications = await Application.find({ applicant: req.user._id })
      .populate({
        path: 'project',
        select: 'title status owner',
        populate: {
          path: 'owner',
          select: 'name'
        }
      })
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve or Reject an application
// @route   PUT /api/applications/:id
// @access  Private
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'Approved' or 'Rejected'
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Security: Only the project owner can approve/reject
    if (application.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this application' });
    }

    // Update the application status
    application.status = status;
    await application.save();

    // The Magic Step: If Approved, update the actual project status and set the adopter!
    if (status === 'Approved') {
      const project = await Project.findById(application.project);
      if (project) {
        project.status = 'Adopted';
        project.adopter = application.applicant;
        await project.save();
      }
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
