import { Link } from 'react-router-dom';
import Button from './Button';

const ProjectCard = ({ project }) => {
  const getButtonText = (status) => {
    switch (status) {
      case 'Up for Adoption': return 'Adopt Project';
      case 'Seeking Maintainer': return 'Become Maintainer';
      case 'Needs Contributors': return 'Contribute';
      case 'Adopted': return 'View Project';
      case 'Archived': return 'View Archive';
      default: return 'View Details';
    }
  };

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
      case 'Up for Adoption':
      default:
        return 'bg-rose-400/10 text-rose-400 border-rose-400/30';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 hover:-translate-y-px hover:bg-surfaceHover hover:border-primary transition-all duration-200 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-medium text-textMain">{project.title}</h3>
        <span className={`whitespace-nowrap text-xs font-medium px-2 py-1 rounded-full border ${getStatusStyle(project.status)}`}>
          {project.status}
        </span>
      </div>
      
      <p className="text-textMuted text-sm mb-4 flex-grow">
        {project.description.substring(0, 100)}...
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {project.techStack?.slice(0, 3).map((tech, index) => (
          <span key={index} className="text-xs font-mono font-normal px-2 py-1 bg-tagBg text-tagText rounded-md">
            {tech}
          </span>
        ))}
        {project.techStack?.length > 3 && (
          <span className="text-xs font-mono font-normal px-2 py-1 bg-surfaceHover text-textMuted rounded-md">
            +{project.techStack.length - 3} more
          </span>
        )}
      </div>

      <div className="pt-4 border-t border-border mt-auto flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="text-xs text-textMuted">
            Created by &mdash;{' '}
            {project.owner ? (
              <Link to={`/user/${project.owner._id}`} className="font-medium text-[#A0A0A0] hover:text-primary transition-colors">
                {project.owner.name}
              </Link>
            ) : (
              <span className="font-medium text-[#A0A0A0]">Unknown</span>
            )}
          </div>
          {project.adopter && (
            <div className="text-xs text-textMuted">
              Adopted by &mdash;{' '}
              <Link to={`/user/${project.adopter._id}`} className="font-medium text-fuchsia-400 hover:text-fuchsia-300 transition-colors">
                {project.adopter.name}
              </Link>
            </div>
          )}
        </div>
        <Link to={`/projects/${project._id}`} className="w-full">
          <Button variant="secondary" className="w-full text-sm py-2 bg-[#222] border-[#333] hover:border-[#555]">
            {getButtonText(project.status)}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
