import passwordIcon from '@/assets/icons/login/pw-icon.svg';
import emailIcon from '@/assets/icons/login/email-icon.svg';

export const adminLoginFields = [
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'RoomE@example.com',
    icon: emailIcon,
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Password',
    icon: passwordIcon,
  },
];

export const tempPasswordFields = [
  { id: 'name', label: 'Name', type: 'text', placeholder: '홍길동' },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'RoomE@example.com',
    icon: emailIcon,
  },
];