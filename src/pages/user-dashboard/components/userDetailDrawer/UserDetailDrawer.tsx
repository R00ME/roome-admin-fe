import React, { useCallback, useEffect, useRef, useState } from 'react';
import ModalBackground from '../../../../components/ModalBackground';
import { UserDetailDrawerProps } from '../../../../types/user-dashboard';
import DrawerActions from './DrawerActions';
import UserDetailContent from './UserDetailContent';

const MemoizedUserDetailContent = React.memo(UserDetailContent);

export default function UserDetailDrawer({
  open,
  onClose,
}: UserDetailDrawerProps) {
  const [width, setWidth] = useState(800);
  const [visible, setVisible] = useState(false);

  const minWidth = 800;
  const maxWidth = 1200;
  const isDragging = useRef(false);
  const frameRequested = useRef(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const latestX = useRef<number>(0);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        setVisible(true);
      });
    }
  }, [open]);

  const updateWidth = useCallback(() => {
    if(!isDragging.current) return;
    const newWidth = window.innerWidth - latestX.current;

    if(newWidth >= minWidth && newWidth <= maxWidth){
      setWidth(newWidth);
    }
    frameRequested.current = false;
  }, [minWidth, maxWidth])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    latestX.current = e.clientX

    if (!frameRequested. current) {
      frameRequested.current = true;
      requestAnimationFrame(updateWidth)
    }
  }, [updateWidth]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.body.style.cursor = '';
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove])

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
          transform ease-in-out
          ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        `}
        style={{ width: width, maxWidth: '100%', transition: 'none' }}>
        <div
          ref={drawerRef}
          className='absolute left-0 top-0 h-full w-2 bg-transparent cursor-col-resize z-50'
          onMouseDown={handleMouseDown}
        />
        {/* 액션바 */}
        <DrawerActions onClose={onClose} />
        {/* 콘텐츠 */}
        <MemoizedUserDetailContent drawerWidth={width} />
      </section>
    </ModalBackground>
  );
}
