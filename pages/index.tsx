import { GetServerSidePropsContext } from 'next';

import Books from '@/components/Books';
import Header from '@/components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <Books />
    </>
  );
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
