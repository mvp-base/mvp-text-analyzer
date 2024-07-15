import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileMgrInterface {
  files: Record<string, Object>;
  selectedFile: string;
}

const initialState: FileMgrInterface = {
  files: {},
  selectedFile: '',
};

const localStorageData = localStorage.getItem('data');
if (localStorageData) {
  initialState.files = JSON.parse(localStorageData);
}

const fileMgrSlice = createSlice({
  name: 'fileMgr',
  initialState,
  reducers: {
    addFile(state, action: PayloadAction<{ filename: string; data: any }>) {
      const { filename, data } = action.payload;
      state.files[filename] = data;
      localStorage.setItem('files', JSON.stringify(state.files));
    },
    removeFile(state, action: PayloadAction<{ filename: string }>) {
      const { filename } = action.payload;
      if (state.files[filename]) {
        delete state.files[filename];
        localStorage.setItem('files', JSON.stringify(state.files));
      }
    },
    setSelectedFile(state, action: PayloadAction<string>) {
      const filename = action.payload;
      state.selectedFile = filename;
    },
    clearSelectedFile(state) {
      state.selectedFile = '';
    },
  },
});

export const { addFile, removeFile, setSelectedFile, clearSelectedFile } =
  fileMgrSlice.actions;

export default fileMgrSlice.reducer;
