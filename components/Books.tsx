import { Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { toast } from 'react-toastify';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { handleAllBooks, handleDeleteBook } from '@/services/booksService';
import { AllBooksTypes } from '@/types';

import AddBook from '@/components/AddBook';
import UpdateBook from '@/components/UpdateBook';

export default function Books() {
  const [books, setBooks] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);

  React.useEffect(() => {
    const getBooks = async () => {
      const response = await handleAllBooks(currentPage);
      if (response.error === false) {
        setBooks(response.data.data);
        setTotalPage(
          (response as { data: { last_page: number } }).data.last_page,
        );
        setCurrentPage(
          (response as { data: { current_page: number } }).data.current_page,
        );
      } else {
        toast.error(response.message);
      }
    };

    getBooks();
  }, [currentPage]);

  const onDelete = async (id: number) => {
    const response = await handleDeleteBook(id);
    if (response.error === false) {
      toast.success(response.message);
      const newBooks = books.filter((book: AllBooksTypes) => book.id !== id);
      setBooks(newBooks);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <main className='layout mb-20'>
      <AddBook />
      <h1 className='text-xl font-bold mb-4'>Catalog Books</h1>
      <Table className='tremor-Table-table w-full tabular-nums text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
        <TableHeader className='tremor-TableHead-root text-left text-tremor-content dark:text-dark-tremor-content'>
          <TableRow className='tremor-TableRow-row'>
            <TableHead className='w-[100px] '>ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.length > 0 ? (
            books.map((book: AllBooksTypes) => (
              <TableRow key={book.id}>
                <TableCell className='font-medium'>{book.id}</TableCell>
                <TableCell>{book.user_id}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                  {new Date(book.published).toLocaleDateString()}
                </TableCell>
                <TableCell className='flex justify-end items-center text-right'>
                  <Button
                    variant='outline'
                    size='icon'
                    className='mr-2'
                    asChild
                  >
                    <Link href={`/book/${book.id}`}>
                      <Eye className='h-[1.2rem] w-[1.2rem] text-blue-500' />
                    </Link>
                  </Button>
                  <UpdateBook book={{ ...book }} />
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant='outline' size='icon'>
                        <Trash2 className='h-[1.2rem] w-[1.2rem] text-red-500' />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete Book {book.title}
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogDescription>
                        Are you sure you want to delete this book?
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDelete(book.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className='text-center' colSpan={7}>
                No Books Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className='flex justify-center items-center mt-4'>
        {Array.from(Array(totalPage).keys()).map((page) => (
          <Button
            key={page}
            variant={currentPage === page + 1 ? 'secondary' : 'outline'}
            size='icon'
            className='mx-1 w-full inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition'
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </Button>
        ))}
      </div>
    </main>
  );
}
