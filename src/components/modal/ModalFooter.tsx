import {
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { memo } from 'react';

const ModalFooter = memo(
  ({
    variant = 'double',
    cancelText = '취소',
    confirmText = '확인',
    onCancel,
    onConfirm,
    confirmDisabled = false,
    className = '',
  }: ModalFooterProps) => {
    return (
      <AlertDialogFooter
        className={`flex-row justify-end gap-2 mt-6 ${className}`}>
        {variant === 'double' && (
          <AlertDialogCancel
            className='rounded-full border px-8 py-2'
            onClick={onCancel}>
            {cancelText}
          </AlertDialogCancel>
        )}
        <Button
          type='submit'
          className='rounded-full px-8 py-2 bg-blue-900 text-white'
          onClick={onConfirm}
          disabled={confirmDisabled}>
          {confirmText}
        </Button>
      </AlertDialogFooter>
    );
  },
);

export default ModalFooter;
