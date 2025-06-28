import { ColumnDef } from '@tanstack/react-table'
import { UserActivityItem } from '../../types/user-dashboard'

export const USER_ACTIVITY_COLUMNS: ColumnDef<UserActivityItem>[] = [
  {
    accessorKey: 'nickname',
    header: '닉네임',
  },
  {
    accessorKey: 'email',
    header: 'ID/이메일',
  },
  {
    accessorKey: 'lastActive',
    header: '마지막 접속 시간',
  },
  {
    accessorKey: 'url',
    header: '가장 많이 접속한 기능 (url)',
  },
  {
    accessorKey: 'browser',
    header: '접속 브라우저',
  },
  {
    accessorKey: 'joinedAt',
    header: '최초 가입일',
  },
]

export const MOCK_USER_DATA: UserActivityItem[] = [
  {
    nickname: '구름이',
    email: 'test02@naver.com',
    lastActive: '오늘, PM 04:20',
    url: 'https://www.room-e.com/1002',
    browser: 'chrome',
    joinedAt: '2025-04-24',
  },
  {
    nickname: '구름이',
    email: 'test02@naver.com',
    lastActive: '오늘, PM 04:20',
    url: 'https://www.room-e.com/1002',
    browser: 'chrome',
    joinedAt: '2025-04-24',
  },
  {
    nickname: '구름이',
    email: 'test02@naver.com',
    lastActive: '오늘, PM 04:20',
    url: 'https://www.room-e.com/1002',
    browser: 'chrome',
    joinedAt: '2025-04-24',
  },
  {
    nickname: '구름이',
    email: 'test02@naver.com',
    lastActive: '오늘, PM 04:20',
    url: 'https://www.room-e.com/1002',
    browser: 'chrome',
    joinedAt: '2025-04-24',
  },
]
