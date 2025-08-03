import type { Character } from '../__types__/characters.ts';
import { NECESSARY_FIELDS, UNKNOWN_CHARACTER } from './constants.ts';
import { escapeCSV } from './escapeCSV.ts';

export function getFieldValue(
  key: keyof typeof UNKNOWN_CHARACTER,
  value?: string | number
): string {
  if (value) {
    return String(value);
  }

  const unknownValue = UNKNOWN_CHARACTER[key];

  return String(unknownValue);
}

export function arrayToCSV(items: Character[]): string {
  if (items.length === 0) return '';

  const csvHeaders = NECESSARY_FIELDS.join(',');

  const csvValues = items.map((item) =>
    NECESSARY_FIELDS.map((key) =>
      escapeCSV(getFieldValue(key, item[key]))
    ).join('\n')
  );

  return [csvHeaders, csvValues].join('\n');
}
