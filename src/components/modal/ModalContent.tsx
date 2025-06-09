import { AlertDialogContent } from '@/components/ui/alert-dialog';
import { memo } from 'react';

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

const ModalContent = memo(
  ({ children, className = '', maxWidth = 'lg' }: ModalContentProps) => {
    const maxWidthClasses = {
      sm: 'max-w-[500px]',
      md: 'max-w-[600px]',
      lg: 'max-w-[700px]',
      xl: 'max-w-[800px]',
    };

    return (
      <AlertDialogContent
        className={`${maxWidthClasses[maxWidth]} ${className}`}>
        {children}
      </AlertDialogContent>
    );
  },
);

export default ModalContent;
