
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice'; 

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, 
  }

});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;
export default store;
