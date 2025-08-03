import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalBackground from '../../components/ModalBackground';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { useUserStore } from '../../store/useUserStore';
import EditableInfo from './components/EditableInfo';
import ProfileImage from './components/ProfileImage';
import { EditAdminInfo, fetchAdminInfo } from '../../apis/auth';
import { toast } from 'sonner';

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const [username, setUsername] = useState(user?.username || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');

  const handleSave = async () => {
  try {
    await EditAdminInfo(username, phoneNumber); 
    toast.success('성공적으로 변경되었습니다.')
    const updatedUser = await fetchAdminInfo();
    setUser(updatedUser);
    navigate('/settings');
  } catch (error) {
    console.error('🚨 관리자 정보 변경 실패:', error);
    toast.error('🚨 실패했습니다. 다시 한 번 시도해주세요.')

  }
};

  return (
    <ModalBackground>
      <Card className='w-78 rounded-xl px-4'>
        <h1 className='text-center border-b pb-4 text-lg font-semibold text-[#4983EF]'>
          개인정보 변경
        </h1>
        <CardContent className='flex flex-col items-start gap-3 px-6'>
          {/* 프로필 이미지 */}
          <ProfileImage />
          {/* 개인정보 필드 */}
          <EditableInfo
            username={username}
            phoneNumber={phoneNumber}
            adminEmail={user?.adminEmail}
            onChangeUsername={setUsername}
            onChangePhoneNumber={setPhoneNumber}
          />
          {/* 하단 버튼 */}
          <div className='mt-3 flex gap-2 w-full'>
            <Button
              variant='outline'
              className='flex-1 rounded-full'
              onClick={() => navigate('/settings')}>
              닫기
            </Button>
            <Button
              onClick={handleSave} 
              className='flex-1 rounded-full bg-[#293F66] text-white hover:bg-[#4983EF]'>
              저장하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </ModalBackground>
  );
}
