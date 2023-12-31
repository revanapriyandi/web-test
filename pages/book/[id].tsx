import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

import { handleDetailBook } from '@/services/booksService';
import { DetailBookTypes } from '@/types';

export default function BookDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = React.useState<DetailBookTypes>();

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await handleDetailBook(id as string);
      if (response.error === false) {
        setBook(response.data);
      }
    };
    fetchData();
  }, [id]);

  return (
    <main className='layout mt-10'>
      <Button variant='secondary' asChild className='mb-5'>
        <Link href='/'>
          <ChevronLeft />
          <span>Back to Home</span>
        </Link>
      </Button>
      <div className='mb-10'>
        <Table className='w-full'>
          <h1 className='text-xl font-bold mb-5'>Book Detail</h1>
          <TableBody>
            <TableRow>
              <TableCell className='font-medium'>ID</TableCell>
              <TableCell>{book?.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>User ID</TableCell>
              <TableCell>{book?.user_id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>ISBN</TableCell>
              <TableCell>{book?.isbn}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Title</TableCell>
              <TableCell>{book?.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Subtitle</TableCell>
              <TableCell>{book?.subtitle}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Author</TableCell>
              <TableCell>{book?.author}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Published</TableCell>
              <TableCell>
                {book?.published
                  ? new Date(book?.published).toLocaleDateString()
                  : '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Publisher</TableCell>
              <TableCell>{book?.publisher}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Pages</TableCell>
              <TableCell>{book?.pages}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Description</TableCell>
              <TableCell>{book?.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Website</TableCell>
              <TableCell>
                <Link
                  href={
                    book?.website ? book?.website : 'https://www.gramedia.com'
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 hover:underline'
                >
                  Go To Website
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
