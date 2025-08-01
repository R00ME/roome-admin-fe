import { Lock, Mail, Phone, User } from 'lucide-react';
import InfoField from './InfoField';

interface EditableInfoProps {
  username: string;
  phoneNumber: string;
  adminEmail?: string
  onChangeUsername: (value: string) => void;
  onChangePhoneNumber: (value: string) => void;
}

export default function EditableInfo({
  username,
  phoneNumber,
  adminEmail,
  onChangeUsername,
  onChangePhoneNumber,
}: EditableInfoProps) {
  return (
    <>
      <InfoField
        icon={<User className='w-4 h-4 text-gray-300' />}
        value={username}
        onChange={(e) => onChangeUsername(e.target.value)}
        isEditing
      />
      {phoneNumber && 
      <InfoField
      icon={<Phone className='w-4 h-4 text-gray-300' />}
      value={phoneNumber}
        onChange={(e) => onChangePhoneNumber(e.target.value)}
      isEditing
      />
    }
      <InfoField
        icon={<Mail className='w-4 h-4 text-gray-300' />}
        value={adminEmail || ''}
        disabled
        isEditing
      />
      <InfoField
        icon={<Lock className='w-4 h-4 text-gray-300' />}
        value='**********'
        type='password'
        disabled
        isEditing
      />
    </>
  );
}
