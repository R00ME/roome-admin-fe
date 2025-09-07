import {
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
} from '@tanstack/react-table';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Table, TableFooter, TableHeader } from '@/components/table';
import EventModal from '@/pages/events/components/EventModal';
import EventIcon from '@/assets/icons/sidebar/event-icon.svg?react';
import { getEventList, deleteEvent } from '@/apis/events';
import { EventItem, EventListResponse } from '@/types/events';
import { useToast } from '@/hooks/useToast';
import { Badge } from '@/components/ui/badge';
import DeleteCell from '@/components/table/cells/DeleteCell';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<EventItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<EventItem | null>(null);
  const { success, error: showError } = useToast();

  // URL에서 페이지 파라미터 파싱
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const handleDeleteClick = useCallback(
    (eventId: number) => {
      // 현재 data에서 해당 이벤트를 찾아서 설정
      const event = data.find((item) => item.eventId === eventId);
      if (event) {
        setEventToDelete(event);
        setDeleteDialogOpen(true);
      }
    },
    [data],
  );

  // 컬럼 정의를 동적으로 생성
  const columns = useMemo<ColumnDef<EventItem>[]>(() => {
    const baseColumns: ColumnDef<EventItem>[] = [
      {
        accessorKey: 'eventTitle',
        header: '이벤트 제목명',
      },
      {
        accessorKey: 'receiverTarget',
        header: '수신대상',
        cell: ({ getValue }) => {
          const target = getValue<string>();
          return target === 'ALL' ? '전체' : target;
        },
      },
      {
        accessorKey: 'uploadTime',
        header: '업로드 예정일시',
      },
      {
        accessorKey: 'status',
        header: '업로드 상태',
        cell: ({ getValue }) => {
          const status = getValue<string>();
          const statusMap = {
            NOTYET: { label: '예정', variant: 'secondary' as const },
            ONGOING: { label: '진행중', variant: 'default' as const },
            ENDED: { label: '종료', variant: 'destructive' as const },
          };
          const statusInfo = statusMap[status as keyof typeof statusMap] || {
            label: status,
            variant: 'secondary' as const,
          };
          return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
        },
      },
      {
        accessorKey: 'eventMessage',
        header: '이벤트 메시지',
      },
      {
        accessorKey: 'createdAt',
        header: '작성일/시간',
      },
      {
        accessorKey: 'writer',
        header: '작성자',
      },
      {
        id: 'actions',
        header: '관리',
        cell: ({ row }) => (
          <div className='flex justify-center'>
            <DeleteCell
              onClick={() => handleDeleteClick(row.original.eventId)}
            />
          </div>
        ),
      },
    ];

    return baseColumns;
  }, [handleDeleteClick]);

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const fetchEvents = useCallback(
    async (page: number) => {
      try {
        setIsLoading(true);
        const response: EventListResponse = await getEventList({
          page,
          pagesize: pageSize,
        });

        setData(response.data?.content || []);
        setTotalPages(response.data?.pagingUtil?.totalPages || 1);
      } catch (error) {
        console.error('이벤트 목록 조회 실패:', error);
        setData([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    },
    [pageSize],
  );

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage, fetchEvents]);

  const handlePageChange = (page: number) => {
    // URL 업데이트
    setSearchParams({ page: page.toString() });
  };

  const handleDeleteConfirm = async () => {
    if (!eventToDelete) return;

    try {
      await deleteEvent(eventToDelete.eventId);
      success('이벤트가 삭제되었습니다.');
      // 목록 새로고침
      await fetchEvents(currentPage);
    } catch (error) {
      console.error('이벤트 삭제 실패:', error);
      showError('이벤트 삭제에 실패했습니다.');
    } finally {
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    }
  };

  return (
    <div className='w-full'>
      <TableHeader
        icon={EventIcon}
        title='이벤트 목록'
        tabs={[
          { value: 'name', label: '이름순' },
          { value: 'date', label: '가입순' },
        ]}
        defaultTab='name'
      />
      {(!data || data.length === 0) && !isLoading ? (
        <div className='flex flex-col items-center justify-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200'>
          <div className='text-6xl mb-4'>📅</div>
          <h3 className='text-lg font-medium mb-2'>등록된 이벤트가 없습니다</h3>
          <p className='text-sm text-gray-400 mb-6'>
            새로운 이벤트를 등록해보세요
          </p>
        </div>
      ) : (
        <Table
          table={table}
          isLoading={isLoading}
        />
      )}
      <TableFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onAddItem={() => setOpen(true)}
        buttonText='+ 새 이벤트 추가하기'
        isLoading={isLoading}
      />
      <EventModal
        open={open}
        onOpenChange={setOpen}
        onSuccess={() => {
          // 이벤트 등록 성공 시에만 목록 새로고침
          fetchEvents(currentPage);
        }}
      />

      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>이벤트 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              <span className='font-medium text-foreground'>
                {eventToDelete?.eventTitle}
              </span>
              &nbsp;이벤트를 삭제하시겠습니까?
              <br />이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className='border border-red-400! bg-white text-red-400 hover:bg-red-400/10'>
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Events;
