import { memo } from 'react';
import { Input } from '@/components/ui/input';
import Label from './Label';

interface DateTimeInputProps {
  label: string;
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  minDate?: string;
  className?: string;
}

const DateTimeInput = memo(
  ({
    label,
    date,
    time,
    onDateChange,
    onTimeChange,
    minDate,
    className,
  }: DateTimeInputProps) => {
    return (
      <div className={className}>
        <Label>{label}</Label>
        <div className='flex gap-2'>
          <Input
            type='date'
            value={date}
            min={minDate}
            onChange={(e) => onDateChange(e.target.value)}
            className='w-1/2 [&::-webkit-calendar-picker-indicator]:p-0 [&::-webkit-datetime-edit]:p-0 [&::-webkit-datetime-edit-fields-wrapper]:p-0 [&::-webkit-datetime-edit-text]:p-0 [&::-webkit-datetime-edit-month-field]:p-0 [&::-webkit-datetime-edit-day-field]:p-0 [&::-webkit-datetime-edit-year-field]:p-0 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-datetime-edit]:m-0 [&::-webkit-datetime-edit-fields-wrapper]:m-0 px-1.5'
          />
          <Input
            type='time'
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
            className='w-1/2 [&::-webkit-calendar-picker-indicator]:p-0 [&::-webkit-datetime-edit]:px-2'
          />
        </div>
      </div>
    );
  },
);

DateTimeInput.displayName = 'DateTimeInput';

export default DateTimeInput;
