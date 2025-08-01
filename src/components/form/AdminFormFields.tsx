import { memo } from 'react';
import { Input } from '@/components/ui/input';
import { Label, RadioCard } from '@/components/form';
import type { AdminRole } from '@/types/admins';
import { ADMIN_TYPES } from '@/constants/admins';

// 관리자 타입 선택 컴포넌트
export const AdminTypeSelector = memo(
  ({
    selectedRole,
    onRoleChange,
  }: {
    selectedRole: AdminRole;
    onRoleChange: (role: AdminRole) => void;
  }) => {
    return (
      <div>
        <Label>관리자 타입 지정</Label>
        <div className='mt-3'>
          <RadioCard
            options={ADMIN_TYPES}
            value={selectedRole}
            onChange={(value) => onRoleChange(value as AdminRole)}
          />
        </div>
      </div>
    );
  },
);

// 이름 입력 필드
export const NameInput = memo(
  ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => {
    return (
      <div>
        <Label>이름</Label>
        <Input
          name='adminName'
          placeholder='운영자로 초대할 팀원의 이름을 입력하세요'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className='mt-1'
        />
      </div>
    );
  },
);

// 이메일 입력 필드
export const EmailInput = memo(
  ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => {
    return (
      <div>
        <Label>이메일</Label>
        <Input
          name='adminEmail'
          type='email'
          placeholder='초대할 팀원의 이메일을 입력하세요'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className='mt-1'
        />
      </div>
    );
  },
);

// 전화번호 입력 필드
export const PhoneInput = memo(
  ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => {
    return (
      <div>
        <Label>전화번호</Label>
        <Input
          name='phoneNumber'
          type='tel'
          placeholder='초대할 팀원의 전화번호를 입력하세요'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className='mt-1'
        />
      </div>
    );
  },
);
