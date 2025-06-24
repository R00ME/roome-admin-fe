import { Eye, EyeOff, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import ProfileImage from './components/ProfileImage';
import ReadOnlyInfo from './components/ReadOnlyInfo';

export default function ChangePassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className='w-78 rounded-xl px-4'>
      <h1 className='text-center border-b pb-4 text-lg font-semibold text-[#4983EF]'>
        비밀번호 변경
      </h1>
      <CardContent className='flex flex-col items-start gap-4 px-6'>
        {/* 프로필 이미지 */}
        <ProfileImage />

        {/* 기본 정보 필드 */}
        <ReadOnlyInfo />

        {/* 인증번호 입력 */}
        <section className='flex flex-col relative w-full gap-2 mt-2'>
          <div className='relative w-full'>
            <input
              type='text'
              placeholder='인증번호를 입력하세요.'
              className='w-full px-3 py-2 border rounded-md text-sm'
            />
            <Button
              size='icon'
              variant='ghost'
              className='absolute right-2 top-1/2 -translate-y-1/2'
              onClick={() => alert('인증번호 재전송')}>
              <RotateCcw className='w-4 h-4 text-gray-400' />
            </Button>
          </div>

          {/* 새 비밀번호 입력 */}
          <div className='relative w-full'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='새로운 비밀번호'
              className='w-full px-3 py-2 border rounded-md text-sm'
            />
            <Button
              size='icon'
              variant='ghost'
              className='absolute right-2 top-1/2 -translate-y-1/2'
              onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? (
                <EyeOff className='w-4 h-4 text-gray-400' />
              ) : (
                <Eye className='w-4 h-4 text-gray-400' />
              )}
            </Button>
          </div>
        </section>

        {/* 하단 버튼 */}
        <div className='mt-2 flex gap-2 w-full'>
          <Button
            variant='outline'
            className='flex-1 rounded-full'
            onClick={() => navigate('/settings')}>
            닫기
          </Button>
          <Button className='flex-1 rounded-full bg-[#293F66] text-white hover:bg-[#4983EF]'>
            저장하기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
