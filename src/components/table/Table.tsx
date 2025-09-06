import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { flexRender, Table as TanStackTable } from '@tanstack/react-table';
import TableSkeleton from './TableSkeleton';

interface TableProps<T> {
  table: TanStackTable<T>;
  isLoading?: boolean;
  onRowClick?: (row: T) => void;
  columnsCount?: number;
}

const Table = <T,>({
  table,
  isLoading,
  onRowClick,
  columnsCount,
}: TableProps<T>) => {
  if (isLoading) {
    return <TableSkeleton columns={table.getAllColumns().length} />;
  }

  const colCount = Math.max(
    1,
    columnsCount ?? table.getAllColumns().length ?? 0,
  );

  if (isLoading) {
    return <TableSkeleton columns={colCount} />;
  }

  const rows = table.getRowModel().rows;

  return (
    <div className='rounded-xl border bg-white'>
      <ShadcnTable>
        <TableHeader className='bg-gray-100 text-gray-500'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className='py-3 whitespace-nowrap'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={colCount}
                className='py-10 text-center text-sm text-gray-500'>
                데이터가 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => onRowClick?.(row.original)}
                className={
                  onRowClick ? 'cursor-pointer hover:bg-gray-50' : undefined
                }>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className='py-3 whitespace-nowrap'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </ShadcnTable>
    </div>
  );
};

export default Table;
