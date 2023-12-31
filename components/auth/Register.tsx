import { useRouter } from 'next/router';
import * as React from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TabsContent } from '@/components/ui/tabs';

import { handleRegister } from '@/services/auth';

export default function Register() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password_confirmation, setPasswordConfirmation] = React.useState('');

  const onSubmit = async () => {
    const data = {
      name,
      email,
      password,
      password_confirmation,
    };
    if (!name || !email || !password || !password_confirmation) {
      toast.error('All fields are required');
    } else if (password !== password_confirmation) {
      toast.error('Password and password confirmation must be the same');
    } else {
      const response = await handleRegister(data);
      if (response.error === false) {
        router.push('/auth');
        toast.success('Register success');
      } else {
        toast.error(response.message);
      }
    }
  };
  return (
    <TabsContent value='register'>
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
          <div className='space-y-1'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='password_confirmation'>Confirm Password</Label>
            <Input
              id='password_confirmation'
              type='password'
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-end mt-4">
            <Button onClick={onSubmit} className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring'>Register</Button>
          </div>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}
