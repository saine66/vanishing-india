import React from 'react';
import { getEndangermentStatus } from '../utils/scoring';

/**
 * ScoreGauge Component
 * Renders a circular progress gauge representing the 0–100 Endangerment Score.
 */
export default function ScoreGauge({ score, size = 180 }) {
  const status = getEndangermentStatus(score);
  
  const radius = 70;
  const circumference = 2 * Math.PI * radius; // ~439.82
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="gauge-visual-container" style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg 
        className="radial-gauge-svg" 
        viewBox="0 0 160 160"
        style={{ width: size, height: size }}
      >
        {/* Background track circle */}
        <circle
          className="gauge-bg-circle"
          cx="80"
          cy="80"
          r={radius}
        />
        {/* Animated colored progress circle */}
        <circle
          className="gauge-progress-circle"
          cx="80"
          cy="80"
          r={radius}
          stroke={status.color}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      
      {/* Centered Score Label */}
      <div className="gauge-center-text" style={{ inset: 0, justifyContent: 'center' }}>
        <span className="gauge-score-number" style={{ color: status.color }}>
          {score}
        </span>
        <span className="gauge-score-max">
          OUT OF 100
        </span>
        <span 
          style={{ 
            fontSize: '0.75rem', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em',
            color: status.color,
            marginTop: '2px'
          }}
        >
          {status.level}
        </span>
      </div>
    </div>
  );
}
