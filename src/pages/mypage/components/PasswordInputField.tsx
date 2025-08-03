import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';

interface PasswordInputFieldProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
}

export default function PasswordInputField({
  placeholder,
  value,
  onChange,
  errorMessage,
}: PasswordInputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='w-full'>
      <div className='relative w-full'>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-3 py-2 border-2 rounded-md text-sm focus:outline-none   ${errorMessage ? 'border-[#b82044]' : 'focus:border-[#4983EF]'}`}
        />
        <Button
          size='icon'
          variant='ghost'
          className='absolute right-2 top-1/2 -translate-y-1/2'
          onClick={() => setShowPassword((prev) => !prev)}
          type='button'>
          {showPassword ? (
            <EyeOff className='w-4 h-4 text-gray-400' />
          ) : (
            <Eye className='w-4 h-4 text-gray-400' />
          )}
        </Button>
      </div>
      {errorMessage && (
        <label className='mt-[2px] pl-1 text-xs text-[#b82044] block'>
          {errorMessage}
        </label>
      )}
    </div>
  );
}
