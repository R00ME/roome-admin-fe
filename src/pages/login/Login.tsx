import loginBg from '@/assets/images/login-bg.jpg';
import roomeLogo from '@/assets/images/roome-logo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPI, resetTempPasswordAPI } from '../../apis/auth';
import { Card, CardContent } from '../../components/ui/card';
import Form from './components/Form';
import { adminLoginFields, tempPasswordFields } from './constants/fields';
import { isValidEmail, isValidPassword } from './constants/validation';
import { AxiosError } from 'axios';

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
      newErrors.password =
        '영문, 숫자, 특수문자를 포함한 10자 이상이어야 합니다.';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      setErrors({});
      await loginAPI(email, password);
      navigate('/');
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        // 서버 응답 실패
        setErrors({ email: '로그인 실패!' });
      } else if (err.request) {
        // 네트워크 에러
        setErrors({ email: '서버 연결 오류' });
      } else {
        setErrors({ email: '알 수 없는 오류' });
      }
    }
  };

  //임시 비밀번호 재발급
  const handleResetTempPassword = async () => {
    const { email, name } = formState;
    const newErrors: Record<string, string> = {};

    if (!isValidEmail(email)) {
      newErrors.email = '유효한 이메일 형식이 아닙니다.';
    }
    if (!name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try{
      setErrors({});
      const message = await resetTempPasswordAPI(email, name);
      console.log(message);
      setFormType('login');
    } catch (error){
      setErrors({ email: '임시 비밀번호 발급 실패!' });
    }
  }
  const handleChangeField = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleTempPasswordClick = () => {
    setFormType('tempPassword');
  };

  const isLogin = formType === 'login';

  const isValid = isLogin
    ? isValidEmail(formState.email) && isValidPassword(formState.password)
    : isValidEmail(formState.email) && formState.name.length > 0;

  return (
    <main
      className='relative h-screen flex flex-col items-center justify-center bg-cover bg-center overflow-hidden'
      style={{ backgroundImage: `url(${loginBg})` }}>
      <img
        src={roomeLogo}
        alt=''
        className='w-30 mb-5'
      />
      {/* 로그인 창 */}
      <section className='relative w-[400px] bg-white rounded-2xl shadow-md px-6 py-10 z-100'>
        <Card className='w-full bg-transparent shadow-none border-none '>
          {/* 로그인 & 임시 비밀번호 발급 창 컴포넌트 */}
          <CardContent className='flex flex-col items-center gap-5 w-full'>
            {isLogin ? (
              <Form
                title='Welcome Back!'
                values={formState}
                errors={errors}
                fields={adminLoginFields}
                onClick={handleTempPasswordClick}
                onChangeField={handleChangeField}
                onSubmit={handleLogin}
                isValid={isValid}
              />
            ) : (
              <Form
                title='임시 비밀번호 재발급'
                errors={errors}
                values={formState}
                fields={tempPasswordFields}
                isValid={isValid}
                onSubmit={handleResetTempPassword}
              />
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
