import type { Character } from '../__types__/characters.ts';
import { NECESSARY_FIELDS, UNKNOWN_CHARACTER } from './constants.ts';
import { escapeCSV } from './escapeCSV.ts';

export function arrayToCSV(items: Character[]): string {
  if (items.length === 0) return '';

  const csvHeaders = NECESSARY_FIELDS.join(',');

  const csvValues = items.map((item) =>
    NECESSARY_FIELDS.map((key) =>
      escapeCSV(String(item[key] ?? UNKNOWN_CHARACTER[key] ?? ''))
    ).join(',')
  );

  return [csvHeaders, csvValues].join('\n');
}
