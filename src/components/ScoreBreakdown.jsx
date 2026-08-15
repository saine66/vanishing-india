import React from 'react';
import { getFactorBreakdown, getEndangermentStatus } from '../utils/scoring';
import { HelpCircle } from 'lucide-react';

/**
 * ScoreBreakdown Component
 * Displays how the 0-100 Endangerment Score is mathematically derived
 * from the 4 measurable risk factors.
 */
export default function ScoreBreakdown({ factors, compact = false }) {
  const breakdownList = getFactorBreakdown(factors);

  return (
    <div className="factors-breakdown-list">
      {breakdownList.map((factor) => {
        const factorStatus = getEndangermentStatus(factor.value);
        return (
          <div key={factor.id} className="factor-item-row">
            <div className="factor-name-meta">
              <span style={{ color: 'var(--primary-indigo)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {factor.name}
                <span style={{ fontSize: '0.72rem', color: 'var(--primary-muted)', fontWeight: 500 }}>
                  ({factor.weightPercent} wt.)
                </span>
              </span>
              <span style={{ fontWeight: 700, color: factorStatus.color }}>
                {factor.rawAgeValue || `${factor.value}%`}
              </span>
            </div>

            {/* Visual Bar */}
            <div className="factor-bar-bg">
              <div 
                className="factor-bar-fill"
                style={{
                  width: `${factor.value}%`,
                  backgroundColor: factorStatus.color
                }}
              />
            </div>

            {!compact && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--primary-muted)' }}>
                <span>{factor.description}</span>
                <span style={{ fontWeight: 600, color: 'var(--primary-slate)', flexShrink: 0, marginLeft: '8px' }}>
                  +{factor.contribution} pts
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
