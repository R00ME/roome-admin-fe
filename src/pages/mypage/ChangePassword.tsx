import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePasswordAPI } from '../../apis/auth';
import ModalBackground from '../../components/ModalBackground';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import PasswordInputField from './components/PasswordInputField';
import axios from 'axios';

export default function ChangePassword() {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    try {
      setErrorMessages({ current: '', new: '', confirm: '' });
      if (!currentPassword || !newPassword || !confirmPassword) {
        setErrorMessages({
          current: !currentPassword ? '현재 비밀번호를 입력해 주세요.' : '',
          new: !newPassword ? '새 비밀번호를 입력해 주세요.' : '',
          confirm: !confirmPassword ? '새 비밀번호 확인을 입력해 주세요.' : '',
        });
        return;
      }

      if (newPassword !== confirmPassword) {
        setErrorMessages({
          current: '',
          new: '',
          confirm: '비밀번호가 일치하지 않습니다.',
        });
        return;
      }
      await changePasswordAPI(currentPassword, newPassword, confirmPassword);
      navigate('/settings');
    } catch (error) {
      if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || '비밀번호 변경에 실패했습니다.';
      if (message.includes('기존') || message.includes('현재')) {
        setErrorMessages({ current: message, new: '', confirm: '' });
      } else if (message.includes('확인') || message.includes('불일치')) {
        setErrorMessages({ current: '', new: '', confirm: message });
      } else {
        setErrorMessages({ current: '', new: message, confirm: '' });
      }
    } else {
      setErrorMessages({ current: '', new: '알 수 없는 에러가 발생했습니다.', confirm: '' });
    }
    }
  };

  return (
    <ModalBackground>
      <Card className='w-78 rounded-xl px-4'>
        <h1 className='text-center text-lg font-semibold text-[#4983EF]'>
          관리자 비밀번호 변경
        </h1>
        <CardContent className='flex flex-col items-start gap-4 px-6'>
          <section className='flex flex-col relative w-full gap-4'>
            <PasswordInputField
              placeholder='현재 비밀번호'
              value={currentPassword}
              onChange={setCurrentPassword}
              errorMessage={errorMessages.current}
            />

            <PasswordInputField
              placeholder='새 비밀번호'
              value={newPassword}
              onChange={setNewPassword}
              errorMessage={errorMessages.new}
            />

            <PasswordInputField
              placeholder='새 비밀번호 확인'
              value={confirmPassword}
              onChange={setConfirmPassword}
              errorMessage={errorMessages.confirm}
            />
          </section>

          {/* 하단 버튼 */}
          <div className='mt-2 flex gap-2 w-full'>
            <Button
              variant='outline'
              className='flex-1 rounded-full'
              onClick={() => navigate('/settings')}>
              닫기
            </Button>
            <Button
              onClick={handleChangePassword}
              className='flex-1 rounded-full bg-[#293F66] text-white hover:bg-[#4983EF]'>
              변경하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </ModalBackground>
  );
}
