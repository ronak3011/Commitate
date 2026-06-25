import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Seeking Maintainer':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/30';
      case 'Needs Contributors':
        return 'bg-cyan-400/10 text-cyan-400 border-cyan-400/30';
      case 'Adopted':
        return 'bg-fuchsia-400/10 text-fuchsia-400 border-fuchsia-400/30';
      case 'Archived':
        return 'bg-transparent text-textMuted border-[#333]';
      case 'Abandoned':
      default:
        return 'bg-rose-400/10 text-rose-400 border-rose-400/30';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 hover:-translate-y-px hover:bg-surfaceHover hover:border-primary transition-all duration-200 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-medium text-textMain">{project.title}</h3>
        <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusStyle(project.status)}`}>
          {project.status}
        </span>
      </div>
      
      <p className="text-textMuted text-sm mb-4 flex-grow">
        {project.description.substring(0, 100)}...
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {project.techStack?.map((tech, index) => (
          <span key={index} className="text-xs font-mono font-normal px-2 py-1 bg-tagBg text-tagText rounded-md">
            {tech}
          </span>
        ))}
      </div>

      <div className="pt-4 border-t border-border mt-auto flex justify-between items-center">
        <div className="text-xs text-textMuted">
          Created By: <span className="font-medium text-textMain">{project.owner?.name || 'Unknown'}</span>
        </div>
        <Link to={`/projects/${project._id}`} className="text-sm text-primary hover:text-primaryHover font-medium">
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
