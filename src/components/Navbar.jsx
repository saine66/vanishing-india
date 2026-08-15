import React, { useState } from 'react';
import { Landmark, Compass, BookOpen, PlusCircle, Menu, X, Scale } from 'lucide-react';

export default function Navbar({ currentPage, onNavigate, onOpenCompare }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <div 
            className="brand-logo" 
            onClick={() => handleNav('home')} 
            style={{ cursor: 'pointer' }}
          >
            <div className="brand-symbol">
              <Landmark size={20} />
            </div>
            <div className="brand-text">
              <span className="brand-title">VANISHING INDIA</span>
              <span className="brand-subtitle">Digital Heritage Preservation</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav>
            <ul className="nav-links">
              <li>
                <button
                  type="button"
                  className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
                  onClick={() => handleNav('home')}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`nav-btn ${currentPage === 'explore' ? 'active' : ''}`}
                  onClick={() => handleNav('explore')}
                >
                  <Compass size={16} />
                  Explore Heritage
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`nav-btn ${currentPage === 'methodology' ? 'active' : ''}`}
                  onClick={() => handleNav('methodology')}
                >
                  <BookOpen size={16} />
                  Methodology
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-btn"
                  onClick={onOpenCompare}
                  title="Compare two endangered heritage items"
                >
                  <Scale size={16} />
                  Compare
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`nav-btn nav-cta ${currentPage === 'contribute' ? 'active' : ''}`}
                  onClick={() => handleNav('contribute')}
                >
                  <PlusCircle size={16} />
                  Contribute
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button" 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{
            padding: '1rem 0',
            borderTop: '1px solid var(--surface-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            background: 'white'
          }}>
            <button
              type="button"
              className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => handleNav('home')}
              style={{ justifyContent: 'flex-start', width: '100%' }}
            >
              Home
            </button>
            <button
              type="button"
              className={`nav-btn ${currentPage === 'explore' ? 'active' : ''}`}
              onClick={() => handleNav('explore')}
              style={{ justifyContent: 'flex-start', width: '100%' }}
            >
              <Compass size={16} />
              Explore Heritage
            </button>
            <button
              type="button"
              className={`nav-btn ${currentPage === 'methodology' ? 'active' : ''}`}
              onClick={() => handleNav('methodology')}
              style={{ justifyContent: 'flex-start', width: '100%' }}
            >
              <BookOpen size={16} />
              Scoring Methodology
            </button>
            <button
              type="button"
              className="nav-btn"
              onClick={() => {
                onOpenCompare();
                setMobileMenuOpen(false);
              }}
              style={{ justifyContent: 'flex-start', width: '100%' }}
            >
              <Scale size={16} />
              Compare Traditions
            </button>
            <button
              type="button"
              className="nav-btn nav-cta"
              onClick={() => handleNav('contribute')}
              style={{ justifyContent: 'center', width: '100%', marginTop: '0.5rem' }}
            >
              <PlusCircle size={16} />
              Contribute Element
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
