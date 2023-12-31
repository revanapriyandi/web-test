export interface LoginTypes {
  email: string;
  password: string;
}

export interface RegisterTypes {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface UserTypes {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}

export interface BookTypes {
  isbn: string;
  title: string;
  subtitle: string;
  author: string;
  published: string;
  publisher: string;
  pages: number;
  description: string;
  website: string;
}

export interface AllBooksTypes {
  id: number;
  user_id: number;
  isbn: string;
  title: string;
  subtitle: string;
  author: string;
  published: string;
  publisher: string;
  pages: number;
  description: string;
  website: string;
}

export interface DetailBookTypes {
  id: number;
  user_id: number;
  isbn: string;
  title: string;
  subtitle: string;
  author: string;
  published: string;
  publisher: string;
  pages: number;
  description: string;
  website: string;
}

export interface UpdateBookTypes {
  id: number;
  isbn: string;
  title: string;
  subtitle: string;
  author: string;
  published: string;
  publisher: string;
  pages: number;
  description: string;
  website: string;
}
