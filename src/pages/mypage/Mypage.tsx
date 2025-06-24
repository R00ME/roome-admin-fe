import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import ProfileImage from './components/ProfileImage';
import ReadOnlyInfo from './components/ReadOnlyInfo';
import PasswordField from './components/PasswordField';

export default function Mypage() {
  const navigate = useNavigate();

  return (
    <Card className='w-78 rounded-xl px-4'>
      <h1 className='text-center border-b pb-4 text-lg font-semibold text-[#4983EF]'>
        마이페이지
      </h1>
      <CardContent className='flex flex-col items-start gap-4 px-6'>
        {/* 프로필 이미지 */}
        <ProfileImage />
        {/* 개인정보 필드 */}
        <ReadOnlyInfo />
        <PasswordField/>
        {/* 하단 버튼 */}
        <div className='mt-3 flex gap-2 w-full'>
          <Button
            variant='outline'
            className='flex-1 rounded-full'>
            닫기
          </Button>
          <Button
            onClick={() => navigate('/settings/profile')}
            className='flex-1 rounded-full bg-[#293F66] text-white hover:bg-[#4983EF]'>
            개인정보 변경
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
