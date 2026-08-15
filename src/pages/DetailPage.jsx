import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  Compass, 
  Sparkles, 
  Info, 
  Share2, 
  Check, 
  Calendar, 
  Users, 
  Printer,
  Scale
} from 'lucide-react';
import ScoreGauge from '../components/ScoreGauge';
import ScoreBreakdown from '../components/ScoreBreakdown';
import StatusBadge from '../components/StatusBadge';
import { getEndangermentStatus } from '../utils/scoring';

export default function DetailPage({ item, onBack, onNavigateToMethodology, onOpenCompareWith }) {
  const [copied, setCopied] = useState(false);

  if (!item) {
    return (
      <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
        <h2>Item not found</h2>
        <button type="button" className="btn btn-primary" onClick={onBack} style={{ marginTop: '1rem' }}>
          Back to Explore
        </button>
      </div>
    );
  }

  const statusInfo = getEndangermentStatus(item.endangermentScore);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="detail-page">
      {/* Top Banner Header */}
      <section className="detail-header-banner">
        <div className="container">
          <div className="breadcrumbs">
            <button type="button" className="breadcrumb-back-btn" onClick={onBack}>
              <ArrowLeft size={16} />
              <span>Back to Heritage Catalog</span>
            </button>
            <span>/</span>
            <span>{item.category}</span>
            <span>/</span>
            <span style={{ color: 'white' }}>{item.name}</span>
          </div>

          <div style={{ maxWidth: '850px' }}>
            {item.nativeName && (
              <div className="detail-native-tag">{item.nativeName}</div>
            )}
            <h1 className="detail-top-title">{item.name}</h1>

            <div className="detail-meta-tags">
              <span className="detail-meta-pill">
                <Compass size={14} />
                {item.category}
              </span>
              <span className="detail-meta-pill">
                <MapPin size={14} />
                {item.region ? `${item.region}, ${item.state}` : item.state}
              </span>
              <StatusBadge score={item.endangermentScore} showScore={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Content Layout */}
      <main className="detail-main-layout">
        <div className="container">
          <div className="detail-grid-cols">
            {/* LEFT COLUMN: Narrative & Context */}
            <div className="detail-left-content">
              {/* Media Card */}
              <div className="detail-media-card">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="detail-hero-image"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80";
                  }}
                />
              </div>

              {/* Cultural Summary & History */}
              <section className="detail-section-block">
                <h2 className="detail-section-title">
                  <BookOpen size={22} style={{ color: 'var(--terracotta)' }} />
                  <span>Historical & Cultural Significance</span>
                </h2>
                <p className="detail-paragraph" style={{ fontWeight: 600, color: 'var(--primary-indigo)' }}>
                  {item.summary}
                </p>
                <p className="detail-paragraph">
                  {item.historicalBackground}
                </p>
              </section>

              {/* Why It Is Endangered */}
              <section className="detail-section-block" style={{ borderLeft: '4px solid #DC2626' }}>
                <h2 className="detail-section-title" style={{ color: '#DC2626' }}>
                  <AlertTriangle size={22} style={{ color: '#DC2626' }} />
                  <span>Why This Heritage Is Endangered</span>
                </h2>
                <p className="detail-paragraph">
                  {item.whyEndangered}
                </p>
              </section>

              {/* Preservation Action Plan */}
              <section className="detail-section-block">
                <h2 className="detail-section-title">
                  <CheckCircle2 size={22} style={{ color: 'var(--status-watch)' }} />
                  <span>Tangible Preservation Roadmap</span>
                </h2>
                <p className="detail-paragraph" style={{ fontSize: '0.92rem' }}>
                  Preserving living cultural heritage requires active, multi-stakeholder collaboration. Here is how citizens, institutions, and cultural patrons can intervene:
                </p>

                <ul className="preservation-actions-list">
                  {item.preservationActions && item.preservationActions.map((action, idx) => (
                    <li key={idx} className="preservation-item">
                      <CheckCircle2 size={18} className="preservation-check-icon" />
                      <span style={{ fontSize: '0.95rem', color: 'var(--primary-slate)' }}>{action}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Tourism & Cultural Connection */}
              {item.tourism && (
                <section className="detail-section-block">
                  <h2 className="detail-section-title">
                    <Compass size={22} style={{ color: 'var(--saffron)' }} />
                    <span>Ethical Cultural Tourism & Regional Connection</span>
                  </h2>
                  <p className="detail-paragraph" style={{ fontSize: '0.92rem' }}>
                    Supporting grassroots practitioners in person helps keep the tradition economically viable.
                  </p>

                  <div className="tourism-box">
                    <div className="tourism-row">
                      <span className="tourism-label">
                        <MapPin size={15} style={{ display: 'inline', marginRight: '4px' }} />
                        Artisan Cluster:
                      </span>
                      <span>{item.tourism.clusterLocation}</span>
                    </div>

                    <div className="tourism-row">
                      <span className="tourism-label">
                        <Calendar size={15} style={{ display: 'inline', marginRight: '4px' }} />
                        Best Visiting Season:
                      </span>
                      <span>{item.tourism.bestSeasonToVisit}</span>
                    </div>

                    <div className="tourism-row">
                      <span className="tourism-label">
                        <Users size={15} style={{ display: 'inline', marginRight: '4px' }} />
                        Local Contact Note:
                      </span>
                      <span>{item.tourism.artisanContactNote}</span>
                    </div>

                    <div className="tourism-row">
                      <span className="tourism-label">
                        <Info size={15} style={{ display: 'inline', marginRight: '4px' }} />
                        Cultural Etiquette:
                      </span>
                      <span style={{ color: '#0F172A', fontWeight: 500 }}>{item.tourism.culturalEtiquette}</span>
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* RIGHT COLUMN: Endangerment Scorecard (Sticky) */}
            <aside>
              <div className="sticky-score-card">
                <div className="score-card-header">
                  <div className="section-tag" style={{ color: statusInfo.color }}>
                    Quantified Vulnerability Index
                  </div>
                  <h3 className="score-card-title">Endangerment Assessment</h3>
                  <p className="score-card-subtitle">
                    Rule-based weighted multi-factor calculation
                  </p>
                </div>

                {/* Visual Radial Gauge */}
                <ScoreGauge score={item.endangermentScore} size={190} />

                {/* Urgency Status Banner */}
                <div 
                  style={{
                    background: statusInfo.bg,
                    border: `1px solid ${statusInfo.border}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    color: statusInfo.color,
                    fontWeight: 600
                  }}
                >
                  {statusInfo.shortDesc}
                </div>

                {/* 4 Factor Breakdown */}
                <div>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--primary-indigo)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Mathematical Factor Breakdown
                  </h4>
                  <ScoreBreakdown factors={item.factors} />
                </div>

                {/* Formula Explanation Note */}
                <div className="formula-callout-box">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 700, marginBottom: '4px', color: 'var(--primary-indigo)' }}>
                    <Info size={14} style={{ color: 'var(--terracotta)' }} />
                    <span>How this score was derived:</span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--primary-muted)', lineHeight: 1.4 }}>
                    Score = (0.35 × Decline) + (0.25 × Age Profile) + (0.25 × Youth Deficit) + (0.15 × Transmission Risk).
                  </p>
                  <button
                    type="button"
                    onClick={onNavigateToMethodology}
                    style={{ color: 'var(--terracotta)', fontWeight: 700, fontSize: '0.78rem', marginTop: '6px', display: 'inline-block' }}
                  >
                    View Academic Scoring Formula →
                  </button>
                </div>

                {/* Action Buttons Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {/* Share Action */}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={handleShare}
                  >
                    {copied ? (
                      <>
                        <Check size={16} style={{ color: 'var(--status-watch)' }} />
                        <span style={{ color: 'var(--status-watch)' }}>Link Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Share2 size={16} />
                        <span>Share Heritage Dossier</span>
                      </>
                    )}
                  </button>

                  {/* Print / PDF Export */}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => window.print()}
                    title="Print or Save Dossier as PDF for College Submissions"
                  >
                    <Printer size={16} style={{ color: 'var(--terracotta)' }} />
                    <span>Print / Save PDF Dossier</span>
                  </button>

                  {/* Compare Button */}
                  {onOpenCompareWith && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ width: '100%', justifyContent: 'center' }}
                      onClick={() => onOpenCompareWith(item.id)}
                    >
                      <Scale size={16} />
                      <span>Compare with Another</span>
                    </button>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
