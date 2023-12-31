import type { AppProps } from 'next/app';
import Router from 'next/router';
import nProgress from 'nprogress';
import { ToastContainer } from 'react-toastify';

import '@/styles/globals.css';
import '@/styles/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from '@/components/provider/theme-provider';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute='class' defaultTheme='light'>
        <Component {...pageProps} />
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}
