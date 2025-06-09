import { ColumnDef } from '@tanstack/react-table';
import StatusCell from '@/components/table/cells/StatusCell';
import React from 'react';

export interface EventItem {
  id: string;
  title: string;
  target: string;
  uploadTime: string;
  status: string;
  message: string;
  browser: string;
  createdAt: string;
  author: string;
}

export const MOCK_EVENT_DATA: EventItem[] = [
  {
    id: '1',
    title: '2025년 새로운 방꾸로 돌아왔습니다',
    target: '전체',
    uploadTime: '오늘, PM 04:20',
    status: '대기중',
    message: '2025 출시기념 오픈 이벤트에 여러분을 초대합니다',
    browser: 'chrome',
    createdAt: '2025-04-24, 09:22 AM',
    author: '김광구',
  },
];

export const EVENT_COLUMNS: ColumnDef<EventItem>[] = [
  {
    accessorKey: 'title',
    header: '이벤트 제목명',
  },
  {
    accessorKey: 'target',
    header: '수신대상',
  },
  {
    accessorKey: 'uploadTime',
    header: '업로드 예정일시',
  },
  {
    accessorKey: 'status',
    header: '업로드 상태',
    cell: ({ getValue }) =>
      React.createElement(StatusCell, { status: getValue<string>() }),
  },
  {
    accessorKey: 'message',
    header: '이벤트 메시지',
  },
  {
    accessorKey: 'browser',
    header: '첨부파일 여부',
  },
  {
    accessorKey: 'createdAt',
    header: '작성일/시간',
  },
  {
    accessorKey: 'author',
    header: '작성자',
  },
];
