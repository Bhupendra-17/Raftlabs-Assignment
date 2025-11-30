import React from 'react';
import { ArrowRight, Sparkles, Zap, Shield, Search } from 'lucide-react';
import { Page } from '../types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 flex flex-col items-center text-center px-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
        <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 mb-8 cursor-default">
          <Sparkles size={12} className="mr-2 fill-primary" />
          <span>v2.0 is now live</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl mb-6 leading-tight">
          Discover the Future of <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-accent animate-gradient-x">Generative AI</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          The ultimate directory for AI tools. Compare, review, and find the perfect AI solution for your next big project.
        </p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full justify-center">
          <button 
            onClick={() => onNavigate('tools')}
            className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-10 text-base font-medium text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
          >
            Explore Tools
            <ArrowRight size={18} className="ml-2" />
          </button>
          <button className="inline-flex h-14 items-center justify-center rounded-full border border-input bg-background px-10 text-base font-medium shadow-sm transition-colors hover:bg-secondary hover:text-secondary-foreground">
            <Search size={18} className="mr-2" />
            Search Catalog
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-4 container mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group flex flex-col items-center text-center p-8 rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="p-4 bg-primary/10 rounded-full mb-6 text-primary group-hover:scale-110 transition-transform">
                    <Zap size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Real-time Updates</h3>
                <p className="text-muted-foreground leading-relaxed">Our database is updated hourly with the latest releases from the AI community.</p>
            </div>
             <div className="group flex flex-col items-center text-center p-8 rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="p-4 bg-accent/10 rounded-full mb-6 text-accent group-hover:scale-110 transition-transform">
                    <Shield size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Verified Tools</h3>
                <p className="text-muted-foreground leading-relaxed">Every tool is manually vetted by our team to ensure quality and safety standards.</p>
            </div>
             <div className="group flex flex-col items-center text-center p-8 rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="p-4 bg-pink-500/10 rounded-full mb-6 text-pink-500 group-hover:scale-110 transition-transform">
                    <Sparkles size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Categories</h3>
                <p className="text-muted-foreground leading-relaxed">Easily filter by category, pricing, and rating to find exactly what you need.</p>
            </div>
         </div>
      </section>
    </div>
  );
};