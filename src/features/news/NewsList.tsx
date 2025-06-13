import { useSelector, useDispatch } from 'react-redux';
import { deleteNews } from '../../app/newsSlice';
import { useEffect, useState } from 'react';
import NewsForm from './NewsForm';
import type { NewsItem } from './types';
import type { RootState } from '../../app/store';
import { toast } from 'sonner';
import { Button } from '../../components/ui/button';
import {   
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, } from '../../components/ui/dialog';
import { Skeleton } from '../../components/ui/skeleton';
import { Link } from 'react-router-dom';

export default function NewsList({admin = false}) {
  const news = useSelector((state: RootState) => state.news);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoadingNews(false);
    }, 1000); // مدة وهمية للتحميل
  
    return () => clearTimeout(timeout);
  }, []);

  const handleOpen = (item: NewsItem | null = null) => {
    setEditing(item);
    setIsLoadingForm(true);
    setIsDialogOpen(true);
  
    // to show selekon if 
    setTimeout(() => {
      setIsLoadingForm(false);
    }, 800); 
  };
  
  const handleClose = () => {
    setEditing(null);
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteNews(id));
    toast.error('Новость удалена');
  };

  return (
    <div className=" space-y-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          { admin &&
            <Button onClick={() => handleOpen({ id: '', title: '', content: '' })}>
              Добавить новость
            </Button>
          }
        </DialogTrigger>
        <DialogContent className="w-[90%] rounded-md">
          <DialogHeader>
            <DialogTitle>
              {editing?.id ? 'Редактировать новость' : 'Добавить новость'}
            </DialogTitle>
            <DialogDescription>
              Заполните форму и сохраните изменения.
            </DialogDescription>
          </DialogHeader>

          {isLoadingForm ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full rounded-sm" />
              <Skeleton className="h-16 w-full rounded-sm" />
              <div className="flex w-full  rounded-sm">
                <Skeleton className="h-10  w-full rounded-sm" />
              </div>
            </div>
          ) : (
            <NewsForm editItem={editing?.id ? editing : null} onClose={handleClose} />
          )}

        </DialogContent>
      </Dialog>

      <div className="grid  gap-4">
      {isLoadingNews
    ? Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="border p-4 rounded bg-white shadow-sm space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          {admin && (
            <div className="flex justify-end gap-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          )}
        </div>
      ))
    : news.map((item) => (
        <div key={item.id} className="border p-4 rounded bg-white shadow-sm space-y-2">
          <Link to={`/news/${item.id}`} className="block border p-4 rounded bg-white shadow-sm space-y-2 hover:bg-gray-50 transition">
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-sm text-gray-700">{item.content}</p>
          </Link>
         
          {admin && (
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => handleOpen(item)}
              >
                Редактировать
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(item.id)}
              >
                Удалить
              </Button>
            </div>
          )}
        </div>
      ))}
      </div>
    </div>
  );
}
