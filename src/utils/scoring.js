/**
 * VANISHING INDIA — ENDANGERMENT SCORE ENGINE
 * 
 * Purpose: Provides a transparent, rule-based, deterministic mathematical
 * model (0–100 scale) to quantify the extinction risk of cultural heritage items.
 * 
 * Formula:
 * Score = (W1 * F_decline) + (W2 * F_age) + (W3 * F_youth) + (W4 * F_transmission)
 * 
 * Weights (Sum = 1.0 / 100%):
 * - W1: Practitioner Decline Rate (35%) -> Direct indicator of population loss
 * - W2: Age Profile Risk (25%)          -> Older average age means fewer years left
 * - W3: Youth Learner Deficit (25%)     -> Absence of next-gen students
 * - W4: Transmission Vulnerability (15%)-> Fragility of knowledge transfer method
 */

export const WEIGHTS = {
  practitionerDecline: 0.35,
  averagePractitionerAge: 0.25,
  youthLearnersDeficit: 0.25,
  transmissionRisk: 0.15
};

/**
 * Converts average practitioner age into a normalized 0-100 risk score.
 * If masters are elderly (>70 years), the risk is highest (100).
 * If practitioners are young (<40 years), the generational risk is lowest (10).
 */
export function calculateAgeRisk(age) {
  if (age >= 70) return 100;
  if (age >= 60) return 80 + ((age - 60) / 10) * 20; // 80 - 100
  if (age >= 50) return 55 + ((age - 50) / 10) * 25; // 55 - 80
  if (age >= 40) return 30 + ((age - 40) / 10) * 25; // 30 - 55
  return Math.max(10, (age / 40) * 30);              // 10 - 30
}

/**
 * Calculates the overall Endangerment Score (0 to 100).
 * @param {Object} factors - { practitionerDecline, averagePractitionerAge, youthLearnersDeficit, transmissionRisk }
 * @returns {number} Integer between 0 and 100.
 */
export function calculateEndangermentScore(factors) {
  if (!factors) return 50;

  const fDecline = Math.min(100, Math.max(0, factors.practitionerDecline || 0));
  
  // If user passes raw age (e.g. 68), convert to risk; if already a score (0-100), clamp it
  const rawAge = factors.averagePractitionerAge || 50;
  const fAge = rawAge > 20 && rawAge < 110 ? calculateAgeRisk(rawAge) : Math.min(100, Math.max(0, rawAge));
  
  const fYouth = Math.min(100, Math.max(0, factors.youthLearnersDeficit || 0));
  const fTrans = Math.min(100, Math.max(0, factors.transmissionRisk || 0));

  const weightedSum =
    fDecline * WEIGHTS.practitionerDecline +
    fAge * WEIGHTS.averagePractitionerAge +
    fYouth * WEIGHTS.youthLearnersDeficit +
    fTrans * WEIGHTS.transmissionRisk;

  return Math.round(weightedSum);
}

/**
 * Returns the classification status, styling tokens, and description based on score.
 * 0-40  : Green / Watch
 * 41-70 : Yellow / Vulnerable
 * 71-100: Red / Critical
 */
export function getEndangermentStatus(score) {
  if (score >= 71) {
    return {
      level: "Critical",
      label: "Critical Endangerment",
      code: "red",
      color: "#DC2626",      // Rich Red
      bg: "#FEF2F2",
      border: "#FCA5A5",
      badgeClass: "status-critical",
      shortDesc: "Immediate intervention required. Risk of extinction within 1–2 generations.",
      urgency: "Highest Priority"
    };
  }
  if (score >= 41) {
    return {
      level: "Vulnerable",
      label: "Vulnerable",
      code: "yellow",
      color: "#D97706",      // Saffron Ochre
      bg: "#FFFBEB",
      border: "#FCD34D",
      badgeClass: "status-vulnerable",
      shortDesc: "Noticeable generational decline. Targeted documentation and patron support needed.",
      urgency: "Moderate Priority"
    };
  }
  return {
    level: "Watch",
    label: "Watch Status",
    code: "green",
    color: "#15803D",        // Forest Green
    bg: "#F0FDF4",
    border: "#86EFAC",
    badgeClass: "status-watch",
    shortDesc: "Relatively stable transmission with active community keepers. Monitor ongoing trends.",
    urgency: "Stable / Monitoring"
  };
}

/**
 * Returns an array of factor breakdown objects with contribution details for UI rendering.
 */
export function getFactorBreakdown(factors) {
  const fDecline = Math.min(100, Math.max(0, factors?.practitionerDecline || 0));
  const rawAge = factors?.averagePractitionerAge || 50;
  const fAgeScore = rawAge > 20 && rawAge < 110 ? Math.round(calculateAgeRisk(rawAge)) : rawAge;
  const fYouth = Math.min(100, Math.max(0, factors?.youthLearnersDeficit || 0));
  const fTrans = Math.min(100, Math.max(0, factors?.transmissionRisk || 0));

  return [
    {
      id: "decline",
      name: "Practitioner Decline",
      weightPercent: "35%",
      weight: 0.35,
      value: fDecline,
      contribution: Math.round(fDecline * 0.35),
      description: "Drop in active traditional masters over the past 25–50 years."
    },
    {
      id: "age",
      name: "Practitioner Age Profile",
      weightPercent: "25%",
      weight: 0.25,
      value: fAgeScore,
      rawAgeValue: rawAge > 20 && rawAge < 110 ? `${rawAge} yrs` : `${fAgeScore}%`,
      contribution: Math.round(fAgeScore * 0.25),
      description: "High average age indicates fewer remaining productive years per artisan."
    },
    {
      id: "youth",
      name: "Youth Learner Deficit",
      weightPercent: "25%",
      weight: 0.25,
      value: fYouth,
      contribution: Math.round(fYouth * 0.25),
      description: "Percentage deficit of young apprentices currently being trained."
    },
    {
      id: "transmission",
      name: "Transmission Vulnerability",
      weightPercent: "15%",
      weight: 0.15,
      value: fTrans,
      contribution: Math.round(fTrans * 0.15),
      description: "Risk from lack of institutional syllabi or reliance purely on memory/oral lore."
    }
  ];
}
