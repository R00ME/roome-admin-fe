interface ChartEmptyStateProps {
  message: string;
  showDots?: boolean;
}

const ChartEmptyState = ({
  message,
  showDots = true,
}: ChartEmptyStateProps) => {
  return (
    <div className='flex flex-col items-center justify-center h-64 space-y-4'>
      <p className='text-lg text-blue-500 font-medium animate-pulse'>
        {message}
      </p>
      {showDots && (
        <div className='flex space-x-1'>
          <div className='w-2 h-2 bg-blue-500 rounded-full animate-bounce'></div>
          <div
            className='w-2 h-2 bg-blue-500 rounded-full animate-bounce'
            style={{ animationDelay: '0.1s' }}></div>
          <div
            className='w-2 h-2 bg-blue-500 rounded-full animate-bounce'
            style={{ animationDelay: '0.2s' }}></div>
        </div>
      )}
    </div>
  );
};

export default ChartEmptyState;
