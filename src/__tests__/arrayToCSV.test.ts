import { describe, it, expect } from 'vitest';
import { arrayToCSV } from '../__utils__/arrayToCSV.ts';
import { mockCharacters, mockUnknownCharacter } from '../mocks/characters.ts';

describe('arrayToCSV util', () => {
  it('returns empty string for empty array', () => {
    expect(arrayToCSV([])).toBe('');
  });

  it('returns correct CSV for single item', () => {
    expect(arrayToCSV(mockCharacters)).toContain('Morty');
    expect(arrayToCSV(mockCharacters)).toContain('Alive');
    expect(arrayToCSV(mockCharacters)).toContain('species');
  });

  it('handles missing fields with UNKNOWN_CHARACTER', () => {
    expect(arrayToCSV([mockUnknownCharacter])).toContain('Unknown name');
    expect(arrayToCSV([mockUnknownCharacter])).toContain('Unknown status');
    expect(arrayToCSV([mockUnknownCharacter])).toContain('Unknown species');
  });
});
