// components/table/TableFooter.tsx
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import * as React from 'react';

export interface TableFooterProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onAddItem?: () => void;
  buttonText?: string;
  isLoading?: boolean;
}

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

/** 간단한 페이지 목록 생성 (최대 5개 노출: 1, ..., prev, current, next, ..., total) */
function getPageRange(current: number, total: number): (number | '...')[] {
  // total이 NaN이거나 유효하지 않은 경우 기본값 1 사용
  const safeTotal = isNaN(total) || total < 1 ? 1 : total;
  const safeCurrent = isNaN(current) || current < 1 ? 1 : current;

  if (safeTotal <= 5) return Array.from({ length: safeTotal }, (_, i) => i + 1);

  const pages = new Set<number>();
  pages.add(1);
  pages.add(safeTotal);
  pages.add(clamp(safeCurrent - 1, 1, safeTotal));
  pages.add(safeCurrent);
  pages.add(clamp(safeCurrent + 1, 1, safeTotal));

  const arr = Array.from(pages).sort((a, b) => a - b);

  // 사이 간격이 2 이상이면 '...' 삽입
  const withDots: (number | '...')[] = [];
  for (let i = 0; i < arr.length; i++) {
    withDots.push(arr[i]);
    if (i < arr.length - 1 && arr[i + 1] - arr[i] > 1) withDots.push('...');
  }
  return withDots;
}

const TableFooter: React.FC<TableFooterProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onAddItem,
  buttonText,
  isLoading = false,
}) => {
  // 안전한 값으로 변환
  const safeCurrentPage =
    isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;
  const safeTotalPages = isNaN(totalPages) || totalPages < 1 ? 1 : totalPages;

  const canPrev = safeCurrentPage > 1 && !isLoading;
  const canNext = safeCurrentPage < safeTotalPages && !isLoading;
  const pageRange = getPageRange(safeCurrentPage, safeTotalPages);

  return (
    <div className='mt-4 flex items-center justify-between'>
      <Pagination>
        <PaginationContent>
          {/* Prev */}
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={!canPrev}
              className={!canPrev ? 'pointer-events-none opacity-50' : ''}
              href='#'
              onClick={(e) => {
                e.preventDefault();
                if (canPrev) onPageChange(safeCurrentPage - 1);
              }}
            />
          </PaginationItem>

          {/* Pages */}
          {pageRange.map((p, idx) =>
            p === '...' ? (
              <PaginationItem key={`dots-${idx}`}>
                <span className='px-3 text-sm text-muted-foreground'>…</span>
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  href='#'
                  isActive={p === safeCurrentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(p);
                  }}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              aria-disabled={!canNext}
              className={!canNext ? 'pointer-events-none opacity-50' : ''}
              href='#'
              onClick={(e) => {
                e.preventDefault();
                if (canNext) onPageChange(safeCurrentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* 우측 버튼 (옵션) */}
      {onAddItem && buttonText && (
        <Button
          className='cursor-pointer rounded-full bg-gradient-to-r from-[#888CFC] to-[#93B9FF] px-6 py-3 text-white'
          onClick={onAddItem}
          disabled={isLoading}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default TableFooter;
