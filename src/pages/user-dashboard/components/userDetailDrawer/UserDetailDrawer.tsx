import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { useRef, useState } from 'react';
import { UserDetailDrawerProps } from '../../../../types/user-dashboard';
import DrawerActions from './DrawerActions';
import UserDetailContent from './UserDetailContent';

export default function UserDetailDrawer({
  open,
  onClose,
  user,
}: UserDetailDrawerProps) {
  const [width, setWidth] = useState(800);
  const minWidth = 800;
  const maxWidth = 1200;
  const isDragging = useRef(false);

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

  return (
    <Drawer
      open={open}
      onClose={onClose}
      direction='right'>
      <DrawerContent style={{ width: width, maxWidth: '100%' }}>
        <div
          className='absolute left-0 top-0 h-full w-2 bg-transparent cursor-col-resize z-50'
          onMouseDown={handleMouseDown}
        />
        {/* 액션바 */}
        <DrawerActions onClose={onClose} />
        {/* 콘텐츠 */}
        <UserDetailContent drawerWidth={width} />
      </DrawerContent>
    </Drawer>
  );
}
