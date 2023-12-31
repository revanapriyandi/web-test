import ApiConnect from '@/lib/connect';

const URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function handleGetDetailUser() {
  const url = `${URL_API}/api/user`;

  return ApiConnect({
    url,
    method: 'GET',
    token: true,
  });
}

export async function handleLogout() {
  const url = `${URL_API}/api/user/logout`;

  return ApiConnect({
    url,
    method: 'DELETE',
    token: true,
  });
}
