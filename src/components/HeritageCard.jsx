import React from 'react';
import { MapPin, ArrowRight, Sparkles, Hammer, BookOpen, Music, Compass } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { getEndangermentStatus } from '../utils/scoring';

// Helper to return icon for category
function getCategoryIcon(category) {
  switch (category) {
    case 'Traditional Craft': return <Hammer size={13} />;
    case 'Language/Dialect': return <BookOpen size={13} />;
    case 'Folk Tradition': return <Music size={13} />;
    case 'Festival': return <Sparkles size={13} />;
    default: return <Compass size={13} />;
  }
}

export default function HeritageCard({ item, onSelect }) {
  const statusInfo = getEndangermentStatus(item.endangermentScore);

  return (
    <article className="heritage-card" onClick={() => onSelect(item.id)} tabIndex={0} role="button" aria-label={`View details for ${item.name}`}>
      <div className="card-media">
        <img 
          src={item.image} 
          alt={item.name} 
          className="card-img" 
          loading="lazy"
          onError={(e) => {
            // Fallback image if unsplash link fails
            e.target.src = "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="card-media-overlay">
          <div className="card-top-tags">
            <span className="category-pill" style={{ background: 'rgba(255, 255, 255, 0.92)' }}>
              {getCategoryIcon(item.category)}
              {item.category}
            </span>

            <div className="card-score-badge" style={{ borderColor: statusInfo.color }}>
              <span className="status-dot" style={{ background: statusInfo.color }} />
              <span>SCORE</span>
              <span className="score-val" style={{ color: statusInfo.color }}>{item.endangermentScore}</span>
            </div>
          </div>

          <div className="card-location-tag">
            <MapPin size={14} style={{ color: 'var(--terracotta-light)' }} />
            <span>{item.state}</span>
          </div>
        </div>
      </div>

      <div className="card-content">
        {item.nativeName && (
          <div className="card-native-title">{item.nativeName}</div>
        )}
        <h3 className="card-title">{item.name}</h3>
        <p className="card-summary">{item.summary}</p>

        <div className="card-footer">
          <StatusBadge score={item.endangermentScore} />
          
          <button 
            type="button" 
            className="card-action-link"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item.id);
            }}
          >
            <span>Explore Dossier</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
