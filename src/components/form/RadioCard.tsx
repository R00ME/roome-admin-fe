import { memo } from 'react';
import { cn } from '@/lib/utils';

interface RadioCardOption {
  value: string;
  label: string;
}

interface RadioCardGroupProps {
  options: RadioCardOption[];
  value: string;
  onChange: (value: string) => void;
}

const RadioCard = memo(({ options, value, onChange }: RadioCardGroupProps) => {
  return (
    <div className='flex gap-4 text-sm'>
      {options.map((option) => (
        <div
          key={option.value}
          className={cn(
            'flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors',
            value === option.value
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300',
          )}
          onClick={() => onChange(option.value)}>
          <div
            className={cn(
              'w-4 h-4 rounded-full border-2 flex items-center justify-center',
              value === option.value
                ? 'border-blue-500 bg-blue-500'
                : 'border-gray-300',
            )}>
            {value === option.value && (
              <div className='w-2 h-2 bg-white rounded-full'></div>
            )}
          </div>
          <span className='font-medium'>{option.label}</span>
        </div>
      ))}
    </div>
  );
});

RadioCard.displayName = 'RadioCard';

export default RadioCard;
