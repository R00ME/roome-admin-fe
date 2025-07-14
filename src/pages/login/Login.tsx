import logoBg from '@/assets/images/login-logo.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../../apis/auth';
import { Card, CardContent } from '../../components/ui/card';
import Form from './components/Form';
import { adminLoginFields, tempPasswordFields } from './constants/fields';
import { isValidEmail, isValidPassword } from './constants/validation';


export default function Login() {
  const [formType, setFormType] = useState<'login' | 'tempPassword'>('login');
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  //로그인
  const handleLogin = async () => {
    const { email, password } = formState;
    const newErrors: Record<string, string> = {};

    if (!isValidEmail(email)) {
      newErrors.email = '유효한 이메일 형식이 아닙니다.';
    }

    if (!isValidPassword(password)) {
      newErrors.password = '비밀번호는 영문, 숫자, 특수문자를 포함한 10자 이상이어야 합니다.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setErrors({});
      await loginAPI(email, password);
      navigate('/');
    } catch (e) {
      setErrors({ email: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }
  };

  //임시 비밀번호 재발급

  const handleChangeField = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleTempPasswordClick = () => {
    setFormType('tempPassword');
  };

  const isLogin = formType === 'login';

  return (
    <main
      style={{ background: 'linear-gradient(to right, #4983ef, #888cfc)' }}
      className='relative h-screen flex items-center justify-center overflow-hidden'>
      <Card className='bg-white rounded-2xl shadow-md py-10 px-6 flex flex-col gap-5 z-100 '>
        {/* 로그인 & 임시 비밀번호 발급 창 컴포넌트 */}
        <CardContent className='flex flex-col gap-5'>
          {isLogin ? (
            <Form
              title='운영자 로그인'
              values={formState}
              errors={errors}
              fields={adminLoginFields}
              onClick={handleTempPasswordClick}
              onChangeField={handleChangeField}
              onSubmit={handleLogin}
            />
          ) : (
            <Form
              title='임시 비밀번호 재발급'
              errors={errors}
              values={formState}
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
