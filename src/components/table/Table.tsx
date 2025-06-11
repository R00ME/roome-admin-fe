import { flexRender, Table as TanStackTable } from '@tanstack/react-table';
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import TableSkeleton from './TableSkeleton';

interface TableProps<T> {
  table: TanStackTable<T>;
  isLoading?: boolean;
}

const Table = <T,>({ table, isLoading }: TableProps<T>) => {
  if (isLoading) {
    return <TableSkeleton columns={table.getAllColumns().length} />;
  }

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
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className='py-3 whitespace-nowrap'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </ShadcnTable>
    </div>
  );
};

export default Table;
