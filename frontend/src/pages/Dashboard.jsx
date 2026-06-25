import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';
import ProjectCard from '../components/ProjectCard';
import { PlusCircle, Inbox, Folder, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [myProjects, setMyProjects] = useState([]);
  const [requests, setRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch My Projects
        const projRes = await fetch('/api/projects/my-projects', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const projData = await projRes.json();
        if (projRes.ok) setMyProjects(projData);

        // Fetch Received Requests
        const reqRes = await fetch('/api/applications/received', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const reqData = await reqRes.json();
        if (reqRes.ok) setRequests(reqData);

        // Fetch Sent Requests (My Adoptions)
        const sentRes = await fetch('/api/applications/sent', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const sentData = await sentRes.json();
        if (sentRes.ok) setSentRequests(sentData);

      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [token]);

  const handleRequestAction = async (requestId, status) => {
    try {
      const res = await fetch(`/api/applications/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      
      if (res.ok) {
        // Update local state to reflect the change
        setRequests(requests.map(req => req._id === requestId ? { ...req, status } : req));
        
        // If approved, show alert
        if (status === 'Approved') {
          alert('Project marked as Adopted! Please go to your GitHub settings and invite the user to the repository.');
        }
      }
    } catch (err) {
      console.error('Action failed', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-surface border border-border p-8 rounded-xl">
        <div>
          <h1 className="text-3xl font-medium text-textMain mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-textMuted">You have {myProjects.length} projects and {requests.filter(r => r.status === 'Pending').length} pending requests.</p>
        </div>
        <Link to="/create-project" className="mt-4 md:mt-0">
          <Button variant="primary" className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Upload Project
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-8 gap-6">
        <button 
          onClick={() => setActiveTab('projects')}
          className={`pb-3 font-medium flex items-center gap-2 transition-colors ${activeTab === 'projects' ? 'border-b-2 border-primary text-textMain' : 'text-textMuted hover:text-textMain'}`}
        >
          <Folder className="w-4 h-4" /> My Projects
        </button>
        <button 
          onClick={() => setActiveTab('inbox')}
          className={`pb-3 font-medium flex items-center gap-2 transition-colors ${activeTab === 'inbox' ? 'border-b-2 border-primary text-textMain' : 'text-textMuted hover:text-textMain'}`}
        >
          <Inbox className="w-4 h-4" /> Inbox 
          {requests.filter(r => r.status === 'Pending').length > 0 && (
            <span className="bg-primary text-background text-xs px-2 py-0.5 rounded-full">
              {requests.filter(r => r.status === 'Pending').length}
            </span>
          )}
        </button>
        <button 
          onClick={() => setActiveTab('adoptions')}
          className={`pb-3 font-medium flex items-center gap-2 transition-colors ${activeTab === 'adoptions' ? 'border-b-2 border-primary text-textMain' : 'text-textMuted hover:text-textMain'}`}
        >
          <CheckCircle className="w-4 h-4" /> My Adoptions
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-textMuted">Loading...</div>
      ) : activeTab === 'projects' ? (
        /* My Projects Section */
        myProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProjects.map(project => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
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
        )
      ) : activeTab === 'inbox' ? (
        /* Inbox Section */
        requests.filter(req => req.project).length > 0 ? (
          <div className="space-y-4">
            {requests.filter(req => req.project).map(req => (
              <div key={req._id} className="bg-surface border border-border rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium text-textMain mb-1">
                    <span className="text-primary">
                      {req.applicant ? (
                        <Link to={`/user/${req.applicant._id}`} className="hover:underline">{req.applicant.name}</Link>
                      ) : (
                        'Unknown User'
                      )}
                    </span> wants to adopt <span className="font-bold">{req.project.title}</span>
                  </h3>
                  <p className="text-textMuted text-sm mb-3">"{req.message}"</p>
                  <p className="text-xs text-textMuted">Status: <span className="font-medium text-textMain">{req.status}</span></p>
                </div>
                
                {req.status === 'Pending' && (
                  <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                    <Button variant="secondary" className="w-full md:w-auto text-sm bg-[#222] border-[#333] hover:border-[#555]" onClick={() => handleRequestAction(req._id, 'Rejected')}>Reject</Button>
                    <Button variant="primary" className="w-full md:w-auto text-sm" onClick={() => handleRequestAction(req._id, 'Approved')}>Approve</Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-surface border border-border rounded-xl py-20 text-center text-textMuted">
            You have no incoming requests yet.
          </div>
        )
      ) : (
        /* My Adoptions Section */
        sentRequests.filter(req => req.project).length > 0 ? (
          <div className="space-y-4">
            {sentRequests.filter(req => req.project).map(req => (
              <div key={req._id} className="bg-surface border border-border rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-textMain">
                    Application to adopt <span className="font-bold">{req.project.title}</span>
                  </h3>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                    req.status === 'Approved' ? 'bg-primary/10 text-primary border-primary/20' : 
                    req.status === 'Rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                    'bg-amber-500/10 text-amber-500 border-amber-500/20'
                  }`}>
                    {req.status}
                  </span>
                </div>
                
                {req.status === 'Approved' ? (
                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg mt-2 text-sm text-textMuted">
                    <strong className="text-primary block mb-1">Congratulations!</strong>
                    The owner (
                      {req.project.owner ? (
                        <Link to={`/user/${req.project.owner._id}`} className="text-textMain hover:text-primary transition-colors">{req.project.owner.name}</Link>
                      ) : (
                        'Unknown'
                      )}
                    ) has approved your request. Keep an eye on your email or GitHub for an invitation to the repository!
                  </div>
                ) : req.status === 'Pending' ? (
                  <div className="bg-surfaceHover border border-border p-4 rounded-lg mt-2 text-sm text-textMuted">
                    Your application has been sent to {req.project.owner ? <Link to={`/user/${req.project.owner._id}`} className="text-textMain hover:text-primary transition-colors">{req.project.owner.name}</Link> : 'Unknown'}. You will be notified here when they review it.
                  </div>
                ) : (
                  <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-lg mt-2 text-sm text-textMuted">
                    Unfortunately, your request to adopt this project was declined by the owner.
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-surface border border-border rounded-xl py-20 text-center text-textMuted">
            You haven't applied to adopt any projects yet.
          </div>
        )
      )}
    </div>
  );
};

export default Dashboard;
