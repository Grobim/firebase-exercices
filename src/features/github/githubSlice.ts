import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '~/app/store';

interface GithubState {
  userQuery: string;
}

const initialState: GithubState = {
  userQuery: '',
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    setUserQuery: (state, { payload: query }: PayloadAction<string>) => {
      state.userQuery = query;
    },
  },
});

export const { setUserQuery } = githubSlice.actions;

export const selectUserQuery = (state: RootState) =>
  state[githubSlice.name].userQuery;

export default githubSlice.reducer;
