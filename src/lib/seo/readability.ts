export function calculateReadability(text: string): { score: number; grade: string; label: string } {
  if (!text || text.trim().length === 0) return { score: 0, grade: 'N/A', label: 'No content' };

  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const syllables = words.reduce((count, word) => count + countSyllables(word), 0);

  if (words.length === 0 || sentences.length === 0) return { score: 0, grade: 'N/A', label: 'No content' };

  const avgSentenceLength = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;

  // Flesch Reading Ease
  const flesch = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
  const score = Math.max(0, Math.min(100, Math.round(flesch)));

  let grade: string;
  let label: string;

  if (score >= 80) { grade = 'A'; label = 'Very Easy'; }
  else if (score >= 70) { grade = 'B'; label = 'Easy'; }
  else if (score >= 60) { grade = 'B-'; label = 'Fairly Easy'; }
  else if (score >= 50) { grade = 'C'; label = 'Standard'; }
  else if (score >= 40) { grade = 'C-'; label = 'Fairly Difficult'; }
  else if (score >= 30) { grade = 'D'; label = 'Difficult'; }
  else { grade = 'F'; label = 'Very Difficult'; }

  return { score, grade, label };
}

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;

  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');

  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}
