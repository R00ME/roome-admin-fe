import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PasswordField() {
  const navigate = useNavigate();

  return (
    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
      <Lock className='w-4 h-4 text-gray-300' />
      <span>********</span>
      <button
        onClick={() => navigate('/settings/password')}
        className='text-[#4983EF] underline text-xs'>
        비밀번호 변경
      </button>
    </div>
  );
}
