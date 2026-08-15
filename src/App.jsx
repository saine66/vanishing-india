import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CompareModal from './components/CompareModal';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import DetailPage from './pages/DetailPage';
import ContributePage from './pages/ContributePage';
import MethodologyPage from './pages/MethodologyPage';

import { HERITAGE_DATA } from './data/heritageData';
import { getStoredContributions, saveContribution, removeContribution } from './utils/storage';

export default function App() {
  // Page Navigation State
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'explore' | 'detail' | 'contribute' | 'methodology'
  const [selectedHeritageId, setSelectedHeritageId] = useState(null);
  
  // Quick Filter State passed when jumping from Home to Explore
  const [initialExploreCategory, setInitialExploreCategory] = useState('all');

  // Compare Modal State
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareItem1Id, setCompareItem1Id] = useState(null);
  const [compareItem2Id, setCompareItem2Id] = useState(null);

  // User Submissions State
  const [contributions, setContributions] = useState([]);

  // Load contributions from localStorage on mount
  useEffect(() => {
    const stored = getStoredContributions();
    setContributions(stored);
  }, []);

  // Combined Heritage Catalog (Pre-built Curated Items + User Local Contributions)
  const fullHeritageList = useMemo(() => {
    return [...contributions, ...HERITAGE_DATA];
  }, [contributions]);

  // Currently selected item for Detail Page
  const selectedItem = useMemo(() => {
    if (!selectedHeritageId) return null;
    return fullHeritageList.find(item => item.id === selectedHeritageId) || null;
  }, [selectedHeritageId, fullHeritageList]);

  // Navigation Handlers
  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectItem = (id) => {
    setSelectedHeritageId(id);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategoryFromHome = (categoryId) => {
    setInitialExploreCategory(categoryId);
    setCurrentPage('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCompare = (item1Id = null, item2Id = null) => {
    setCompareItem1Id(item1Id || fullHeritageList[0]?.id);
    setCompareItem2Id(item2Id || fullHeritageList[1]?.id || fullHeritageList[0]?.id);
    setIsCompareOpen(true);
  };

  const handleAddContribution = (newItem) => {
    const saved = saveContribution(newItem);
    if (saved) {
      setContributions(prev => [saved, ...prev]);
      return saved;
    }
    return null;
  };

  const handleDeleteContribution = (id) => {
    const success = removeContribution(id);
    if (success) {
      setContributions(prev => prev.filter(item => item.id !== id));
      if (selectedHeritageId === id) {
        setCurrentPage('explore');
      }
    }
  };

  return (
    <div className="app-root">
      {/* Navigation Bar */}
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        onOpenCompare={() => handleOpenCompare()}
      />

      {/* Main Page Routing */}
      {currentPage === 'home' && (
        <HomePage 
          heritageList={fullHeritageList}
          onNavigate={handleNavigate}
          onSelectItem={handleSelectItem}
          onSelectCategory={handleSelectCategoryFromHome}
        />
      )}

      {currentPage === 'explore' && (
        <ExplorePage 
          heritageList={fullHeritageList}
          onSelectItem={handleSelectItem}
          initialCategory={initialExploreCategory}
        />
      )}

      {currentPage === 'detail' && (
        <DetailPage 
          item={selectedItem}
          onBack={() => handleNavigate('explore')}
          onNavigateToMethodology={() => handleNavigate('methodology')}
          onOpenCompareWith={(currentId) => handleOpenCompare(currentId)}
        />
      )}

      {currentPage === 'contribute' && (
        <ContributePage 
          contributions={contributions}
          onAddContribution={handleAddContribution}
          onDeleteContribution={handleDeleteContribution}
          onSelectItem={handleSelectItem}
        />
      )}

      {currentPage === 'methodology' && (
        <MethodologyPage />
      )}

      {/* Global Compare Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        heritageList={fullHeritageList}
        initialItem1Id={compareItem1Id}
        initialItem2Id={compareItem2Id}
      />

      {/* Global Project Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
