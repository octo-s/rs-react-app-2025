import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Character } from '../../__types__/characters.ts';

type SelectedState = {
  selectedCharacters: Character[];
};

const initialState: SelectedState = {
  selectedCharacters: [],
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    selectItem(state, action: PayloadAction<Character>) {
      if (!state.selectedCharacters.some((c) => c.id === action.payload.id)) {
        state.selectedCharacters.push(action.payload);
      }
    },
    unselectItem(state, action: PayloadAction<Character>) {
      state.selectedCharacters = state.selectedCharacters.filter(
        (char) => char.id !== action.payload.id
      );
    },
    unselectAll(state) {
      state.selectedCharacters = [];
    },
    selectAll(state, action: PayloadAction<Character[]>) {
      state.selectedCharacters = action.payload;
    },
  },
});

export const { selectItem, unselectItem, unselectAll, selectAll } =
  selectedSlice.actions;
export default selectedSlice.reducer;
