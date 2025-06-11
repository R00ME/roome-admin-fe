interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

interface ModalFooterProps {
  variant?: 'single' | 'double';
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  confirmDisabled?: boolean;
  className?: string;
}

interface ModalHeaderProps {
  title: string;
  className?: string;
}
