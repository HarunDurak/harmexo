// LEXORA — Game Logic
// Pure utility functions, no UI dependencies

/**
 * Check if a formed word matches any hidden word in the level
 */
export function checkWord(word, targetWords, foundWords) {
  const upper = word.toUpperCase();
  if (foundWords.includes(upper)) return 'already_found';
  if (targetWords.includes(upper)) return 'correct';
  return 'wrong';
}

/**
 * Check if word is a bonus word (extra credit)
 */
export function checkBonusWord(word, bonusWords, foundBonus) {
  const upper = word.toUpperCase();
  if (foundBonus.includes(upper)) return 'already_found';
  if (bonusWords.includes(upper)) return 'bonus';
  return null;
}

/**
 * Calculate letter positions in a circle
 * @param {number} count - number of letters
 * @param {number} radius - circle radius
 * @param {number} cx - center x
 * @param {number} cy - center y
 * @returns array of {x, y} positions
 */
export function calcCirclePositions(count, radius, cx, cy) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });
}

/**
 * Shuffle array (Fisher-Yates) for letter randomization
 */
export function shuffleLetters(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Check if a selection of letters can form the typed word
 * (validates that the word uses available letters)
 */
export function canFormWord(word, availableLetters) {
  const pool = [...availableLetters.map(l => l.toUpperCase())];
  for (const ch of word.toUpperCase()) {
    const idx = pool.indexOf(ch);
    if (idx === -1) return false;
    pool.splice(idx, 1);
  }
  return true;
}

/**
 * Get hint: reveals first unrevealed letter of the shortest unfound word
 */
export function getHint(targetWords, foundWords) {
  const unfound = targetWords.filter(w => !foundWords.includes(w));
  if (!unfound.length) return null;
  // sort by length ascending
  unfound.sort((a, b) => a.length - b.length);
  const word = unfound[0];
  return { word, letter: word[0] };
}

/**
 * Calculate star rating for level completion
 * 3 stars: no hints, found all bonus words
 * 2 stars: no hints
 * 1 star: used hints
 */
export function calcStars(hintsUsed, bonusFound, totalBonus) {
  if (hintsUsed === 0 && bonusFound === totalBonus) return 3;
  if (hintsUsed === 0) return 2;
  return 1;
}

/**
 * Calculate shard reward based on performance
 */
export function calcShardReward(base, stars, bonusCount) {
  const starMultiplier = { 1: 1.0, 2: 1.25, 3: 1.5 }[stars];
  return Math.round(base * starMultiplier + bonusCount * 5);
}

/**
 * Level completion percentage for a realm
 */
export function realmProgress(realmLevels, completedIds) {
  const total = realmLevels.length;
  const done = realmLevels.filter(l => completedIds.includes(l.id)).length;
  return total === 0 ? 0 : done / total;
}

/**
 * Get lines between selected letter indices (for drawing connections)
 */
export function getConnectionLines(selectedIndices, positions) {
  if (selectedIndices.length < 2) return [];
  return selectedIndices.slice(0, -1).map((from, i) => ({
    from: positions[from],
    to: positions[selectedIndices[i + 1]],
  }));
}
