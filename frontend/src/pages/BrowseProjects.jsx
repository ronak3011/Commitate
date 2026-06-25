import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import Input from '../components/Input';
import { Search } from 'lucide-react';

const BrowseProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        
        if (res.ok) {
          setProjects(data);
        } else {
          setError(data.message || 'Failed to fetch projects');
        }
      } catch (err) {
        setError('Cannot connect to server.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-medium text-textMain mb-2">Browse Projects</h1>
          <p className="text-textMuted">Discover abandoned projects and give them a second life.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-textMuted" />
          </div>
          <input
            type="text"
            className="w-full bg-surface border border-border rounded-md pl-10 pr-3 py-2 text-textMain placeholder-textMuted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-textMuted">Loading projects...</div>
      ) : error ? (
        <div className="py-20 text-center text-red-500 bg-red-500/10 rounded-xl">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <ProjectCard key={project._id} project={project} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-textMuted">
              No projects found matching "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BrowseProjects;
