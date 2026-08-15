import React, { useState, useMemo } from 'react';
import FilterBar from '../components/FilterBar';
import HeritageCard from '../components/HeritageCard';
import { ArrowUpDown, AlertCircle } from 'lucide-react';

import { REGIONAL_ZONES } from '../data/states';

export default function ExplorePage({ 
  heritageList, 
  onSelectItem, 
  initialCategory = "all", 
  initialState = "All States" 
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedState, setSelectedState] = useState(initialState);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("score-desc"); // "score-desc" | "score-asc" | "name-asc" | "state-asc"

  // Reset all filters helper
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedState("All States");
    setSelectedRegion("all");
    setSelectedStatus("all");
    setSortBy("score-desc");
  };

  // Filter & Search logic using useMemo
  const filteredItems = useMemo(() => {
    return heritageList.filter((item) => {
      // 1. Search Query filter (matches name, nativeName, state, region, summary, category)
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesNative = item.nativeName ? item.nativeName.toLowerCase().includes(q) : false;
        const matchesState = item.state.toLowerCase().includes(q);
        const matchesRegion = item.region ? item.region.toLowerCase().includes(q) : false;
        const matchesSummary = item.summary.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        if (!matchesName && !matchesNative && !matchesState && !matchesRegion && !matchesSummary && !matchesCategory) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      // 3. State filter
      if (selectedState !== "All States" && item.state !== selectedState) {
        return false;
      }

      // 4. Regional Zone filter
      if (selectedRegion !== "all") {
        const zone = REGIONAL_ZONES.find(z => z.id === selectedRegion);
        if (zone && zone.states && !zone.states.includes(item.state)) {
          return false;
        }
      }

      // 5. Status filter (Critical: 71-100, Vulnerable: 41-70, Watch: 0-40)
      if (selectedStatus !== "all") {
        if (selectedStatus === "Critical" && item.endangermentScore < 71) return false;
        if (selectedStatus === "Vulnerable" && (item.endangermentScore < 41 || item.endangermentScore >= 71)) return false;
        if (selectedStatus === "Watch" && item.endangermentScore > 40) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "score-desc") return b.endangermentScore - a.endangermentScore;
      if (sortBy === "score-asc") return a.endangermentScore - b.endangermentScore;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "state-asc") return a.state.localeCompare(b.state);
      return 0;
    });
  }, [heritageList, searchQuery, selectedCategory, selectedState, selectedRegion, selectedStatus, sortBy]);

  return (
    <div className="explore-page" style={{ padding: '3.5rem 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Header Title */}
        <div style={{ marginBottom: '2rem' }}>
          <div className="section-tag">Interactive Cultural Registry</div>
          <h1 className="section-title" style={{ fontSize: '2.4rem' }}>
            Explore Indian Heritage
          </h1>
          <p style={{ maxWidth: '720px' }}>
            Filter across geographical states, endangered categories, or search by specific traditional crafts, languages, and rituals.
          </p>
        </div>

        {/* Filter Bar Component */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedState={selectedState}
          onStateChange={setSelectedState}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          onResetFilters={handleResetFilters}
          totalResults={filteredItems.length}
          totalItems={heritageList.length}
        />

        {/* Sorting Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--primary-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowUpDown size={14} />
            Sort by:
          </span>
          <select
            className="filter-select"
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="score-desc">Most Endangered (Score: High → Low)</option>
            <option value="score-asc">Least Endangered (Score: Low → High)</option>
            <option value="name-asc">Alphabetical (A → Z)</option>
            <option value="state-asc">State (A → Z)</option>
          </select>
        </div>

        {/* Heritage Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="cards-grid">
            {filteredItems.map((item) => (
              <HeritageCard
                key={item.id}
                item={item}
                onSelect={onSelectItem}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--surface-border)',
            margin: '2rem 0'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: 'var(--radius-full)',
              background: '#FFF7ED',
              color: 'var(--terracotta)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <AlertCircle size={32} />
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--primary-indigo)' }}>
              No Cultural Elements Found
            </h3>
            <p style={{ maxWidth: '460px', margin: '0 auto 1.5rem', color: 'var(--primary-muted)' }}>
              No heritage items matched your current search criteria. Try removing filters or searching with a different term.
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleResetFilters}
            >
              Clear All Search Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
