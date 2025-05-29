import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface DashboardTitleProps {
  title: string;
  tooltipContent?: string;
}

const DashboardTitle = ({ title, tooltipContent }: DashboardTitleProps) => {
  return (
    <div className='flex items-center gap-2 mb-4'>
      <h1 className='text-xl font-semibold text-gray-600'>{title}</h1>
      {tooltipContent && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className='text-[12px] font-bold text-gray-300 hover:text-gray-400 transition-colors rounded-full py-0.3 px-2 select-none border-2 border-gray-300 hover:border-gray-400 cursor-pointer hover:bg-gray-100 [&_*]:[-webkit-user-drag:none]'>
                i
              </button>
            </TooltipTrigger>
            <TooltipContent
              side='right'
              align='center'
              sideOffset={5}>
              <p className='text-sm'>{tooltipContent}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default DashboardTitle;
