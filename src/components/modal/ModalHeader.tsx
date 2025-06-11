import {
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { memo } from 'react';

const ModalHeader = memo(({ title, className = '' }: ModalHeaderProps) => {
  return (
    <AlertDialogHeader>
      <AlertDialogTitle
        className={`text-blue-500 text-lg font-bold mb-4 border-b border-gray-200 pb-2 ${className}`}>
        {title}
      </AlertDialogTitle>
    </AlertDialogHeader>
  );
});

export default ModalHeader;
