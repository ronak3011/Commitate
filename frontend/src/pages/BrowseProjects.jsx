import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import Input from '../components/Input';
import { Search, Filter } from 'lucide-react';

const BrowseProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

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

  const filteredProjects = projects.filter(p => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(searchLower) || 
                          p.techStack?.some(tech => tech.toLowerCase().includes(searchLower));
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-medium text-textMain mb-2">Browse Projects</h1>
          <p className="text-textMuted">Discover abandoned projects and give them a second life.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-textMuted" />
            </div>
            <input
              type="text"
              className="w-full bg-surface border border-border rounded-md pl-10 pr-3 py-2 text-sm text-textMain placeholder-textMuted focus:outline-none focus:border-primary transition-colors"
              placeholder="Search title or tech..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative w-full sm:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-textMuted" />
            </div>
            <select
              className="w-full bg-surface border border-border rounded-md pl-10 pr-8 py-2 text-sm text-textMain appearance-none focus:outline-none focus:border-primary transition-colors cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Up for Adoption">Up for Adoption</option>
              <option value="Seeking Maintainer">Seeking Maintainer</option>
              <option value="Needs Contributors">Needs Contributors</option>
              <option value="Adopted">Adopted</option>
              <option value="Archived">Archived</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-textMuted">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
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
