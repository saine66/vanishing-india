import React from 'react';
import { 
  ArrowRight, 
  Compass, 
  AlertTriangle, 
  ShieldCheck, 
  MapPin, 
  BookOpen, 
  Search, 
  Sparkles, 
  Hammer, 
  Music, 
  Heart, 
  Layers 
} from 'lucide-react';
import HeritageCard from '../components/HeritageCard';
import { HERITAGE_CATEGORIES } from '../data/categories';

export default function HomePage({ heritageList, onNavigate, onSelectItem, onSelectCategory }) {
  // Find the top 3 highest urgency items (score >= 71) for the spotlight
  const spotlightItems = [...heritageList]
    .sort((a, b) => b.endangermentScore - a.endangermentScore)
    .slice(0, 3);

  // Statistics calculation
  const totalCount = heritageList.length;
  const criticalCount = heritageList.filter(item => item.endangermentScore >= 71).length;
  const vulnerableCount = heritageList.filter(item => item.endangermentScore >= 41 && item.endangermentScore < 71).length;
  const statesCovered = new Set(heritageList.map(item => item.state)).size;

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-badge-pill">
            <AlertTriangle size={15} style={{ color: 'var(--terracotta)' }} />
            <span>Dept. of Computer Science & Engineering • Cultural Informatics Project</span>
          </div>

          <h1 className="hero-title">
            Safeguarding <span className="hero-highlight">Vanishing India</span> Before It Fades Into History.
          </h1>

          <p className="hero-desc">
            India is home to thousands of ancient crafts, indigenous dialects, and ritual performing arts. Due to modern industrialization and generational shifts, hundreds of these cultural traditions risk irreversible extinction. Vanishing India is an open digital registry tracking, quantifying, and preserving our living heritage.
          </p>

          <div className="hero-actions">
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => onNavigate('explore')}
            >
              <Compass size={18} />
              <span>Explore Heritage Catalog</span>
              <ArrowRight size={18} />
            </button>

            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => onNavigate('methodology')}
            >
              <BookOpen size={18} />
              <span>How We Calculate Endangerment</span>
            </button>
          </div>

          {/* Quick Metrics Counter Grid */}
          <div className="hero-stats-grid">
            <div className="stat-item">
              <div className="stat-icon-box" style={{ background: '#FFF7ED', color: 'var(--terracotta)' }}>
                <Layers size={24} />
              </div>
              <div>
                <div className="stat-number">{totalCount}</div>
                <div className="stat-label">Heritage Elements Tracked</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-box" style={{ background: '#FEF2F2', color: '#DC2626' }}>
                <AlertTriangle size={24} />
              </div>
              <div>
                <div className="stat-number">{criticalCount}</div>
                <div className="stat-label">Critical Red Alerts (71-100)</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-box" style={{ background: '#FFFBEB', color: '#D97706' }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <div className="stat-number">{vulnerableCount}</div>
                <div className="stat-label">Vulnerable Practices</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon-box" style={{ background: '#F0F9FF', color: '#0284C7' }}>
                <MapPin size={24} />
              </div>
              <div>
                <div className="stat-number">{statesCovered}</div>
                <div className="stat-label">Indian States & UTs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Preservation Lifecycle */}
      <section className="pillars-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Core Methodology</div>
            <h2 className="section-title">The 5-Tier Preservation Cycle</h2>
            <p>From initial discovery to active community safeguarding, our systematic framework empowers students, researchers, and cultural enthusiasts.</p>
          </div>

          <div className="pillars-timeline">
            <div className="pillar-card">
              <div className="pillar-step-number">1</div>
              <div className="pillar-icon-box"><Search size={22} /></div>
              <h3 className="pillar-name">Discover</h3>
              <p className="pillar-desc">Search and filter across diverse geographic regions and endangered cultural categories.</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-step-number">2</div>
              <div className="pillar-icon-box"><AlertTriangle size={22} /></div>
              <h3 className="pillar-name">Assess</h3>
              <p className="pillar-desc">Quantify extinction risk via our transparent, 4-factor Endangerment Score index (0–100).</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-step-number">3</div>
              <div className="pillar-icon-box"><BookOpen size={22} /></div>
              <h3 className="pillar-name">Learn</h3>
              <p className="pillar-desc">Understand historical lineages, master artisans, and structural causes of decline.</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-step-number">4</div>
              <div className="pillar-icon-box"><Compass size={22} /></div>
              <h3 className="pillar-name">Experience</h3>
              <p className="pillar-desc">Connect with artisan clusters, seasonal festivals, and ethical cultural tourism etiquette.</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-step-number">5</div>
              <div className="pillar-icon-box"><Heart size={22} /></div>
              <h3 className="pillar-name">Preserve</h3>
              <p className="pillar-desc">Take actionable steps—patronage, apprenticeships, and digital community contributions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Spotlight: Most Endangered Heritage Items */}
      <section style={{ padding: '4.5rem 0', background: 'var(--sand-50)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="section-tag" style={{ color: '#DC2626' }}>Urgent Intervention Needed</div>
              <h2 className="section-title">Critical Heritage Spotlight</h2>
              <p>Cultural traditions with an Endangerment Score exceeding 70, requiring immediate documentation.</p>
            </div>

            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => onNavigate('explore')}
            >
              <span>View All Items</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="cards-grid">
            {spotlightItems.map((item) => (
              <HeritageCard 
                key={item.id} 
                item={item} 
                onSelect={onSelectItem} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section style={{ padding: '4.5rem 0', background: 'white', borderTop: '1px solid var(--surface-border)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Explore By Medium</div>
            <h2 className="section-title">Heritage Categories</h2>
            <p>Explore endangered elements categorized across arts, dialects, and sacred practices.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {HERITAGE_CATEGORIES.map((cat) => (
              <div 
                key={cat.id} 
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  background: cat.bg,
                  border: `1px solid rgba(0, 0, 0, 0.06)`,
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
                className="category-showcase-box"
              >
                <div style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: 'var(--radius-md)', 
                  background: cat.color, 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  boxShadow: `0 4px 10px ${cat.color}33`
                }}>
                  {cat.id === 'Traditional Craft' && <Hammer size={20} />}
                  {cat.id === 'Language/Dialect' && <BookOpen size={20} />}
                  {cat.id === 'Folk Tradition' && <Music size={20} />}
                  {cat.id === 'Festival' && <Sparkles size={20} />}
                  {cat.id === 'Cultural Practice' && <Compass size={20} />}
                </div>

                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem', color: 'var(--primary-indigo)' }}>
                  {cat.label}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--primary-muted)', lineHeight: 1.45, marginBottom: '1rem' }}>
                  {cat.shortDesc}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', fontWeight: 700, color: cat.color }}>
                  <span>Browse Category</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
