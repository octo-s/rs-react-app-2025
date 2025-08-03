import reducer, {
  selectItem,
  unselectItem,
  unselectAll,
  selectAll,
} from '../entities/selected/selectedSlice.ts';
import { describe, it, expect } from 'vitest';
import { mockMorty, mockRick } from '../mocks/characters.ts';

describe('selectedSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      selectedCharacters: [],
    });
  });

  it('should add an item with selectItem', () => {
    const state = reducer(undefined, selectItem(mockRick));
    expect(state.selectedCharacters).toHaveLength(1);
    expect(state.selectedCharacters[0]).toEqual(mockRick);
  });

  it('should not add the same item twice', () => {
    const state = reducer(
      { selectedCharacters: [mockRick] },
      selectItem(mockRick)
    );
    expect(state.selectedCharacters).toHaveLength(1);
  });

  it('should remove an item with unselectItem', () => {
    const state = reducer(
      { selectedCharacters: [mockRick, mockMorty] },
      unselectItem(mockRick)
    );
    expect(state.selectedCharacters).toEqual([mockMorty]);
  });

  it('should clear all with unselectAll', () => {
    const state = reducer(
      { selectedCharacters: [mockRick, mockMorty] },
      unselectAll()
    );
    expect(state.selectedCharacters).toEqual([]);
  });

  it('should select all with selectAll', () => {
    const state = reducer(
      { selectedCharacters: [] },
      selectAll([mockRick, mockMorty])
    );
    expect(state.selectedCharacters).toEqual([mockRick, mockMorty]);
  });
});
