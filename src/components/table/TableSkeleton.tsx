import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const TableSkeleton = ({ columns, rows = 5 }: TableSkeletonProps) => {
  return (
    <div className='rounded-xl border bg-white'>
      <Table>
        <TableHeader className='bg-gray-100'>
          <TableRow>
            {Array.from({ length: columns }).map((_, index) => (
              <TableHead
                key={index}
                className='py-3 whitespace-nowrap'>
                <Skeleton className='h-4 w-[100px]' />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell
                  key={`${rowIndex}-${colIndex}`}
                  className='py-3 whitespace-nowrap'>
                  <Skeleton className='h-4 w-[100px]' />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSkeleton;
