import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import EditableInfo from './components/EditableInfo';
import ProfileImage from './components/ProfileImage';

export default function EditProfile() {
  const navigate = useNavigate();

  return (
    <Card className='w-78 rounded-xl px-4'>
      <h1 className='text-center border-b pb-4 text-lg font-semibold text-[#4983EF]'>
        개인정보 변경
      </h1>
      <CardContent className='flex flex-col items-start gap-3 px-6'>
        {/* 프로필 이미지 */}
        <ProfileImage />
        {/* 개인정보 필드 */}
        <EditableInfo />
        {/* 하단 버튼 */}
        <div className='mt-3 flex gap-2 w-full'>
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
