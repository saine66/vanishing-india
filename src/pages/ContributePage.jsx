import React, { useState } from 'react';
import { 
  PlusCircle, 
  Send, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Trash2, 
  Clock, 
  MapPin, 
  Info, 
  Calculator 
} from 'lucide-react';
import { HERITAGE_CATEGORIES } from '../data/categories';
import { INDIAN_STATES } from '../data/states';
import { calculateEndangermentScore, getEndangermentStatus } from '../utils/scoring';
import ScoreGauge from '../components/ScoreGauge';
import StatusBadge from '../components/StatusBadge';

export default function ContributePage({ 
  contributions, 
  onAddContribution, 
  onDeleteContribution,
  onSelectItem
}) {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    nativeName: '',
    category: 'Traditional Craft',
    state: 'Gujarat',
    region: '',
    image: '',
    summary: '',
    historicalBackground: '',
    whyEndangered: '',
    practitionerDecline: 75,
    averagePractitionerAge: 62,
    youthLearnersDeficit: 80,
    transmissionRisk: 70,
    actionsInput: 'Support local artisans directly.\nDigitize oral folklore.\nEstablish community apprenticeships.',
    clusterLocation: '',
    bestSeasonToVisit: '',
    artisanContactNote: ''
  });

  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Calculate live preview score dynamically
  const previewFactors = {
    practitionerDecline: Number(formData.practitionerDecline),
    averagePractitionerAge: Number(formData.averagePractitionerAge),
    youthLearnersDeficit: Number(formData.youthLearnersDeficit),
    transmissionRisk: Number(formData.transmissionRisk)
  };
  const livePreviewScore = calculateEndangermentScore(previewFactors);
  const previewStatus = getEndangermentStatus(livePreviewScore);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.summary.trim() || !formData.whyEndangered.trim()) {
      setErrorMsg('Please fill in the heritage name, summary, and why it is endangered.');
      return;
    }

    setErrorMsg('');

    // Format preservation actions into array of strings
    const preservationActions = formData.actionsInput
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const newItem = {
      name: formData.name.trim(),
      nativeName: formData.nativeName.trim(),
      category: formData.category,
      state: formData.state,
      region: formData.region.trim(),
      image: formData.image.trim() || 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80',
      summary: formData.summary.trim(),
      historicalBackground: formData.historicalBackground.trim() || formData.summary.trim(),
      whyEndangered: formData.whyEndangered.trim(),
      factors: previewFactors,
      preservationActions: preservationActions.length > 0 ? preservationActions : [
        'Document oral knowledge and technical steps.',
        'Encourage direct patronage and ethical cultural tourism.'
      ],
      tourism: {
        clusterLocation: formData.clusterLocation.trim() || `${formData.region || formData.state}`,
        bestSeasonToVisit: formData.bestSeasonToVisit.trim() || 'Year-round / During local festivals',
        artisanContactNote: formData.artisanContactNote.trim() || 'Contact local village council or craft cooperative',
        culturalEtiquette: 'Treat local practitioners with dignity and respect sacred community traditions.'
      }
    };

    const saved = onAddContribution(newItem);
    if (saved) {
      setSubmittedSuccess(true);
      // Reset form
      setFormData({
        name: '',
        nativeName: '',
        category: 'Traditional Craft',
        state: 'Gujarat',
        region: '',
        image: '',
        summary: '',
        historicalBackground: '',
        whyEndangered: '',
        practitionerDecline: 75,
        averagePractitionerAge: 62,
        youthLearnersDeficit: 80,
        transmissionRisk: 70,
        actionsInput: 'Support local artisans directly.\nDigitize oral folklore.\nEstablish community apprenticeships.',
        clusterLocation: '',
        bestSeasonToVisit: '',
        artisanContactNote: ''
      });
      setTimeout(() => setSubmittedSuccess(false), 5000);
    }
  };

  return (
    <div className="contribute-page" style={{ padding: '3.5rem 0', minHeight: '85vh' }}>
      <div className="container">
        {/* Page Title */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="section-tag">Community Crowdsourcing & Archiving</div>
          <h1 className="section-title" style={{ fontSize: '2.4rem' }}>
            Nominate an Endangered Cultural Practice
          </h1>
          <p style={{ maxWidth: '750px' }}>
            Know of a rare craft, endangered tribal dialect, ancient martial art, or disappearing local ritual in your region? Submit the dossier below to calculate its Endangerment Score and preserve it in our community registry.
          </p>
        </div>

        {submittedSuccess && (
          <div style={{
            background: '#ECFDF5',
            border: '1px solid #A7F3D0',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            color: '#065F46'
          }}>
            <CheckCircle2 size={24} style={{ color: '#10B981', flexShrink: 0 }} />
            <div>
              <strong>Heritage Element Successfully Submitted!</strong>
              <p style={{ fontSize: '0.88rem', margin: 0, color: '#047857' }}>
                Your entry has been assigned an Endangerment Score and is now saved locally in "Pending Verification".
              </p>
            </div>
          </div>
        )}

        {errorMsg && (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.5rem',
            color: '#B91C1C',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 2 Column Layout: Form & Live Calculation Sandbox */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
          {/* LEFT: Submission Form */}
          <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-indigo)' }}>
              <PlusCircle size={20} style={{ color: 'var(--terracotta)' }} />
              <span>Heritage Information Form</span>
            </h3>

            <div className="form-grid">
              {/* Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="name">Heritage Element Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="e.g., Rogan Painting, Parsi Gara, Kurukh Tongue"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Native Script Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="nativeName">Native Script / Local Title</label>
                <input
                  type="text"
                  id="nativeName"
                  name="nativeName"
                  className="form-input"
                  placeholder="e.g., રોગન કળા, कुड़ुख़"
                  value={formData.nativeName}
                  onChange={handleChange}
                />
              </div>

              {/* Category */}
              <div className="form-group">
                <label className="form-label" htmlFor="category">Heritage Category *</label>
                <select
                  id="category"
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {HERITAGE_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div className="form-group">
                <label className="form-label" htmlFor="state">Indian State / UT *</label>
                <select
                  id="state"
                  name="state"
                  className="form-select"
                  value={formData.state}
                  onChange={handleChange}
                >
                  {INDIAN_STATES.filter(s => s !== "All States").map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* District / Region */}
              <div className="form-group form-full-width">
                <label className="form-label" htmlFor="region">District / Village / Region</label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  className="form-input"
                  placeholder="e.g., Nirona Village, Kutch District"
                  value={formData.region}
                  onChange={handleChange}
                />
              </div>

              {/* Image URL */}
              <div className="form-group form-full-width">
                <label className="form-label" htmlFor="image">Image URL (Optional)</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  className="form-input"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={handleChange}
                />
                <span className="form-help-text">Leave blank to use a curated default cultural placeholder image.</span>
              </div>

              {/* Short Summary */}
              <div className="form-group form-full-width">
                <label className="form-label" htmlFor="summary">Concise Summary (1-2 sentences) *</label>
                <textarea
                  id="summary"
                  name="summary"
                  rows={2}
                  className="form-textarea"
                  placeholder="Briefly explain what this craft, language, or ritual is..."
                  value={formData.summary}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Why It Is Endangered */}
              <div className="form-group form-full-width">
                <label className="form-label" htmlFor="whyEndangered" style={{ color: '#DC2626' }}>
                  Why Is It Endangered? (Key Threats) *
                </label>
                <textarea
                  id="whyEndangered"
                  name="whyEndangered"
                  rows={3}
                  className="form-textarea"
                  placeholder="Mention causes such as declining practitioners, lack of apprentices, economic displacement, modern substitutes..."
                  value={formData.whyEndangered}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Factor Inputs Section */}
              <div className="form-full-width" style={{ marginTop: '1rem' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--primary-indigo)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calculator size={16} style={{ color: 'var(--terracotta)' }} />
                  <span>Endangerment Scoring Factor Parameters</span>
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {/* Decline Slider */}
                  <div className="factor-slider-group">
                    <div className="slider-header">
                      <span>Practitioner Decline Rate</span>
                      <span style={{ color: 'var(--terracotta)' }}>{formData.practitionerDecline}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      name="practitionerDecline"
                      value={formData.practitionerDecline}
                      onChange={handleChange}
                    />
                    <span style={{ fontSize: '0.72rem', color: 'var(--primary-muted)' }}>Estimated percentage loss of active masters (35% weight)</span>
                  </div>

                  {/* Age Profile Slider */}
                  <div className="factor-slider-group">
                    <div className="slider-header">
                      <span>Average Master Age</span>
                      <span style={{ color: 'var(--terracotta)' }}>{formData.averagePractitionerAge} yrs</span>
                    </div>
                    <input
                      type="range"
                      min="25"
                      max="90"
                      name="averagePractitionerAge"
                      value={formData.averagePractitionerAge}
                      onChange={handleChange}
                    />
                    <span style={{ fontSize: '0.72rem', color: 'var(--primary-muted)' }}>Higher average age increases generational fragility (25% weight)</span>
                  </div>

                  {/* Youth Learner Deficit Slider */}
                  <div className="factor-slider-group">
                    <div className="slider-header">
                      <span>Youth Learner Deficit</span>
                      <span style={{ color: 'var(--terracotta)' }}>{formData.youthLearnersDeficit}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      name="youthLearnersDeficit"
                      value={formData.youthLearnersDeficit}
                      onChange={handleChange}
                    />
                    <span style={{ fontSize: '0.72rem', color: 'var(--primary-muted)' }}>Absence of next-generation apprentices (25% weight)</span>
                  </div>

                  {/* Transmission Risk Slider */}
                  <div className="factor-slider-group">
                    <div className="slider-header">
                      <span>Transmission Vulnerability</span>
                      <span style={{ color: 'var(--terracotta)' }}>{formData.transmissionRisk}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      name="transmissionRisk"
                      value={formData.transmissionRisk}
                      onChange={handleChange}
                    />
                    <span style={{ fontSize: '0.72rem', color: 'var(--primary-muted)' }}>Risk from unrecorded oral-only transmission (15% weight)</span>
                  </div>
                </div>
              </div>

              {/* Preservation Actions */}
              <div className="form-group form-full-width" style={{ marginTop: '1rem' }}>
                <label className="form-label" htmlFor="actionsInput">Ways to Help (1 action per line)</label>
                <textarea
                  id="actionsInput"
                  name="actionsInput"
                  rows={3}
                  className="form-textarea"
                  value={formData.actionsInput}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '2rem', padding: '0.9rem' }}
            >
              <Send size={18} />
              <span>Submit for Community Verification</span>
            </button>
          </form>

          {/* RIGHT: Live Scoring Preview & Pending Submissions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Real-time Calculation Card */}
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--surface-border)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
              textAlign: 'center'
            }}>
              <div className="section-tag" style={{ color: previewStatus.color }}>
                Live Formula Calculation
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary-indigo)' }}>
                {formData.name || "Untitled Practice"}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--primary-muted)', marginBottom: '1.25rem' }}>
                Previewing real-time Endangerment Score based on adjusted factors:
              </p>

              <ScoreGauge score={livePreviewScore} size={170} />

              <div style={{
                marginTop: '1.25rem',
                padding: '0.75rem',
                background: previewStatus.bg,
                border: `1px solid ${previewStatus.border}`,
                borderRadius: 'var(--radius-md)',
                color: previewStatus.color,
                fontWeight: 700,
                fontSize: '0.88rem'
              }}>
                {previewStatus.level} Status ({livePreviewScore}/100)
              </div>
            </div>

            {/* Submissions Pending Verification */}
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--surface-border)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary-indigo)' }}>
                <Clock size={18} style={{ color: 'var(--terracotta)' }} />
                <span>Locally Submitted Elements</span>
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--primary-muted)', marginBottom: '1rem' }}>
                Stored locally in browser <code>localStorage</code> ({contributions.length} items):
              </p>

              {contributions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--sand-50)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--primary-muted)' }}>
                  No community submissions yet. Fill out the form on the left to add one!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '360px', overflowY: 'auto' }}>
                  {contributions.map(item => (
                    <div 
                      key={item.id}
                      style={{
                        padding: '0.85rem',
                        background: 'var(--sand-50)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--sand-200)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{ cursor: 'pointer', flex: 1 }} onClick={() => onSelectItem(item.id)}>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--primary-indigo)' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                          <span>{item.state}</span>
                          <span>•</span>
                          <span style={{ color: '#D97706', fontWeight: 600 }}>Pending Review</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <StatusBadge score={item.endangermentScore} />
                        <button
                          type="button"
                          onClick={() => onDeleteContribution(item.id)}
                          style={{ color: '#94A3B8', padding: '4px', borderRadius: '4px' }}
                          title="Delete local submission"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
