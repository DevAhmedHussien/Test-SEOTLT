import type { NewsItem } from "../features/news/types";

const STORAGE_KEY = 'news_crud_data';

export const loadNews = (): NewsItem[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveNews = (data: NewsItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
