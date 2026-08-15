import React from 'react';
import { Search, X, RotateCcw, Filter, MapPin } from 'lucide-react';
import { HERITAGE_CATEGORIES } from '../data/categories';
import { INDIAN_STATES, REGIONAL_ZONES } from '../data/states';

export default function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedState,
  onStateChange,
  selectedRegion = "all",
  onRegionChange,
  selectedStatus,
  onStatusChange,
  onResetFilters,
  totalResults,
  totalItems
}) {
  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "all" || selectedState !== "All States" || selectedRegion !== "all" || selectedStatus !== "all";

  return (
    <div className="filter-container">
      {/* Top Search & State Row */}
      <div className="filter-top-row">
        <div className="search-box-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            id="heritage-search-input"
            className="search-input"
            placeholder="Search heritage by name, region, language, or craft..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button 
              type="button" 
              onClick={() => onSearchChange("")}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* State Dropdown Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={16} style={{ color: 'var(--terracotta)' }} />
          <select 
            id="state-filter-select"
            className="filter-select"
            value={selectedState}
            onChange={(e) => onStateChange(e.target.value)}
          >
            {INDIAN_STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* Status Filter Pills */}
        <div className="status-filter-pills">
          <button
            type="button"
            className={`filter-chip ${selectedStatus === 'all' ? 'active' : ''}`}
            onClick={() => onStatusChange('all')}
          >
            All Urgency
          </button>
          <button
            type="button"
            className={`filter-chip ${selectedStatus === 'Critical' ? 'active' : ''}`}
            onClick={() => onStatusChange('Critical')}
            style={selectedStatus === 'Critical' ? { background: '#DC2626', borderColor: '#DC2626', color: 'white' } : {}}
          >
            <span className="status-dot" style={{ background: '#DC2626' }}></span>
            Critical (71-100)
          </button>
          <button
            type="button"
            className={`filter-chip ${selectedStatus === 'Vulnerable' ? 'active' : ''}`}
            onClick={() => onStatusChange('Vulnerable')}
            style={selectedStatus === 'Vulnerable' ? { background: '#D97706', borderColor: '#D97706', color: 'white' } : {}}
          >
            <span className="status-dot" style={{ background: '#D97706' }}></span>
            Vulnerable (41-70)
          </button>
          <button
            type="button"
            className={`filter-chip ${selectedStatus === 'Watch' ? 'active' : ''}`}
            onClick={() => onStatusChange('Watch')}
            style={selectedStatus === 'Watch' ? { background: '#15803D', borderColor: '#15803D', color: 'white' } : {}}
          >
            <span className="status-dot" style={{ background: '#15803D' }}></span>
            Watch (0-40)
          </button>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="category-chips-row" style={{ marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-slate)', marginRight: '4px' }}>
          Category:
        </span>
        <button
          type="button"
          className={`filter-chip ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => onCategoryChange('all')}
        >
          All Categories
        </button>
        {HERITAGE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`filter-chip ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Regional Zone Pills */}
      {REGIONAL_ZONES && (
        <div className="region-pills-row">
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-slate)', marginRight: '4px' }}>
            Region:
          </span>
          {REGIONAL_ZONES.map((zone) => (
            <button
              key={zone.id}
              type="button"
              className={`region-pill-btn ${selectedRegion === zone.id ? 'active' : ''}`}
              onClick={() => onRegionChange(zone.id)}
            >
              {zone.name}
            </button>
          ))}
        </div>
      )}

      {/* Filter Results & Reset Meta */}
      <div className="filter-results-meta">
        <div>
          Showing <strong>{totalResults}</strong> of <strong>{totalItems}</strong> cultural elements
        </div>

        {hasActiveFilters && (
          <button 
            type="button" 
            className="reset-filter-btn"
            onClick={onResetFilters}
          >
            <RotateCcw size={14} />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
