import { Lock } from "lucide-react";

export default function PasswordField({ isEditing }: { isEditing: boolean }) {
  return (
    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
      <Lock className='w-4 h-4 text-gray-300' />
      <span>********</span>
      {isEditing ? (
        <span className='text-xs text-gray-400'>(비밀번호는 별도로 변경 가능)</span>
      ) : (
        <a href='/change-password' className='text-[#4983EF] underline text-xs'>
          비밀번호 변경
        </a>
      )}
    </div>
  );
}
