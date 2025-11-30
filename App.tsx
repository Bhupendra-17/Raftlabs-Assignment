import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { ToolsPage } from './components/ToolsPage';
import { Page } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [initialCategory, setInitialCategory] = useState<string>('All');

  const handleNavigate = (page: Page, category: string = 'All') => {
    setInitialCategory(category);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'tools':
        return <ToolsPage initialCategory={initialCategory} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={(page) => handleNavigate(page)}>
      {renderContent()}
    </Layout>
  );
}