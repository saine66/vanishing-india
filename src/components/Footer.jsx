import React from 'react';
import { Landmark, Heart, ShieldCheck, ExternalLink } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand & Purpose */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div className="brand-symbol" style={{ width: '32px', height: '32px' }}>
                <Landmark size={18} />
              </div>
              <span className="footer-brand-title">VANISHING INDIA</span>
            </div>
            <p className="footer-desc">
              A digital heritage-preservation platform dedicated to documenting, assessing, and safeguarding India's at-risk traditional crafts, languages, folk performing arts, and sacred cultural rituals.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-start' }}>
              <span className="college-badge-tag">
                <ShieldCheck size={14} />
                Department of Computer Science & Engineering
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Undergraduate Capstone Project • Academic Year 2025–2026
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('home')}>
                  Home
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('explore')}>
                  Explore Heritage Catalog
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('methodology')}>
                  Endangerment Methodology
                </button>
              </li>
              <li>
                <button type="button" className="footer-link" onClick={() => onNavigate('contribute')}>
                  Contribute Cultural Element
                </button>
              </li>
            </ul>
          </div>

          {/* Heritage Categories */}
          <div>
            <h4 className="footer-col-title">Key Pillars</h4>
            <ul className="footer-links-list">
              <li className="footer-link">Traditional Crafts</li>
              <li className="footer-link">Endangered Languages</li>
              <li className="footer-link">Folk Traditions & Ballets</li>
              <li className="footer-link">Ritual Theatre & Arts</li>
              <li className="footer-link">Ecological Practices</li>
            </ul>
          </div>

          {/* Academic Context */}
          <div>
            <h4 className="footer-col-title">Framework</h4>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.5, marginBottom: '0.75rem' }}>
              Built upon the 5-tier Preservation Cycle:
              <br />
              <strong>Discover → Assess → Learn → Experience → Preserve</strong>
            </p>
            <p style={{ fontSize: '0.8rem', color: '#64748B' }}>
              Powered by rule-based multi-factor quantification.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Vanishing India Project — Built for cultural preservation and academic research.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#94A3B8' }}>
            <span>Preserving Indian Cultural Diversity</span>
            <Heart size={14} style={{ color: '#EF4444' }} fill="#EF4444" />
          </div>
        </div>
      </div>
    </footer>
  );
}
