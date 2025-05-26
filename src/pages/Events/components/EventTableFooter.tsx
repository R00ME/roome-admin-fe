import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

const EventTableFooter = ({ onAddEvent }: { onAddEvent: () => void }) => {
  return (
    <div className='flex justify-between items-center mt-4'>
      <span className='hidden flex-shrink-0 text-sm text-muted-foreground lg:flex'>
        n of n row(s) selected.
      </span>
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
            <PaginationLink href='#'>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#'>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href='#' />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Button
        className='bg-gradient-to-r from-[#888CFC] to-[#93B9FF] text-white px-6 py-3 rounded-full cursor-pointer'
        onClick={onAddEvent}>
        + 새 이벤트 추가하기
      </Button>
    </div>
  );
};

export default EventTableFooter;
