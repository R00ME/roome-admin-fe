import { memo } from 'react';
import { cn } from '@/lib/utils';


const Label = memo(({ children, className }: LabelProps) => {
  return (
    <label
      className={cn(
        'block text-sm font-regular mb-1 text-gray-600',
        className,
      )}>
      {children}
    </label>
  );
});

Label.displayName = 'Label';

export default Label;
