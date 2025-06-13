import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

export default function NewsDetails() {
  const { id } = useParams<{ id: string }>();
  const newsItem = useSelector((state: RootState) =>
    state.news.find((item) => item.id === id)
  );

  if (!newsItem) {
    return <div className="p-4 text-red-600">خبر غير موجود</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>
      <p className="text-gray-800 text-lg">{newsItem.content}</p>
    </div>
  );
}
