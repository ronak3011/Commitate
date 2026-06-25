import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Using our new Vite proxy!
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        login(data, data.token); // Save to context & local storage
        navigate('/dashboard'); // Send them to dashboard!
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Cannot connect to server. Is it running?');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-textMain mb-2">Welcome Back</h2>
          <p className="text-textMuted text-sm">Enter your credentials to access your projects.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-md mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input 
            label="Email Address" 
            id="email" 
            type="email" 
            placeholder="developer@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input 
            label="Password" 
            id="password" 
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Button type="submit" variant="primary" className="w-full mt-4">
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-textMuted">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:text-primaryHover font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
