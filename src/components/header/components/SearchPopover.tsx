import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface SearchPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const SearchPopover = ({
  open,
  onOpenChange,
  children,
}: SearchPopoverProps) => (
  <Popover
    open={open}
    onOpenChange={onOpenChange}>
    {children}
  </Popover>
);

export { PopoverTrigger, PopoverContent };
export default SearchPopover;
