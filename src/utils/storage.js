/**
 * LOCAL STORAGE MANAGER FOR COMMUNITY CONTRIBUTIONS
 * 
 * Allows users to nominate new at-risk cultural elements.
 * Submissions are stored locally in the browser so they persist
 * across page refreshes and can be tested without needing a backend server.
 */

const STORAGE_KEY = "vanishing_india_contributions_v1";

export function getStoredContributions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to load contributions from localStorage:", err);
    return [];
  }
}

export function saveContribution(newItem) {
  try {
    const existing = getStoredContributions();
    const itemWithMeta = {
      ...newItem,
      id: `user-${Date.now()}`,
      isCommunitySubmission: true,
      submissionDate: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric"
      }),
      verificationStatus: "Pending Community Review"
    };

    const updated = [itemWithMeta, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return itemWithMeta;
  } catch (err) {
    console.error("Failed to save contribution to localStorage:", err);
    return null;
  }
}

export function removeContribution(id) {
  try {
    const existing = getStoredContributions();
    const updated = existing.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error("Failed to delete contribution:", err);
    return false;
  }
}

// ----------------------------------------------------
// BOOKMARKS / WATCHLIST STORAGE
// ----------------------------------------------------
const BOOKMARKS_KEY = "vanishing_india_bookmarks_v1";

export function getStoredBookmarks() {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to load bookmarks:", err);
    return [];
  }
}

export function toggleStoredBookmark(id) {
  try {
    const current = getStoredBookmarks();
    let updated;
    if (current.includes(id)) {
      updated = current.filter((item) => item !== id);
    } else {
      updated = [...current, id];
    }
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Failed to toggle bookmark:", err);
    return [];
  }
}

