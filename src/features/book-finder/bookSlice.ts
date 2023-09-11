import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '~/app/store';

interface BookState {
  query: string;
  startIndex: number;
}

const initialState: BookState = {
  query: '',
  startIndex: 0,
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setQuery: (state, { payload: query }: PayloadAction<string>) => {
      state.query = query;
    },
    setStartIndex: (state, { payload: startIndex }: PayloadAction<number>) => {
      state.startIndex = startIndex;
    },
  },
});

export const { setQuery, setStartIndex } = bookSlice.actions;

export const selectQuery = (state: RootState) => state[bookSlice.name].query;
export const selectStartIndex = (state: RootState) =>
  state[bookSlice.name].startIndex;

export default bookSlice.reducer;
