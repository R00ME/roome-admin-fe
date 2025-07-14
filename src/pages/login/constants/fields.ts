import passwordIcon from '@/assets/icons/login/pw-icon.svg';
import emailIcon from '@/assets/icons/login/email-icon.svg';

export const adminLoginFields = [
  {
    id: 'email',
    label: '이메일',
    type: 'email',
    placeholder: 'RoomE@example.com',
    icon: emailIcon,
  },
  {
    id: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: 'Password',
    icon: passwordIcon,
  },
];

export const tempPasswordFields = [
  { id: 'name', label: '이름', type: 'text', placeholder: '홍길동' },
  {
    id: 'email',
    label: '이메일',
    type: 'email',
    placeholder: 'RoomE@example.com',
    icon: emailIcon,
  },
];