import ApiConnect from '@/lib/connect';
import { LoginTypes, RegisterTypes } from '../types';

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function handleLogin(data: LoginTypes) {
  const url = `${URL_API}/api/login`;

  return ApiConnect({
    url,
    method: 'POST',
    data,
  });
}

export async function handleRegister(data: RegisterTypes) {
  const url = `${URL_API}/api/register`;

  return ApiConnect({
    url,
    method: 'POST',
    data,
  });
}
