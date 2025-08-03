import { Mail, Phone, User } from 'lucide-react';
import { AdminUser } from '../../../types/auth';
import InfoField from './InfoField';

export default function ReadOnlyInfo({
  adminEmail,
  username,
  phoneNumber,
}: Partial<AdminUser>) {
  return (
    <>
      <InfoField
        icon={<User className='w-4 h-4 text-gray-300' />}
        label={username || ''}
        badge='최고 마스터'
      />
      {phoneNumber && (
        <InfoField
          icon={<Phone className='w-4 h-4 text-gray-300' />}
          label={phoneNumber || ''}
        />
      )}
      <InfoField
        icon={<Mail className='w-4 h-4 text-gray-300' />}
        label={adminEmail || ''}
      />
    </>
  );
}
