import React from 'react';
import { getEndangermentStatus } from '../utils/scoring';

/**
 * StatusBadge Component
 * Displays a color-coded status indicator:
 * - Green (0-40): Watch Status
 * - Yellow (41-70): Vulnerable
 * - Red (71-100): Critical
 */
export default function StatusBadge({ score, showScore = false, customClass = "" }) {
  const status = getEndangermentStatus(score);

  return (
    <span 
      className={`status-badge ${status.badgeClass} ${customClass}`}
      title={status.shortDesc}
    >
      <span className="status-dot"></span>
      <span>{status.level}</span>
      {showScore && <span style={{ opacity: 0.8, marginLeft: '2px' }}>({score}/100)</span>}
    </span>
  );
}
