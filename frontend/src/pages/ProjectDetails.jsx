import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);

  // AI State
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [analysisError, setAnalysisError] = useState('');

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setAnalysisError('');
    try {
      const res = await fetch(`/api/ai/analyze/${id}`);
      const data = await res.json();
      if (res.ok) {
        setAnalysis(data);
      } else {
        setAnalysisError(data.message || 'Failed to analyze project');
      }
    } catch (err) {
      setAnalysisError('Network error while analyzing');
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`, {
          headers: token ? {
            'Authorization': `Bearer ${token}`
          } : {}
        });
        const data = await res.json();
        
        if (res.ok) {
          setProject(data);
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

  const handleApply = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate('/login');
      return;
    }

    setApplying(true);
    setApplyError('');

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          projectId: project._id,
          message
        })
      });

      const data = await res.json();

      if (res.ok) {
        setApplySuccess(true);
        setTimeout(() => setShowModal(false), 2000);
      } else {
        setApplyError(data.message || 'Failed to submit application');
      }
    } catch (err) {
      setApplyError('Network error while applying');
    } finally {
      setApplying(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this project? This cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        navigate('/dashboard');
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to delete project');
        setIsDeleting(false);
      }
    } catch (err) {
      alert('Network error while deleting');
      setIsDeleting(false);
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

  const getButtonText = (status) => {
    switch (status) {
      case 'Up for Adoption': return 'Adopt Project';
      case 'Seeking Maintainer': return 'Become Maintainer';
      case 'Needs Contributors': return 'Contribute';
      case 'Adopted': return 'View Project';
      case 'Archived': return 'View Archive';
      default: return 'Apply';
    }
  };

  if (loading) return <div className="text-center py-20 text-textMuted">Loading project...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!project) return null;

  const isOwner = user && project.owner && user._id === project.owner._id;
  const isActionable = ['Up for Adoption', 'Seeking Maintainer', 'Needs Contributors'].includes(project.status);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      
      {/* HEADER SECTION */}
      <div className="mb-8 border-b border-border pb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-medium text-textMain mb-2">{project.title}</h1>
          <div className="flex flex-col gap-2 mt-2">
            <p className="text-textMuted flex flex-wrap gap-2 items-center">
              Created by &mdash;{' '}
              {project.owner ? (
                <Link to={`/user/${project.owner._id}`} className="text-[#A0A0A0] font-medium hover:text-primary transition-colors">
                  {project.owner.name}
                </Link>
              ) : (
                <span className="text-[#A0A0A0] font-medium">Unknown</span>
              )}
              {isOwner && (
                <span className="text-[10px] font-medium uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                  You
                </span>
              )}
            </p>
            {project.adopter && (
              <p className="text-textMuted flex flex-wrap gap-2 items-center">
                Adopted by &mdash;{' '}
                <Link to={`/user/${project.adopter._id}`} className="font-medium text-fuchsia-400 hover:text-fuchsia-300 transition-colors">
                  {project.adopter.name}
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* MAIN CONTENT (Left Side) */}
        <div className="lg:col-span-2">
          <div className="bg-surface border border-border p-6 md:p-8 rounded-xl space-y-8">
            <div>
              <h2 className="text-xl font-medium text-textMain mb-4">Description</h2>
              <p className="text-textMuted whitespace-pre-line leading-relaxed">{project.description}</p>
            </div>

            <div className="pt-8 border-t border-border">
              <h2 className="text-xl font-medium text-textMain mb-4">Pending Tasks</h2>
              <p className="text-textMuted whitespace-pre-line leading-relaxed">{project.whatsLeft || 'Nothing specified.'}</p>
            </div>

            {/* AI Analysis Result */}
            {analysis && (
              <div className="pt-8 border-t border-border animate-fade-in">
                <div className="bg-surface border border-indigo-200 dark:border-indigo-500/30 rounded-xl p-6 md:p-8 shadow-sm dark:shadow-[0_0_15px_rgba(99,102,241,0.05)]">
                  <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
                    <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <h2 className="text-xl font-medium text-indigo-600 dark:text-indigo-400">
                      Project Insights
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-semibold text-indigo-600/80 dark:text-indigo-400/80 uppercase tracking-wider mb-2">Difficulty to Adopt</h4>
                      <div className="inline-block px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium border border-indigo-200 dark:border-indigo-500/20">
                        {analysis.difficulty}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-semibold text-indigo-600/80 dark:text-indigo-400/80 uppercase tracking-wider mb-2">Project Viability</h4>
                      <p className="text-textMuted text-sm leading-relaxed">{analysis.viability}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-semibold text-indigo-600/80 dark:text-indigo-400/80 uppercase tracking-wider mb-2">Suggested Action Plan</h4>
                      <div className="text-textMuted text-sm leading-relaxed space-y-2">
                        {Array.isArray(analysis.actionPlan) ? (
                          <ul className="list-disc pl-5 space-y-2 marker:text-indigo-400 dark:marker:text-indigo-500/50">
                            {analysis.actionPlan.map((step, i) => (
                              <li key={i}>{step}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="whitespace-pre-line">{analysis.actionPlan}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SIDEBAR (Right Side) */}
        <div className="space-y-6">
          <div className="bg-surface border border-border p-6 rounded-xl">
            
            {/* Status & Action Button */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-medium text-textMain uppercase tracking-wider">Status</h3>
                <span className={`whitespace-nowrap text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusStyle(project.status)}`}>
                  {project.status}
                </span>
              </div>

              {isOwner ? (
                <div className="flex flex-col gap-3">
                  <Link to={`/edit-project/${project._id}`} className="w-full">
                    <Button variant="ghost" className="w-full border border-border bg-surfaceHover/50 hover:bg-surfaceHover text-textMain transition-colors shadow-sm">
                      Edit Project
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full border border-border bg-surfaceHover/50 hover:bg-surfaceHover text-textMain transition-colors shadow-sm" 
                    onClick={handleDelete} 
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete Project'}
                  </Button>
                </div>
              ) : isActionable ? (
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={() => setShowModal(true)}
                >
                  {getButtonText(project.status)}
                </Button>
              ) : (
                <Button variant="secondary" className="w-full opacity-50 cursor-not-allowed">
                  {getButtonText(project.status)}
                </Button>
              )}
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-textMain mb-3 uppercase tracking-wider">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((tech, index) => (
                  <span key={index} className="text-xs font-mono bg-tagBg text-tagText px-2.5 py-1 rounded-md border border-border">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-textMain mb-3 uppercase tracking-wider">Links</h3>
              <div className="space-y-3">
                {project.githubUrl ? (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center text-textMuted hover:text-primary transition-colors text-sm font-medium">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                    GitHub Repository
                  </a>
                ) : (
                  <div className="flex items-center text-textMuted text-sm italic">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Apply and wait for approval to view GitHub link
                  </div>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noreferrer" className="flex items-center text-textMuted hover:text-primary transition-colors text-sm font-medium">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* AI Analyzer */}
            <div className="pt-6 border-t border-border">
              <Button 
                onClick={handleAnalyze} 
                disabled={analyzing}
                className="w-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                {analyzing ? 'Analyzing...' : 'Analyze Project'}
              </Button>
              {analysisError && <p className="text-red-400 text-xs mt-2 text-center">{analysisError}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* APPLICATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-surface border border-border rounded-xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
            
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-textMuted hover:text-textMain"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {applySuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-medium text-textMain mb-2">Application Sent!</h3>
                <p className="text-textMuted">The owner will review your request shortly.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-medium text-textMain mb-2">Apply for Project</h3>
                <p className="text-sm text-textMuted mb-6">Write a short message to the owner explaining why you're a good fit.</p>
                
                <form onSubmit={handleApply}>
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-textMain focus:border-primary focus:outline-none mb-4"
                    placeholder="E.g., I'm a React developer and I'd love to finish the auth system..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>

                  {applyError && (
                    <div className="text-red-500 text-sm mb-4 bg-red-500/10 p-2 rounded border border-red-500/20">
                      {applyError}
                    </div>
                  )}

                  <div className="flex gap-3 justify-end mt-4">
                    <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button type="submit" variant="primary" disabled={applying}>
                      {applying ? 'Sending...' : 'Send Request'}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
