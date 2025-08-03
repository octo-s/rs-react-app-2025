import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from '../entities/selected/selectedSlice.ts';

export const store = configureStore({
  reducer: {
    selected: selectedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
