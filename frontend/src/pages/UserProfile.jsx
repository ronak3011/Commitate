import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { User, FolderOpen, Heart } from 'lucide-react';

const UserProfile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/auth/${id}/profile`);
        const data = await res.json();
        
        if (res.ok) {
          setProfileData(data);
        } else {
          setError(data.message || 'Failed to load profile');
        }
      } catch (err) {
        setError('Cannot connect to server');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <div className="max-w-6xl mx-auto py-20 px-4 text-center text-textMuted">Loading profile...</div>;
  }

  if (error || !profileData) {
    return (
      <div className="max-w-6xl mx-auto py-20 px-4 text-center">
        <div className="bg-red-500/10 text-red-500 p-6 rounded-xl inline-block">
          {error || 'User not found'}
        </div>
      </div>
    );
  }

  const { user, createdProjects, adoptedProjects } = profileData;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Profile Header */}
      <div className="max-w-3xl mx-auto bg-surface border border-border p-8 rounded-2xl mb-12 flex flex-col items-center text-center shadow-sm">
        <div className="w-20 h-20 bg-primary/10 border-2 border-primary/20 rounded-full flex items-center justify-center mb-4">
          <User className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-medium text-textMain mb-2">{user.name}</h1>
        <p className="text-textMuted max-w-md">
          Member since {new Date(user.createdAt).toLocaleDateString()}
        </p>
        
        <div className="flex gap-6 mt-6">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-textMain">{createdProjects.length}</span>
            <span className="text-xs text-textMuted uppercase tracking-wider">Created</span>
          </div>
          <div className="w-px h-10 bg-border"></div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-textMain">{adoptedProjects.length}</span>
            <span className="text-xs text-textMuted uppercase tracking-wider">Adopted</span>
          </div>
        </div>
      </div>

      {/* Created Projects */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <FolderOpen className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-medium text-textMain">Projects by {user.name}</h2>
        </div>
        
        {createdProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {createdProjects.map(project => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="bg-surface border border-dashed border-border p-8 rounded-2xl text-center text-textMuted max-w-3xl mx-auto">
            This user hasn't created any projects yet.
          </div>
        )}
      </div>

      {/* Adopted Projects */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Heart className="h-6 w-6 text-fuchsia-500" />
          <h2 className="text-2xl font-medium text-textMain">Successfully Adopted</h2>
        </div>
        
        {adoptedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adoptedProjects.map(project => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="bg-surface border border-dashed border-border p-8 rounded-2xl text-center text-textMuted max-w-3xl mx-auto">
            This user hasn't adopted any projects yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
