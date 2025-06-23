import profileImg from '@/assets/images/default-profile-img.jpg';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import EditableInfo from './EditableInfo';
import ReadOnlyInfo from './ReadOnlyInfo';

export default function Mypage() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Card className='w-78 rounded-xl px-4'>
      <p className='text-center border-b pb-4 text-lg font-semibold text-[#4983EF]'>
        {isEditing ? '마이페이지' : '개인정보 변경'}
      </p>
      <CardContent className='flex flex-col items-start gap-4 px-6'>
        {/* 프로필 이미지 */}
        <div className='w-full flex justify-center'>
          <Avatar className='w-28 h-28 mb-2'>
            <AvatarImage
              src={profileImg}
              alt='프로필'
              className='rounded-full border'
            />
          </Avatar>
        </div>

        {/* 읽기 or 편집 모드 */}
        {isEditing ? <EditableInfo /> : <ReadOnlyInfo />}

        {/* 하단 버튼 */}
        <div className='mt-3 flex gap-2 w-full'>
          <Button
            onClick={() => setIsEditing(false)}
            variant='outline'
            className='flex-1 rounded-full'>
            닫기
          </Button>
          <Button
            onClick={() => setIsEditing((prev) => !prev)}
            className='flex-1 rounded-full bg-[#293F66] text-white hover:bg-[#4983EF]'>
            {isEditing ? '변경하기' : '개인정보 변경'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
