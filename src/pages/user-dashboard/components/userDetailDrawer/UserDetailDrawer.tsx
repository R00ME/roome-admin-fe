import { useEffect, useRef, useState } from 'react';
import ModalBackground from '../../../../components/ModalBackground';
import { UserDetailDrawerProps } from '../../../../types/user-dashboard';
import DrawerActions from './DrawerActions';
import UserDetailContent from './UserDetailContent';

export default function UserDetailDrawer({
  open,
  onClose,
  user,
}: UserDetailDrawerProps) {
  const [width, setWidth] = useState(800);
  const [visible, setVisible] = useState(false);
  const minWidth = 800;
  const maxWidth = 1200;
  const isDragging = useRef(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        setVisible(true);
      });
    }
  }, [open]);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.body.style.cursor = '';
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    e.preventDefault();
  };

  if (!open) return null;

  return (
    <ModalBackground onClose={onClose}>
      <section
        className={`
          fixed top-0 right-0 h-full bg-white shadow-lg z-[201]
          transform transition-all duration-300 ease-in-out
          ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        `}
        style={{ width: width, maxWidth: '100%' }}>
        <div
          ref={drawerRef}
          className='absolute left-0 top-0 h-full w-2 bg-transparent cursor-col-resize z-50'
          onMouseDown={handleMouseDown}
        />
        {/* 액션바 */}
        <DrawerActions onClose={onClose} />
        {/* 콘텐츠 */}
        <UserDetailContent drawerWidth={width} />
      </section>
    </ModalBackground>
  );
}
