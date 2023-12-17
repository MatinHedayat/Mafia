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

    randomizeRoles: (state, { payload }) => {
      const randomNumbers = [];
      let iterationCount = state.length;

      for (let i = 0; i < iterationCount; i++) {
        const randomNumber = Math.floor(Math.random() * state.length);
        const numberIsExist = randomNumbers.some(
          (number) => number === randomNumber
        );

        numberIsExist ? iterationCount++ : randomNumbers.push(randomNumber);
      }

      const gettingLocal = JSON.parse(localStorage.getItem("roles"));
      if (!payload.length) {
        state.forEach((item, index) => {
          item.role = gettingLocal[randomNumbers[index]];
        });

        return;
      }

      state.forEach((item, index) => {
        item.role = payload[randomNumbers[index]];
      });
    },
  },
});

export const { addPlayer, removePlayer, removeAllPlayers, randomizeRoles } =
  playersSlice.actions;
export default playersSlice.reducer;
