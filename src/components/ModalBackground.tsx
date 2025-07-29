import React from 'react';
import { createPortal } from 'react-dom';

const ModalBackground = React.memo(
  ({
    children,
    onClose,
  }: {
    children?: React.ReactNode;
    onClose?: () => void;
  }) => {
    const handlecloseModal = (
      event: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>,
    ) => {
      event.stopPropagation();
      onClose?.();
    };

    const modalContent = (
      <div
        className={`absolute inset-0 z-200 w-full h-full flex justify-center items-center bg-[#1e37759e] backdrop-blur-xs`}
        onClick={handlecloseModal}>
        <div onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );

    return createPortal(modalContent, document.body);
  },
);

export default ModalBackground;
