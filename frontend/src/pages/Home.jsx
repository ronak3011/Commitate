import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { LogoA } from '../components/Logos';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      
      {/* HERO SECTION */}
      <section className="relative w-full flex flex-col items-center justify-center pt-32 pb-24 px-4 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto w-full z-10">
          <LogoA className="w-16 h-16 text-primary mb-8 drop-shadow-md animate-fade-in" />
          
          <h1 className="text-4xl md:text-6xl font-semibold text-textMain tracking-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Commitate
          </h1>
          
          <p className="text-lg md:text-xl text-textMuted max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Where abandoned code finds new contributors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/projects" className="block w-full sm:w-48">
              <Button variant="primary" className="w-full h-full text-base py-3 px-6 shadow-lg shadow-primary/20">
                Browse Projects
              </Button>
            </Link>
            <Link to="/create-project" className="block w-full sm:w-48">
              <Button variant="secondary" className="w-full h-full text-base py-3 px-6 bg-surface/50 backdrop-blur-sm border-border hover:border-textMain transition-all">
                Submit Project
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="w-full py-24 px-4 bg-surface/30 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-textMain mb-4">How it works</h2>
            <p className="text-textMuted max-w-xl mx-auto">Pass the torch to a new generation of developers in three simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-surface border border-border p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 border border-primary/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </div>
              <h3 className="text-xl font-medium text-textMain mb-3">Submit</h3>
              <p className="text-textMuted text-sm leading-relaxed">List a project you no longer have time to maintain. Describe its tech stack and what's left to build.</p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-surface border border-border p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center mb-6 border border-indigo-500/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <h3 className="text-xl font-medium text-textMain mb-3">Review</h3>
              <p className="text-textMuted text-sm leading-relaxed">Developers will apply to adopt your project. Review their profiles and messages in your inbox.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-surface border border-border p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-fuchsia-500/10 text-fuchsia-400 rounded-xl flex items-center justify-center mb-6 border border-fuchsia-500/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-medium text-textMain mb-3">Transfer</h3>
              <p className="text-textMuted text-sm leading-relaxed">Approve the best candidate. They get the code, you get the credit, and the open-source community wins.</p>
            </div>
          </div>
        </div>
      </section>



      {/* FINAL CTA SECTION */}
      <section className="w-full py-24 px-4 bg-primary/5 border-t border-border">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl font-semibold text-textMain mb-6">Ready to save a repository?</h2>
          <p className="text-textMuted text-lg mb-8">Join the community of developers adopting and reviving open source projects today.</p>
          <Link to="/register">
            <Button variant="primary" className="py-3 px-8 text-lg">
              Create an Account
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
