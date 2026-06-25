import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { LogoA } from '../components/Logos';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4">
      {/* HERO SECTION */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto w-full mb-16">
        
        <LogoA className="w-12 h-12 text-primary mb-6 drop-shadow-md" />
        
        <h1 className="text-3xl font-medium text-textMain tracking-tight mb-4">
          Commitate
        </h1>
        
        <p className="text-lg text-textMuted max-w-xl mx-auto mb-8 leading-relaxed">
          Where abandoned code finds new contributors
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link to="/projects" className="block w-full sm:w-48">
            <Button variant="primary" className="w-full h-full text-base py-2.5 px-6 border-2 border-transparent">
              Browse Projects
            </Button>
          </Link>
          <Link to="/create-project" className="block w-full sm:w-48">
            <Button variant="secondary" className="w-full h-full text-base py-2.5 px-6 border-2 border-textMuted hover:border-textMain">
              Submit Project
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
