import emailIcon from '@/assets/icons/login/email-icon.svg';
import passwordIcon from '@/assets/icons/login/pw-icon.svg';
import logoBg from '@/assets/images/login-logo.svg';
import { Card, CardContent } from '../../components/ui/card';
import Form from './components/Form';

const adminLoginFields = [
  { id: "email", label: "Email", type: "email", placeholder: "RoomE@example.com", icon: emailIcon },
  { id: "password", label: "Password", type: "password", placeholder: "Password", icon: passwordIcon },
];

const tempPasswordFields = [
  { id: "name", label: "Name", type: "text", placeholder: "홍길동" },
  { id: "email", label: "Email", type: "email", placeholder: "RoomE@example.com", icon: emailIcon },
];

export default function Login() {
  return (
    <main
      style={{
        background: 'linear-gradient(to right, #4983ef, #888cfc)',
      }}
      className='relative h-screen flex items-center justify-center overflow-hidden'>
      <Card className='bg-white rounded-2xl shadow-md py-10 px-6 flex flex-col gap-5 '>
        <CardContent className='flex flex-col gap-5' >
          <Form title="운영자 로그인" fields={adminLoginFields} />
          <Form title="임시 비밀번호 발급" fields={tempPasswordFields} />
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
