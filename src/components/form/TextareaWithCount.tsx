import { memo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const TextareaWithCount = memo(
  ({
    showCount = false,
    maxLength,
    value,
    className,
    ...props
  }: TextareaWithCountProps) => {
    return (
      <div>
        <Textarea
          maxLength={maxLength}
          value={value}
          className={cn('resize-none', className)}
          {...props}
        />
        {showCount && maxLength && (
          <div className='text-xs text-right text-gray-400 mt-1'>
            {value.length}/{maxLength}
          </div>
        )}
      </div>
    );
  },
);

TextareaWithCount.displayName = 'TextareaWithCount';

export default TextareaWithCount;
