import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Rocket, Search } from 'lucide-react';
import { Page } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize dark mode based on system preference or default
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 font-sans">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 font-bold text-xl cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-primary text-white p-1.5 rounded-lg shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
              <Rocket size={20} className="fill-white" />
            </div>
            <span className="tracking-tight group-hover:text-primary transition-colors">AI Tool Finder</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <button 
              onClick={() => onNavigate('home')}
              className={`transition-colors hover:text-primary ${currentPage === 'home' ? 'text-primary font-bold' : 'text-foreground/60'}`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('tools')}
              className={`transition-colors hover:text-primary ${currentPage === 'tools' ? 'text-primary font-bold' : 'text-foreground/60'}`}
            >
              Browse Tools
            </button>
            <button 
              className={`transition-colors hover:text-primary text-foreground/60 cursor-not-allowed`}
              title="Coming Soon"
            >
              Categories
            </button>
            <div className="h-4 w-px bg-border"></div>
            <button
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-input bg-transparent shadow-sm hover:bg-accent hover:text-white transition-colors"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button 
                onClick={() => onNavigate('tools')}
                className="bg-primary hover:bg-primary/90 text-white h-9 px-5 py-2 rounded-full shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30"
            >
                Get Started
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center space-x-4">
             <button
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b bg-background p-4 space-y-4 animate-in slide-in-from-top-2">
            <button 
              onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 hover:bg-secondary rounded-md"
            >
              Home
            </button>
            <button 
              onClick={() => { onNavigate('tools'); setIsMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 hover:bg-secondary rounded-md"
            >
              Browse Tools
            </button>
             <button 
                onClick={() => { onNavigate('tools'); setIsMobileMenuOpen(false); }}
                className="w-full bg-primary text-white hover:bg-primary/90 h-10 px-4 py-2 rounded-lg font-medium shadow-lg shadow-primary/20"
            >
                Get Started
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
               <div className="flex items-center space-x-2 font-bold text-lg">
                <div className="bg-primary text-white p-1 rounded-md">
                  <Rocket size={16} className="fill-white" />
                </div>
                <span>AI Tool Finder</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Discover the best AI tools to supercharge your workflow. Curated daily for developers, designers, and creators.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© 2024 AI Tool Finder. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
               <a href="#" className="hover:text-primary transition-colors">Twitter</a>
               <a href="#" className="hover:text-primary transition-colors">GitHub</a>
               <a href="#" className="hover:text-primary transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};