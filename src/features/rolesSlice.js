import { createSlice } from "@reduxjs/toolkit";

const rolesSlice = createSlice({
  name: "roles",
  initialState: [],
  reducers: {
    filteredSelection: (state, { payload }) => {
      let selectedRoles = payload
        .filter(
          (item) =>
            item.isSelected &&
            item.role !== "Simple Citizen" &&
            item.role !== "Simple Mafia"
        )
        .map((item) => item.role);

      const simpleCitizen = payload.find(
        (item) => item.isSelected && item.role === 'Simple Citizen'
      );
      if (simpleCitizen) {
        for (let index = 0; index < simpleCitizen.selectedCount; index++) {
          selectedRoles.push(simpleCitizen.role);
        }
      }

      const simpleMafia = payload.find(
        (item) => item.isSelected && item.role === 'Simple Mafia'
      );
      if (simpleMafia) {
        for (let index = 0; index < simpleMafia.selectedCount; index++) {
          selectedRoles.push(simpleMafia.role);
        }
      }

      state.length = 0;
      state.push(...selectedRoles);
    },

    clearSelection: (state) => {
      return (state = []);
    },
  },
});

export const { filteredSelection, clearSelection } = rolesSlice.actions;
export default rolesSlice.reducer;
