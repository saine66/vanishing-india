import React, { useState } from 'react';
import { 
  BookOpen, 
  Calculator, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  Sliders, 
  Scale, 
  Activity, 
  ShieldAlert 
} from 'lucide-react';
import { calculateEndangermentScore, getEndangermentStatus, getFactorBreakdown, WEIGHTS } from '../utils/scoring';
import ScoreGauge from '../components/ScoreGauge';
import ScoreBreakdown from '../components/ScoreBreakdown';
import StatusBadge from '../components/StatusBadge';

export default function MethodologyPage() {
  // Sandbox Simulator State
  const [simulatorFactors, setSimulatorFactors] = useState({
    practitionerDecline: 85,
    averagePractitionerAge: 65,
    youthLearnersDeficit: 80,
    transmissionRisk: 75
  });

  const simScore = calculateEndangermentScore(simulatorFactors);
  const simStatus = getEndangermentStatus(simScore);

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    setSimulatorFactors(prev => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <div className="methodology-page" style={{ padding: '3.5rem 0 5rem', minHeight: '85vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3rem' }}>
          <div className="section-tag">Scientific & Rule-Based Model</div>
          <h1 className="section-title" style={{ fontSize: '2.5rem' }}>
            The Endangerment Score Methodology
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--primary-muted)' }}>
            Unlike subjective assessments, <strong>Vanishing India</strong> evaluates cultural vulnerability using an objective, weighted multi-factor mathematical model designed specifically for intangible cultural heritage (ICH).
          </p>
        </div>

        {/* 2 Column Layout: Academic Explanation & Interactive Calculator */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Left Column: Mathematical Foundation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Mathematical Formula Box */}
            <section style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--surface-border)',
              padding: '2rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary-indigo)' }}>
                <Calculator size={22} style={{ color: 'var(--terracotta)' }} />
                <span>The Mathematical Equation</span>
              </h2>

              <div style={{
                background: 'var(--sand-50)',
                border: '1px solid var(--sand-200)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                fontFamily: 'monospace',
                fontSize: '1rem',
                color: 'var(--primary-indigo)',
                overflowX: 'auto',
                marginBottom: '1rem'
              }}>
                <strong>Score (E)</strong> = (0.35 × F<sub>decline</sub>) + (0.25 × F<sub>age</sub>) + (0.25 × F<sub>youth</sub>) + (0.15 × F<sub>transmission</sub>)
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--primary-muted)', lineHeight: 1.6 }}>
                Where each parameter <strong>F</strong> is normalized between <code>0</code> (zero risk) and <code>100</code> (maximum risk). The resulting composite score ranges from <strong>0 to 100</strong>.
              </p>
            </section>

            {/* Factor Weights Table */}
            <section style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--surface-border)',
              padding: '2rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h2 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary-indigo)' }}>
                <Scale size={22} style={{ color: 'var(--terracotta)' }} />
                <span>Factor Weights & Academic Rationale</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ padding: '1rem', background: 'var(--sand-50)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--terracotta)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--primary-indigo)', marginBottom: '0.3rem' }}>
                    <span>1. Practitioner Decline (35% Weight)</span>
                    <span style={{ color: 'var(--terracotta)' }}>W₁ = 0.35</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--primary-muted)', margin: 0 }}>
                    Direct historical measurement of how many active master artisans, native speakers, or dancers have stopped practicing over the last 25–50 years.
                  </p>
                </div>

                <div style={{ padding: '1rem', background: 'var(--sand-50)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--saffron)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--primary-indigo)', marginBottom: '0.3rem' }}>
                    <span>2. Practitioner Age Profile (25% Weight)</span>
                    <span style={{ color: 'var(--saffron)' }}>W₂ = 0.25</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--primary-muted)', margin: 0 }}>
                    Captures generational urgency. If remaining masters average above 65 years old, natural biological attrition threatens the tradition within a single decade.
                  </p>
                </div>

                <div style={{ padding: '1rem', background: 'var(--sand-50)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #0284C7' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--primary-indigo)', marginBottom: '0.3rem' }}>
                    <span>3. Youth Learner Deficit (25% Weight)</span>
                    <span style={{ color: '#0284C7' }}>W₃ = 0.25</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--primary-muted)', margin: 0 }}>
                    Quantifies succession pipeline. Calculated as <code>100 - (% of youth actively apprenticing)</code>. Without youth adoption, transmission halts.
                  </p>
                </div>

                <div style={{ padding: '1rem', background: 'var(--sand-50)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #7C3AED' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--primary-indigo)', marginBottom: '0.3rem' }}>
                    <span>4. Transmission Vulnerability (15% Weight)</span>
                    <span style={{ color: '#7C3AED' }}>W₄ = 0.15</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--primary-muted)', margin: 0 }}>
                    Assesses institutional vulnerability. Oral-only lore with unwritten rules scores higher risk (100) compared to institutionalized curricula (0).
                  </p>
                </div>
              </div>
            </section>

            {/* Classification Thresholds */}
            <section style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--surface-border)',
              padding: '2rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h2 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary-indigo)' }}>
                <Activity size={22} style={{ color: 'var(--terracotta)' }} />
                <span>Classification Thresholds</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: '#F0FDF4', border: '1px solid #86EFAC' }}>
                  <div style={{ color: '#15803D', fontWeight: 800, fontSize: '1rem', marginBottom: '0.3rem' }}>
                    0 – 40: WATCH
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#166534', margin: 0 }}>
                    Stable transmission with moderate community presence. Routine monitoring recommended.
                  </p>
                </div>

                <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: '#FFFBEB', border: '1px solid #FCD34D' }}>
                  <div style={{ color: '#D97706', fontWeight: 800, fontSize: '1rem', marginBottom: '0.3rem' }}>
                    41 – 70: VULNERABLE
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#92400E', margin: 0 }}>
                    Noticeable generational decline. Requires targeted marketplace & youth training intervention.
                  </p>
                </div>

                <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: '#FEF2F2', border: '1px solid #FCA5A5' }}>
                  <div style={{ color: '#DC2626', fontWeight: 800, fontSize: '1rem', marginBottom: '0.3rem' }}>
                    71 – 100: CRITICAL
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#991B1B', margin: 0 }}>
                    Imminent extinction risk within 1–2 generations. Immediate emergency archiving needed.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Interactive Sandbox Simulator */}
          <aside style={{ position: 'sticky', top: '96px' }}>
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--surface-border)',
              padding: '2rem',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <div className="section-tag">Interactive Simulation Tool</div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-indigo)' }}>
                  Test the Formula in Real Time
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--primary-muted)' }}>
                  Adjust the factor sliders below to observe how the Endangerment Score dynamically responds.
                </p>
              </div>

              {/* Dynamic Radial Gauge */}
              <ScoreGauge score={simScore} size={180} />

              <div style={{
                marginTop: '1rem',
                marginBottom: '1.5rem',
                textAlign: 'center',
                padding: '0.65rem',
                background: simStatus.bg,
                border: `1px solid ${simStatus.border}`,
                borderRadius: 'var(--radius-md)',
                color: simStatus.color,
                fontWeight: 700,
                fontSize: '0.88rem'
              }}>
                {simStatus.level} ({simScore}/100) — {simStatus.urgency}
              </div>

              {/* Interactive Sliders */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem' }}>
                {/* 1. Decline */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
                    <span>Practitioner Decline (35%)</span>
                    <span style={{ color: 'var(--terracotta)' }}>{simulatorFactors.practitionerDecline}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    name="practitionerDecline"
                    value={simulatorFactors.practitionerDecline}
                    onChange={handleSliderChange}
                    style={{ width: '100%' }}
                  />
                </div>

                {/* 2. Age */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
                    <span>Average Master Age (25%)</span>
                    <span style={{ color: 'var(--terracotta)' }}>{simulatorFactors.averagePractitionerAge} yrs</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="85"
                    name="averagePractitionerAge"
                    value={simulatorFactors.averagePractitionerAge}
                    onChange={handleSliderChange}
                    style={{ width: '100%' }}
                  />
                </div>

                {/* 3. Youth Deficit */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
                    <span>Youth Learner Deficit (25%)</span>
                    <span style={{ color: 'var(--terracotta)' }}>{simulatorFactors.youthLearnersDeficit}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    name="youthLearnersDeficit"
                    value={simulatorFactors.youthLearnersDeficit}
                    onChange={handleSliderChange}
                    style={{ width: '100%' }}
                  />
                </div>

                {/* 4. Transmission Risk */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
                    <span>Transmission Fragility (15%)</span>
                    <span style={{ color: 'var(--terracotta)' }}>{simulatorFactors.transmissionRisk}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    name="transmissionRisk"
                    value={simulatorFactors.transmissionRisk}
                    onChange={handleSliderChange}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              {/* Live Factor Breakdown */}
              <div style={{ borderTop: '1px solid var(--sand-100)', paddingTop: '1.25rem' }}>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary-indigo)', marginBottom: '0.75rem' }}>
                  Point Calculation Contribution
                </h4>
                <ScoreBreakdown factors={simulatorFactors} compact={false} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
