import { createSlice, type PayloadAction,  } from '@reduxjs/toolkit';
import { type NewsItem } from '../features/news/types';
import { loadNews, saveNews } from '../utils/localStorage';

const initialState: NewsItem[] = loadNews();

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addNews: (state, action: PayloadAction<NewsItem>) => {
      state.push(action.payload);
      saveNews(state);
    },
    editNews: (state, action: PayloadAction<NewsItem>) => {
      const index = state.findIndex(n => n.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        saveNews(state);
      }
    },
    deleteNews: (state, action: PayloadAction<string>) => {
      const filtered = state.filter(n => n.id !== action.payload);
      saveNews(filtered);
      return filtered;
    }
  }
});

export const { addNews, editNews, deleteNews } = newsSlice.actions;
export default newsSlice.reducer;
