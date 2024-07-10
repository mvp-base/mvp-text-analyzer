import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataSliceInterface {
  data: Record<string, any[]>;
}

const initialState: DataSliceInterface = {
  data: {},
};

// const localStorageData = localStorage.getItem('data');
// if (localStorageData) {
//   initialState.data = JSON.parse(localStorageData);
// }

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addData(state, action: PayloadAction<{ filename: string; data: any }>) {
      const { filename, data } = action.payload;
      state.data[filename] = data;
      localStorage.setItem('data', JSON.stringify(state.data));
    },
    deleteData(state, action: PayloadAction<{ filename: string }>) {
      const { filename } = action.payload;
      if (state.data[filename]) {
        delete state.data[filename];
        localStorage.setItem('data', JSON.stringify(state.data));
      }
    },
  },
});

export const { addData, deleteData } = dataSlice.actions;

export default dataSlice.reducer;
