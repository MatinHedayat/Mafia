import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("players")) || [];

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer: (state, { payload }) => {
      state.push(payload);
    },

    removePlayer: (state, { payload }) => {
      return state.filter((item) => item.id !== payload);
    },

    removeAllPlayers: (state) => {
      return (state = []);
    },
  },
});

export const { addPlayer, removePlayer, removeAllPlayers } =
  playersSlice.actions;
export default playersSlice.reducer;
