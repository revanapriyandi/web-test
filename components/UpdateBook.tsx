import { PenSquare } from 'lucide-react';
import * as React from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { handleUpdateBook } from '@/services/booksService';
import { BookTypes } from '@/types';

interface UpdateBookProps {
  book: BookTypes & { id: number };
}

export default function UpdateBook({ book }: UpdateBookProps) {
  const [isbn, setIsbn] = React.useState(book.isbn);
  const [title, setTitle] = React.useState(book.title);
  const [subtitle, setSubtitle] = React.useState(book.subtitle);
  const [author, setAuthor] = React.useState(book.author);
  const [publisher, setPublisher] = React.useState(book.publisher);
  const [pages, setPages] = React.useState(book.pages);
  const [description, setDescription] = React.useState(book.description);
  const [website, setWebsite] = React.useState(book.website);

  const date = new Date().toISOString().slice(0, 10);

  const onSubmit = async () => {
    const data: BookTypes = {
      isbn,
      title,
      subtitle,
      author,
      published: date,
      publisher,
      pages: Number(pages),
      description,
      website,
    };
    if (
      !isbn ||
      !title ||
      !author ||
      !publisher ||
      !pages ||
      !description ||
      !website
    ) {
      toast.error('Please fill all the fields');
    } else {
      const response = await handleUpdateBook(book.id, data);
      if (response.error === false) {
        toast.success('Book updated successfully');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(response.message);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant='outline' size='icon' className='mr-2'>
          <PenSquare className='h-[1.2rem] w-[1.2rem] text-green-500' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Update Book</DialogTitle>
          <DialogDescription>
            Update the book data with the correct information.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='isbn' className='text-right'>
              ISBN
            </Label>
            <Input
              id='isbn'
              className='col-span-3'
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='title' className='text-right'>
              Title
            </Label>
            <Input
              id='title'
              className='col-span-3'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='subtitle' className='text-right'>
              Subtitle
            </Label>
            <Input
              id='subtitle'
              className='col-span-3'
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='author' className='text-right'>
              Author
            </Label>
            <Input
              id='author'
              className='col-span-3'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='publisher' className='text-right'>
              Publisher
            </Label>
            <Input
              id='publisher'
              className='col-span-3'
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='pages' className='text-right'>
              Pages
            </Label>
            <Input
              id='pages'
              className='col-span-3'
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              Description
            </Label>
            <Input
              id='description'
              className='col-span-3'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='website' className='text-right'>
              Website
            </Label>
            <Input
              id='website'
              className='col-span-3'
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={onSubmit}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
