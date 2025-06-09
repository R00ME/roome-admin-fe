import { memo } from 'react';
import { Row, Table } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';

interface SelectCellProps<TData> {
  type: 'header' | 'cell';
  table?: Table<TData>;
  row?: Row<TData>;
}

function SelectCell<TData>({ type, table, row }: SelectCellProps<TData>) {
  if (type === 'header' && table) {
    return (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='전체 선택'
      />
    );
  }

  if (type === 'cell' && row) {
    return (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='행 선택'
      />
    );
  }

  return null;
}

export default memo(SelectCell) as typeof SelectCell;
