import { configureStore } from '@reduxjs/toolkit';
import fileMgrSlice from './fileMgrSlice';

const store = configureStore({
  reducer: {
    fileMgr: fileMgrSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
