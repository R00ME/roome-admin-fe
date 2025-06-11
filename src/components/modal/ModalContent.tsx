import { AlertDialogContent } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

const ModalContent = ({ children, className }: ModalContentProps) => {
  return (
    <AlertDialogContent
      className={cn('min-w-[600px] max-w-[800px]', className)}>
      {children}
    </AlertDialogContent>
  );
};

export default ModalContent;
