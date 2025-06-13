import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNews, editNews } from '../../app/newsSlice';
import { v4 as uuidv4 } from 'uuid';
import type { NewsItem } from './types';
import { toast } from 'sonner';
import { Button } from '../../components/ui/button';

interface Props {
  editItem?: NewsItem | null;
  onClose: () => void;
}

export default function NewsForm({ editItem, onClose }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title);
      setContent(editItem.content);
    }
  }, [editItem]);

  const handleSubmit = () => {
    const item: NewsItem = {
      id: editItem ? editItem.id : uuidv4(),
      title,
      content,
    };

    if (editItem) {
      dispatch(editNews(item));
      toast.info('Новость обновлена');
    } else {
      dispatch(addNews(item));
      toast.success('Новость добавлена');
    }

    onClose();
  };

  return (
    <div className="space-y-4">
      <input
        className="w-full p-2 border rounded"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Текст новости"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button className="w-full" onClick={handleSubmit}>
        {editItem ? 'Сохранить' : 'Добавить'}
      </Button>
    </div>
  );
}
