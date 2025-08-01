import type { Character } from '../__types__/characters.ts';
import { arrayToCSV } from './arrayToCSV.ts';

export function generateDataUrl(items: Character[]): string {
  const csv = arrayToCSV(items);
  return `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
}
