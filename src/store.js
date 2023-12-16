import playersReducer from './features/playersSlice';
import rolesReducer from './features/rolesSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer:{
    players: playersReducer,
    roles: rolesReducer
  }
});