import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

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
              <InformationCircleIcon className='w-5 h-5 cursor-pointer text-gray-500' />
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
