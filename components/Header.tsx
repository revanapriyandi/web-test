import Cookies from 'js-cookie';
import { Moon, Sun, UserRound } from 'lucide-react';
import Router from 'next/router';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { handleGetDetailUser, handleLogout } from '@/services/userService';

export default function Header() {
  const router = Router;
  const { setTheme } = useTheme();

  const [nameUser, setNameUser] = React.useState('');
  const [emailUser, setEmailUser] = React.useState('');

  React.useEffect(() => {
    const getDetailUser = async () => {
      const response = await handleGetDetailUser();
      if (response.error === false) {
        setNameUser(response.data.name);
        setEmailUser(response.data.email);
      }
    };
    getDetailUser();
  }, []);

  const onLogout = async () => {
    const response = await handleLogout();
    if (response.error === false) {
      Cookies.remove('token');
      router.push('/auth');
      toast.success('Logout success');
    } else {
      toast.error(response.message);
    }
  };
  return (
    <header className='stick top-0 z-50 shadow-md'>
      <nav className='layout bg-background flex gap-2 items-center justify-end py-4 lg:max-w-[68rem]'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              <UserRound className='h-[1.2rem] w-[1.2rem] mr-2' />
              <span>{`${nameUser}`}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}
