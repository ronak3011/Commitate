import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-textMain">
      <Navbar />
      
      <main className="flex-grow animate-fade-in">
        <Outlet />
      </main>

      <footer className="py-8 text-center text-sm text-textMuted border-t border-border mt-auto">
        Every project deserves another commit.
      </footer>
    </div>
  );
};

export default MainLayout;
