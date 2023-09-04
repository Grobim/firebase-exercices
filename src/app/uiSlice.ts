import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface UiState {
  menuOpened: boolean;
}

const initialState: UiState = {
  menuOpened: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openMenu: (state) => {
      state.menuOpened = true;
    },
    closeMenu: (state) => {
      state.menuOpened = false;
    },
    toggleMenu: (state) => {
      state.menuOpened = !state.menuOpened;
    },
  },
});

export const { closeMenu, openMenu, toggleMenu } = uiSlice.actions;

export const selectMenuOpened = (state: RootState) =>
  state[uiSlice.name].menuOpened;

export default uiSlice.reducer;
