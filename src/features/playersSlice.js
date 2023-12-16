import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('players')) || [];

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {

  }
});

export const {} = playersSlice.actions;
export default playersSlice.reducer;