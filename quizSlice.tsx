import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ListsState {
  lists: string[][];
  checked: boolean;
}

const initialState: ListsState = {
  lists: [],
  checked: false,
};

const quizSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      const { index, items } = action.payload;
      state.lists[index] = items;
    },
    setDraggedItems: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      const { index, items } = action.payload;
      state.lists[index] = items;
    },
    checkQuiz: (state) => {
      state.checked = true;
    },
    restartQuiz: (state, action: PayloadAction<string[][]>) => {
      state.lists = action.payload;
      state.checked = false;
    },
  },
});

export const { addList, setDraggedItems, checkQuiz, restartQuiz } = quizSlice.actions;
export default quizSlice.reducer;
