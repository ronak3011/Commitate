import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BrowseProjects from './pages/BrowseProjects';
import CreateProject from './pages/CreateProject';
import ProjectDetails from './pages/ProjectDetails';
import EditProject from './pages/EditProject';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* MainLayout wraps all these routes with our Navbar and Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/projects" element={<BrowseProjects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            
            {/* Protected Routes (Must be logged in to access!) */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/create-project" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
            <Route path="/edit-project/:id" element={
                <ProtectedRoute>
                  <EditProject />
                </ProtectedRoute>
              } />
              
              {/* Public User Profile Route */}
              <Route path="/user/:id" element={<UserProfile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
