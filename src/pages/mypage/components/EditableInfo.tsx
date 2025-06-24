import { Lock, Mail, Phone, User } from 'lucide-react';
import InfoField from './InfoField';

export default function EditableInfo() {
  return (
    <>
      <InfoField
        icon={<User className='w-4 h-4 text-gray-300' />}
        value='구름이'
        isEditing
      />
      <InfoField
        icon={<Phone className='w-4 h-4 text-gray-300' />}
        value='010-4949-5656'
        isEditing
      />
      <InfoField
        icon={<Mail className='w-4 h-4 text-gray-300' />}
        value='superadmin@gamil.com'
        disabled
        isEditing
      />
      <InfoField
        icon={<Lock className='w-4 h-4 text-gray-300' />}
        value='********'
        type='password'
        disabled
        isEditing
      />
    </>
  );
}
