import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';
import ProjectCard from '../components/ProjectCard';
import { PlusCircle } from 'lucide-react';

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [myProjects, setMyProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const res = await fetch('/api/projects/my-projects', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          setMyProjects(data);
        }
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchMyProjects();
    }
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-surface border border-border p-8 rounded-xl">
        <div>
          <h1 className="text-3xl font-medium text-textMain mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-textMuted">You have {myProjects.length} projects in your portfolio.</p>
        </div>
        <Link to="/create-project" className="mt-4 md:mt-0">
          <Button variant="primary" className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Upload Project
          </Button>
        </Link>
      </div>

      {/* My Projects Section */}
      <h2 className="text-xl font-medium text-textMain mb-6">My Projects</h2>
      
      {loading ? (
        <div className="py-20 text-center text-textMuted">Loading your projects...</div>
      ) : myProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProjects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-surface border border-dashed border-border rounded-xl py-20 text-center flex flex-col items-center">
          <div className="bg-background p-4 rounded-full mb-4">
            <PlusCircle className="h-8 w-8 text-textMuted" />
          </div>
          <h3 className="text-lg font-medium text-textMain mb-2">No projects yet</h3>
          <p className="text-textMuted mb-6">You haven't uploaded any projects yet.</p>
          <Link to="/create-project">
            <Button variant="secondary">Create your first project</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
