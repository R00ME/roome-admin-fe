import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

const TableFooter = ({ onAddItem, buttonText }: TableFooterProps) => {
  return (
    <div className='flex justify-between items-center mt-4'>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href='#' />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href='#'
              isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href='#' />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      {/* 버튼 */}
      {onAddItem && buttonText && (
        <Button
          className='bg-gradient-to-r from-[#888CFC] to-[#93B9FF] text-white px-6 py-3 rounded-full cursor-pointer'
          onClick={onAddItem}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default TableFooter;
