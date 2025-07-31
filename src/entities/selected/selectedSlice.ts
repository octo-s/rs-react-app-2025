import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type SelectedState = {
  selectedIds: number[];
};

const initialState: SelectedState = {
  selectedIds: [],
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    selectItem(state, action: PayloadAction<number>) {
      if (!state.selectedIds.includes(action.payload)) {
        state.selectedIds.push(action.payload);
      }
    },
    unselectItem(state, action: PayloadAction<number>) {
      state.selectedIds = state.selectedIds.filter(
        (id) => id !== action.payload
      );
    },
    unselectAll(state) {
      state.selectedIds = [];
    },
  },
});

export const { selectItem, unselectItem, unselectAll } = selectedSlice.actions;
export default selectedSlice.reducer;
