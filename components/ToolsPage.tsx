import React, { useState, useMemo, useEffect } from 'react';
import { toolsData } from '../data/tools';
import { Star, ExternalLink, Filter, X, Globe, CheckCircle2, ThumbsUp, ThumbsDown, Search, ArrowUpDown, ChevronDown, SlidersHorizontal, LayoutGrid, List as ListIcon } from 'lucide-react';
import { AiTool } from '../types';

interface ToolsPageProps {
  initialCategory?: string;
}

export const ToolsPage: React.FC<ToolsPageProps> = ({ initialCategory = 'All' }) => {
  const [selectedTool, setSelectedTool] = useState<AiTool | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedPricing, setSelectedPricing] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('Newest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync prop with state if it changes (e.g., re-navigation)
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Extract unique categories and pricing for filter lists
  const categories = useMemo(() => {
    const cats = Array.from(new Set(toolsData.map(t => t.category)));
    return ['All', ...cats.sort()];
  }, []);

  const pricingOptions = useMemo(() => {
    const prices = Array.from(new Set(toolsData.map(t => t.pricing)));
    return ['All', ...prices.sort()];
  }, []);

  // Filter and Sort Logic
  const filteredTools = useMemo(() => {
    return toolsData
      .filter(tool => {
        const matchesSearch = 
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.category.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
        const matchesPricing = selectedPricing === 'All' || tool.pricing === selectedPricing;

        return matchesSearch && matchesCategory && matchesPricing;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'Newest':
            // Assuming higher ID is newer for this mock data
            return parseInt(b.id) - parseInt(a.id);
          case 'Oldest':
            return parseInt(a.id) - parseInt(b.id);
          case 'Top Rated':
            return b.rating - a.rating;
          case 'Name (A-Z)':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [searchQuery, selectedCategory, selectedPricing, sortBy]);

  // Helper to get count for a category
  const getCategoryCount = (category: string) => {
    if (category === 'All') return toolsData.length;
    return toolsData.filter(t => t.category === category).length;
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 min-h-screen">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Discover AI Tools</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Browse our curated collection of {toolsData.length} cutting-edge AI applications to supercharge your workflow.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Mobile Filter Toggle */}
        <button 
          className="lg:hidden flex items-center justify-between px-4 py-3 bg-card border border-border rounded-xl font-medium shadow-sm"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <span className="flex items-center"><SlidersHorizontal size={18} className="mr-2" /> Filters & Categories</span>
          <ChevronDown size={18} className={`transform transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
        </button>

        {/* Sidebar Filters (Desktop & Mobile) */}
        <aside className={`lg:w-64 flex-shrink-0 space-y-8 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
          
          {/* Categories Section */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <LayoutGrid size={18} className="mr-2 text-primary" />
              Categories
            </h3>
            <div className="space-y-1">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                    selectedCategory === category 
                      ? 'bg-primary text-primary-foreground font-medium shadow-md shadow-primary/20' 
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <span>{category}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === category ? 'bg-white/20' : 'bg-secondary-foreground/10'}`}>
                    {getCategoryCount(category)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
             <h3 className="font-bold text-lg mb-4 flex items-center">
              <ArrowUpDown size={18} className="mr-2 text-primary" />
              Pricing
            </h3>
            <div className="space-y-2">
              {pricingOptions.map(price => (
                <label key={price} className="flex items-center space-x-3 cursor-pointer group p-1 rounded-md hover:bg-secondary/50">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedPricing === price ? 'border-primary bg-primary' : 'border-muted-foreground'}`}>
                      {selectedPricing === price && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <input 
                    type="radio" 
                    name="pricing" 
                    className="hidden"
                    checked={selectedPricing === price}
                    onChange={() => setSelectedPricing(price)}
                  />
                  <span className={`text-sm ${selectedPricing === price ? 'font-medium text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                    {price}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          
          {/* Toolbar */}
          <div className="bg-card border border-border rounded-2xl p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
             <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="text"
                  placeholder="Search tools, description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
             </div>
             
             <div className="flex items-center space-x-3 w-full md:w-auto">
                <span className="text-sm text-muted-foreground whitespace-nowrap hidden md:inline">Sort by:</span>
                <div className="relative w-full md:w-48">
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full appearance-none pl-4 pr-10 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer font-medium"
                    >
                        <option>Newest</option>
                        <option>Oldest</option>
                        <option>Top Rated</option>
                        <option>Name (A-Z)</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
             </div>
          </div>

          {/* Results Grid */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} onClick={() => setSelectedTool(tool)} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-card border border-border rounded-2xl border-dashed">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <Search size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No tools found</h3>
                <p className="text-muted-foreground max-w-sm">
                    We couldn't find any tools matching your filters. Try adjusting your search query or categories.
                </p>
                <button 
                    onClick={() => {setSelectedCategory('All'); setSearchQuery(''); setSelectedPricing('All');}}
                    className="mt-6 text-primary font-medium hover:underline"
                >
                    Clear all filters
                </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal Popup */}
      {selectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedTool(null)}>
          <div 
            className="bg-card w-full max-w-3xl rounded-2xl border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative max-h-[90vh] flex flex-col" 
            onClick={e => e.stopPropagation()}
          >
             {/* Close Button */}
             <button 
                onClick={() => setSelectedTool(null)}
                className="absolute top-4 right-4 p-2 bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 rounded-full transition-colors z-10"
             >
                <X size={20} />
             </button>

             <div className="overflow-y-auto flex-1 p-8 scrollbar-hide">
                 {/* Modal Header */}
                 <div className="flex flex-col items-center text-center pb-6 border-b border-border/50">
                     <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-border mb-6 shadow-sm p-2">
                        <img src={selectedTool.logoUrl} alt={selectedTool.name} className="w-16 h-16 object-contain" />
                     </div>
                     <h2 className="text-3xl font-bold mb-2">{selectedTool.name}</h2>
                     <div className="flex items-center space-x-2 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                            {selectedTool.category}
                        </span>
                        <span className="flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                            <Star size={12} className="fill-yellow-600 text-yellow-600 mr-1" />
                            {selectedTool.rating}
                        </span>
                     </div>
                     <p className="text-muted-foreground text-lg italic max-w-xl">
                         "{selectedTool.description}"
                     </p>
                 </div>

                 {/* Modal Body */}
                 <div className="pt-8 space-y-8">
                     
                     {/* Overview */}
                     <div>
                         <h3 className="text-lg font-bold mb-3 flex items-center">
                             <Globe size={18} className="mr-2 text-primary" />
                             Overview
                         </h3>
                         <p className="text-muted-foreground leading-relaxed">
                             {selectedTool.overview || selectedTool.description}
                         </p>
                     </div>

                     {/* Pros & Cons */}
                     {(selectedTool.pros || selectedTool.cons) && (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             {selectedTool.pros && (
                                 <div className="bg-green-500/5 rounded-xl p-5 border border-green-500/10">
                                     <h4 className="font-semibold text-green-600 mb-3 flex items-center">
                                         <ThumbsUp size={16} className="mr-2" /> Pros
                                     </h4>
                                     <ul className="space-y-2">
                                         {selectedTool.pros.map((pro, idx) => (
                                             <li key={idx} className="flex items-start text-sm text-muted-foreground">
                                                 <CheckCircle2 size={14} className="mr-2 mt-0.5 text-green-500 shrink-0" />
                                                 {pro}
                                             </li>
                                         ))}
                                     </ul>
                                 </div>
                             )}
                             {selectedTool.cons && (
                                 <div className="bg-red-500/5 rounded-xl p-5 border border-red-500/10">
                                     <h4 className="font-semibold text-red-600 mb-3 flex items-center">
                                         <ThumbsDown size={16} className="mr-2" /> Cons
                                     </h4>
                                     <ul className="space-y-2">
                                         {selectedTool.cons.map((con, idx) => (
                                             <li key={idx} className="flex items-start text-sm text-muted-foreground">
                                                 <X size={14} className="mr-2 mt-0.5 text-red-500 shrink-0" />
                                                 {con}
                                             </li>
                                         ))}
                                     </ul>
                                 </div>
                             )}
                         </div>
                     )}

                     {/* Meta Info */}
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                            <h4 className="font-semibold mb-1 text-sm text-foreground/80">Pricing Model</h4>
                            <p className="text-foreground font-medium">{selectedTool.pricing}</p>
                        </div>
                         <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                            <h4 className="font-semibold mb-1 text-sm text-foreground/80">Platform</h4>
                            <p className="text-foreground font-medium">Web & API</p>
                        </div>
                     </div>
                 </div>
             </div>

             {/* Footer Actions */}
             <div className="p-6 border-t border-border bg-background/50 backdrop-blur-sm sticky bottom-0 z-10 flex space-x-4">
                 <a 
                    href={selectedTool.website} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-xl transition-all shadow-lg shadow-primary/25 flex items-center justify-center group"
                 >
                    Visit Website
                    <ExternalLink size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                 </a>
                 <button 
                    onClick={() => setSelectedTool(null)}
                    className="px-6 py-3 rounded-xl font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                 >
                    Close
                 </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ToolCard: React.FC<{ tool: AiTool; onClick: () => void }> = ({ tool, onClick }) => {
  return (
    <div 
        onClick={onClick}
        className="group rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center overflow-hidden border border-border group-hover:scale-105 transition-transform duration-300 p-1">
                    <img src={tool.logoUrl} alt={tool.name} className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                    <h3 className="font-bold text-lg leading-none mb-1.5 group-hover:text-primary transition-colors line-clamp-1">{tool.name}</h3>
                    <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded">{tool.category}</span>
                </div>
            </div>
            <div className="flex items-center bg-yellow-500/10 border border-yellow-500/20 px-2 py-1 rounded text-xs font-bold text-yellow-600">
                <Star size={12} className="text-yellow-600 mr-1 fill-yellow-600" />
                {tool.rating}
            </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
            {tool.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                tool.pricing === 'Free' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                tool.pricing === 'Paid' ? 'bg-red-500/10 text-red-600 border-red-500/20' :
                'bg-blue-500/10 text-blue-600 border-blue-500/20'
            }`}>
                {tool.pricing}
            </span>
            <span className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                View Details <ExternalLink size={12} className="ml-1" />
            </span>
        </div>
      </div>
    </div>
  );
};