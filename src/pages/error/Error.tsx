import { useEffect } from 'react';
import { useToast } from '@/hooks/useToast';
import { toast } from 'sonner';

// 전역 변수로 토스트 표시 여부 관리
let errorToastShown = false;

const Error = () => {
  const toastHook = useToast();

  useEffect(() => {
    // 이미 토스트를 표시했다면 return
    if (errorToastShown) return;

    // 기존 토스트 제거
    toast.dismiss();

    // 플래그 설정
    errorToastShown = true;

    // 토스트 표시
    toastHook.error(
      '페이지를 찾을 수 없습니다',
      '요청하신 페이지가 존재하지 않습니다.',
    );

    // cleanup 함수에서 플래그 리셋 (페이지를 벗어날 때)
    return () => {
      setTimeout(() => {
        errorToastShown = false;
      }, 100);
    };
  }, [toastHook]);

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='text-6xl font-bold'>404</h1>
      <p className='text-2xl'>페이지를 찾을 수 없습니다.</p>
    </div>
  );
};

export default Error;
