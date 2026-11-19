/**
 * Per-family best score, saved in this browser. A saved score (even 0) means
 * the family's quiz has been completed at least once.
 */
window.Progress = (function () {
  'use strict';

  const key = (familyId) => `ar-families:best-score:${familyId}`;

  return {
    /** Best score, or null if this family has never been completed. */
    getBest(familyId) {
      try {
        const value = localStorage.getItem(key(familyId));
        return value === null ? null : Number(value);
      } catch (err) {
        return null; // Storage blocked (e.g. private mode).
      }
    },

    /** Record a finished game; keeps the higher of the old and new score. */
    record(familyId, score) {
      const best = Math.max(score, this.getBest(familyId) || 0);
      try {
        localStorage.setItem(key(familyId), String(best));
      } catch (err) {
        // Storage blocked: progress only lasts for this visit.
      }
      return best;
    }
  };
})();
