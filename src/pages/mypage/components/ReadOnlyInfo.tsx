import { Mail, Phone, User } from 'lucide-react';
import InfoField from './InfoField';

export default function ReadOnlyInfo() {
  return (
    <>
      <InfoField
        icon={<User className='w-4 h-4 text-gray-300' />}
        label='구름이'
        badge='최고 마스터'
      />
      <InfoField
        icon={<Phone className='w-4 h-4 text-gray-300' />}
        label='010-4949-5656'
      />
      <InfoField
        icon={<Mail className='w-4 h-4 text-gray-300' />}
        label='superadmin@gamil.com'
      />
    </>
  );
}
