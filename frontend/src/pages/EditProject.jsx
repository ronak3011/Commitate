import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubUrl: '',
    demoUrl: '',
    techStack: '',
    status: 'Up for Adoption',
    whatsLeft: ''
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();
        
        if (res.ok) {
          setFormData({
            title: data.title,
            description: data.description,
            githubUrl: data.githubUrl,
            demoUrl: data.demoUrl || '',
            techStack: data.techStack ? data.techStack.join(', ') : '',
            status: data.status,
            whatsLeft: data.whatsLeft || ''
          });
        } else {
          setError(data.message || 'Project not found');
        }
      } catch (err) {
        setError('Failed to fetch project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Convert comma separated tech stack into array
      const projectPayload = {
        ...formData,
        techStack: formData.techStack.split(',').map(tech => tech.trim()).filter(Boolean)
      };

      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectPayload)
      });

      const data = await res.json();

      if (res.ok) {
        navigate(`/projects/${id}`);
      } else {
        setError(data.message || 'Failed to update project');
      }
    } catch (err) {
      setError('Cannot connect to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-textMuted">Loading project...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-medium text-textMain mb-2">Edit Project</h1>
      <p className="text-textMuted mb-8">Update the details of your uploaded project.</p>

      <form onSubmit={handleSubmit} className="bg-surface border border-border p-6 md:p-8 rounded-xl space-y-4">
        
        <Input 
          label="Project Title" 
          id="title" 
          required 
          placeholder="E.g., Crypto Tracker App"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />
        
        <div className="flex flex-col space-y-1 mb-4">
          <label htmlFor="description" className="text-sm font-medium text-textMuted">Description</label>
          <textarea 
            id="description" 
            required 
            rows={4}
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-textMain focus:border-primary focus:outline-none"
            placeholder="What was this project supposed to do?"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="GitHub URL" 
            id="githubUrl" 
            required 
            placeholder="https://github.com/..."
            value={formData.githubUrl}
            onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
          />
          <Input 
            label="Tech Stack (comma separated)" 
            id="techStack" 
            placeholder="React, Node.js, MongoDB"
            value={formData.techStack}
            onChange={(e) => setFormData({...formData, techStack: e.target.value})}
          />
        </div>

        <div className="flex flex-col space-y-1 mb-4">
          <label htmlFor="whatsLeft" className="text-sm font-medium text-textMuted">Pending Tasks</label>
          <textarea 
            id="whatsLeft" 
            required 
            rows={2}
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-textMain focus:border-primary focus:outline-none"
            placeholder="E.g., Needs authentication and responsive design."
            value={formData.whatsLeft}
            onChange={(e) => setFormData({...formData, whatsLeft: e.target.value})}
          />
        </div>

        <div className="flex flex-col space-y-1 mb-8">
          <label htmlFor="status" className="text-sm font-medium text-textMuted">Current Status</label>
          <select
            id="status"
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-textMain focus:border-primary focus:outline-none appearance-none"
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
          >
            <option value="Up for Adoption">Up for Adoption (Default)</option>
            <option value="Seeking Maintainer">Seeking Maintainer</option>
            <option value="Needs Contributors">Needs Contributors</option>
            <option value="Adopted">Adopted</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-md mb-6 text-center">
            {error}
          </div>
        )}

        <div className="pt-4 border-t border-border flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => navigate(`/projects/${id}`)}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
