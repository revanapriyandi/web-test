import { BookTypes } from '@/types/index';

import ApiConnect from '@/lib/connect';

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function handleCreateBook(data: BookTypes) {
  const url = `${URL_API}/api/books/add`;

  return ApiConnect({
    url,
    method: 'POST',
    data,
    token: true,
  });
}

export async function handleAllBooks(page: number) {
  const url = `${URL_API}/api/books?page=${page}`;

  return ApiConnect({
    url,
    method: 'GET',
    token: true,
  });
}

export async function handleDetailBook(id: string) {
  const url = `${URL_API}/api/books/${id}`;

  return ApiConnect({
    url,
    method: 'GET',
    token: true,
  });
}

export async function handleUpdateBook(id: number, data: BookTypes) {
  const url = `${URL_API}/api/books/${id}/edit`;

  return ApiConnect({
    url,
    method: 'PUT',
    data,
    token: true,
  });
}

export async function handleDeleteBook(id: number) {
  const url = `${URL_API}/api/books/${id}`;

  return ApiConnect({
    url,
    method: 'DELETE',
    token: true,
  });
}
