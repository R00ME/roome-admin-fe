import { ErrorBoundary } from 'react-error-boundary';

interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className='flex flex-col items-center justify-center p-4 text-center'>
      <h3 className='font-semibold text-lg mb-1'>
        알림을 불러오는 중 오류가 발생했습니다.
      </h3>
      <p className='text-sm text-gray-500 mb-2'>{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className='text-sm text-gray-500 hover:text-gray-700'>
        다시 시도
      </button>
    </div>
  );
};

interface NotificationErrorBoundaryProps {
  children: React.ReactNode;
}

const NotificationErrorBoundary = ({
  children,
}: NotificationErrorBoundaryProps) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // 에러 바운더리 리셋 시 실행할 로직
        // 예: 쿼리 캐시 초기화 등
      }}
      onError={(error) => {
        // 에러 로깅 등
        console.error('Notification Error:', error);
      }}>
      {children}
    </ErrorBoundary>
  );
};

export default NotificationErrorBoundary;
