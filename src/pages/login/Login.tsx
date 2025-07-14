import logoBg from '@/assets/images/login-logo.svg';
import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import Form from './components/Form';
import { adminLoginFields, tempPasswordFields } from './constants/fields';


export default function Login() {
  const [formType, setFormType] = useState<'login' | 'tempPassword'>('login');

  const handleTempPasswordClick = () => {
    console.log('비밀번호 재발급 클릭됨');
    setFormType('tempPassword');
  };

  const isLogin = formType === 'login';

  return (
    <main
      style={{
        background: 'linear-gradient(to right, #4983ef, #888cfc)',
      }}
      className='relative h-screen flex items-center justify-center overflow-hidden'>
      <Card className='bg-white rounded-2xl shadow-md py-10 px-6 flex flex-col gap-5 z-100 '>
        {/* 로그인 & 임시 비밀번호 발급 창 컴포넌트 */}
        <CardContent className='flex flex-col gap-5'>
          {isLogin ? (
            <Form
              title='운영자 로그인'
              fields={adminLoginFields}
              onClick={handleTempPasswordClick}
            />
          ) : (
            <Form
              title='임시 비밀번호 재발급'
              fields={tempPasswordFields}
            />
          )}
        </CardContent>
      </Card>
      <img
        className='absolute bottom-[-100px]'
        src={logoBg}
        alt=''
      />
    </main>
  );
}
