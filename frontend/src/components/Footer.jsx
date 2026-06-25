import { Link } from 'react-router-dom';
import { LogoA } from './Logos';

const Footer = () => {
  return (
    <footer className="border-t border-border mt-auto bg-background/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-center">
        <p className="text-sm text-textMuted">
          &copy; {new Date().getFullYear()} Commitate. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
