import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { getShuffledQuizLists } from '../quizData'

type QuizListsState = {
  lists: string[][]
}

const initialState: QuizListsState = {
  lists: getShuffledQuizLists(),
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setDraggedItems: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      const { index, items } = action.payload
      state.lists[index] = items
    },
    resetLists: state => {
      state.lists = getShuffledQuizLists()
    },
  },
})

export const { setDraggedItems, resetLists } = quizSlice.actions
export default quizSlice.reducer
