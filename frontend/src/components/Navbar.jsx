import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Button from './Button';
import { Sun, Moon, Inbox } from 'lucide-react';
import { LogoA } from './Logos';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  
  // Theme state (default to dark)
  const [isDark, setIsDark] = useState(true);

  // Apply the dark class to the HTML document when state changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2 group">
            <LogoA className="h-7 w-7 text-textMain group-hover:text-primary transition-colors duration-300" />
            <span className="font-medium text-xl tracking-tight text-textMain">
              Commitate
            </span>
          </Link>

          {/* Links Section */}
          <div className="flex items-center space-x-4">
            
            {/* Theme Toggle Button */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-textMuted hover:text-textMain transition-colors rounded-md hover:bg-surface"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <Link to="/#how-it-works" className="text-sm font-medium text-textMuted hover:text-textMain transition-colors hidden md:block">
              How it Works
            </Link>

            <Link to="/projects" className="text-sm font-medium text-textMuted hover:text-textMain transition-colors">
              Browse Projects
            </Link>

            {/* Conditional Rendering based on Auth State */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-sm font-medium text-textMuted hover:text-textMain transition-colors flex items-center gap-2">
                  <Inbox className="h-4 w-4" />
                  Inbox
                </Link>
                
                <div className="h-4 w-px bg-gray-300 dark:bg-[#444] hidden sm:block"></div>

                <Link to={`/user/${user._id}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-7 h-7 rounded-full bg-surfaceHover border border-border flex items-center justify-center text-xs font-bold text-textMain">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm font-medium text-textMain hidden sm:block">{user.name}</span>
                </Link>

                <Button variant="ghost" onClick={logout} className="ml-2">Logout</Button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-textMuted hover:text-textMain transition-colors px-3">
                  Log in
                </Link>
                <Link to="/register">
                  <Button variant="primary">Sign up</Button>
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
