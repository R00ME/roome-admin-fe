import { Skeleton } from '@/components/ui/skeleton';

interface NotificationSkeletonProps {
  count?: number;
}

const NotificationSkeleton = ({ count = 5 }: NotificationSkeletonProps) => {
  return (
    <div className='space-y-4'>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className='flex items-start space-x-4 p-4 border-b'>
          <Skeleton className='h-12 w-12 rounded-full' />
          <div className='space-y-2 flex-1'>
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
            <Skeleton className='h-4 w-1/4' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeleton;
