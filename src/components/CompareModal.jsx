import React, { useState } from 'react';
import { X, ArrowRight, Scale, AlertTriangle, CheckCircle2, MapPin, Compass } from 'lucide-react';
import { getEndangermentStatus } from '../utils/scoring';
import ScoreGauge from './ScoreGauge';
import StatusBadge from './StatusBadge';

export default function CompareModal({ isOpen, onClose, heritageList, initialItem1Id, initialItem2Id }) {
  if (!isOpen) return null;

  const [item1Id, setItem1Id] = useState(initialItem1Id || heritageList[0]?.id);
  const [item2Id, setItem2Id] = useState(initialItem2Id || (heritageList[1]?.id || heritageList[0]?.id));

  const item1 = heritageList.find(i => i.id === item1Id) || heritageList[0];
  const item2 = heritageList.find(i => i.id === item2Id) || heritageList[1] || heritageList[0];

  const status1 = getEndangermentStatus(item1?.endangermentScore);
  const status2 = getEndangermentStatus(item2?.endangermentScore);

  const higherUrgencyItem = item1?.endangermentScore >= item2?.endangermentScore ? item1 : item2;
  const scoreDiff = Math.abs((item1?.endangermentScore || 0) - (item2?.endangermentScore || 0));

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '940px', width: '95%' }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--terracotta-light)', color: 'var(--terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Scale size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', color: 'var(--primary-indigo)' }}>Compare Endangered Traditions</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--primary-muted)', margin: 0 }}>Side-by-side multi-factor vulnerability assessment</p>
            </div>
          </div>
          <button type="button" onClick={onClose} style={{ color: 'var(--primary-muted)', padding: '6px', borderRadius: '6px' }} title="Close">
            <X size={20} />
          </button>
        </div>

        {/* Dropdown Selectors */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-slate)', display: 'block', marginBottom: '4px' }}>
              Select Cultural Element A:
            </label>
            <select
              className="filter-select"
              style={{ width: '100%' }}
              value={item1Id}
              onChange={e => setItem1Id(e.target.value)}
            >
              {heritageList.map(item => (
                <option key={item.id} value={item.id}>{item.name} ({item.state})</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-slate)', display: 'block', marginBottom: '4px' }}>
              Select Cultural Element B:
            </label>
            <select
              className="filter-select"
              style={{ width: '100%' }}
              value={item2Id}
              onChange={e => setItem2Id(e.target.value)}
            >
              {heritageList.map(item => (
                <option key={item.id} value={item.id}>{item.name} ({item.state})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Higher Urgency Banner */}
        <div style={{
          background: 'var(--sand-50)',
          border: '1px solid var(--sand-200)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.25rem',
          marginBottom: '1.5rem',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <AlertTriangle size={18} style={{ color: 'var(--terracotta)', flexShrink: 0 }} />
          <div>
            <strong>Comparative Assessment: </strong>
            <span>
              {scoreDiff === 0 
                ? "Both cultural elements share identical composite endangerment vulnerability."
                : `"${higherUrgencyItem.name}" demonstrates higher overall risk profile (+${scoreDiff} points higher composite urgency).`
              }
            </span>
          </div>
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxHeight: '55vh', overflowY: 'auto', paddingRight: '4px' }}>
          {/* Card A */}
          <div style={{ background: 'var(--sand-50)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--sand-200)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <StatusBadge score={item1.endangermentScore} />
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-indigo)', marginTop: '0.5rem', marginBottom: '0.2rem' }}>{item1.name}</h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--primary-muted)', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                <span>{item1.category}</span>
                <span>•</span>
                <span>{item1.state}</span>
              </div>
            </div>

            <ScoreGauge score={item1.endangermentScore} size={140} />

            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #E2E8F0' }}>
                <span style={{ color: 'var(--primary-muted)' }}>Practitioner Decline:</span>
                <strong>{item1.factors?.practitionerDecline}%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #E2E8F0' }}>
                <span style={{ color: 'var(--primary-muted)' }}>Average Master Age:</span>
                <strong>{item1.factors?.averagePractitionerAge} yrs</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #E2E8F0' }}>
                <span style={{ color: 'var(--primary-muted)' }}>Youth Learner Deficit:</span>
                <strong>{item1.factors?.youthLearnersDeficit}%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #E2E8F0' }}>
                <span style={{ color: 'var(--primary-muted)' }}>Transmission Risk:</span>
                <strong>{item1.factors?.transmissionRisk}%</strong>
              </div>
            </div>
          </div>

          {/* Card B */}
          <div style={{ background: 'var(--sand-50)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--sand-200)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <StatusBadge score={item2.endangermentScore} />
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-indigo)', marginTop: '0.5rem', marginBottom: '0.2rem' }}>{item2.name}</h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--primary-muted)', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                <span>{item2.category}</span>
                <span>•</span>
                <span>{item2.state}</span>
              </div>
            </div>

            <ScoreGauge score={item2.endangermentScore} size={140} />

            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #E2E8F0' }}>
                <span style={{ color: 'var(--primary-muted)' }}>Practitioner Decline:</span>
                <strong>{item2.factors?.practitionerDecline}%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #E2E8F0' }}>
                <span style={{ color: 'var(--primary-muted)' }}>Average Master Age:</span>
                <strong>{item2.factors?.averagePractitionerAge} yrs</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #E2E8F0' }}>
                <span style={{ color: 'var(--primary-muted)' }}>Youth Learner Deficit:</span>
                <strong>{item2.factors?.youthLearnersDeficit}%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #E2E8F0' }}>
                <span style={{ color: 'var(--primary-muted)' }}>Transmission Risk:</span>
                <strong>{item2.factors?.transmissionRisk}%</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
