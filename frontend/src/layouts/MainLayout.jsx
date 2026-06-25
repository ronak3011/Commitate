import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-textMain">
      <Navbar />
      
      <main className="flex-grow animate-fade-in">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
