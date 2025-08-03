import { describe, it, expect } from 'vitest';
import { escapeCSV } from '../__utils__/escapeCSV.ts';

describe('escapeCSV util', () => {
  it('escapes values with quotes', () => {
    expect(escapeCSV('Hello, "world"')).toBe('"Hello, ""world"""');
  });

  it('does not escape simple values', () => {
    expect(escapeCSV('Hello')).toBe('Hello');
  });
});
