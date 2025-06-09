import { AlertDialog } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { memo, useState, useCallback } from 'react';
import { ModalHeader, ModalFooter, ModalContent } from '@/components/modal';
import { Label, RadioCard, CheckList } from '@/components/form';

interface Permission {
  text: string;
  description?: string;
}

const initialState: AdminData = {
  name: '',
  email: '',
  role: 'operation',
  permissions: [],
};

const ADMIN_TYPES = [
  { value: 'operation', label: '운영 관리자' },
  { value: 'system', label: '시스템 관리자' },
];

const ADMIN_PERMISSIONS: Record<'operation' | 'system', Permission[]> = {
  operation: [
    { text: '운영 기능 사용 가능', description: '관리자 타입 지정' },
    { text: '서비스 사용성 분석 대시보드 사용 가능' },
    { text: '사용자 분석 대시보드 사용 가능' },
  ],
  system: [{ text: '시스템 대시보드 사용 가능' }],
};

// 관리자 타입 선택 컴포넌트
const AdminTypeSelector = memo(
  ({
    selectedRole,
    onRoleChange,
  }: {
    selectedRole: 'operation' | 'system';
    onRoleChange: (role: 'operation' | 'system') => void;
  }) => {
    const handleChange = useCallback(
      (value: string) => {
        if (value === 'operation' || value === 'system') {
          onRoleChange(value);
        }
      },
      [onRoleChange],
    );

    return (
      <div>
        <Label>관리자 타입 지정</Label>
        <div className='mt-3'>
          <RadioCard
            options={ADMIN_TYPES}
            value={selectedRole}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  },
);

// 이름 입력 컴포넌트
const NameInput = memo(
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
          name='name'
          placeholder='운영자로 초대할 팀원의 이름을 입력하세요'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className='mt-1'
        />
      </div>
    );
  },
);

// 이메일 입력 컴포넌트
const EmailInput = memo(
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
          name='email'
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

// 권한 설정 컴포넌트
const PermissionSettings = memo(
  ({ role }: { role: 'operation' | 'system' }) => {
    const permissions = ADMIN_PERMISSIONS[role];

    return (
      <div>
        <Label>
          {role === 'operation' ? '운영 관리자' : '시스템 관리자'}의 권한
        </Label>
        <div className='mt-3'>
          <CheckList items={permissions} />
        </div>
      </div>
    );
  },
);

// 모달 폼 컴포넌트
const AdminForm = memo(
  ({
    adminData,
    onDataChange,
  }: {
    adminData: AdminData;
    onDataChange: (data: Partial<AdminData>) => void;
  }) => {
    return (
      <form>
        <div className='grid grid-cols-2 gap-8 mb-6'>
          <div className='space-y-4'>
            <AdminTypeSelector
              selectedRole={adminData.role}
              onRoleChange={(role) => onDataChange({ role })}
            />
            <NameInput
              value={adminData.name}
              onChange={(name) => onDataChange({ name })}
            />
            <EmailInput
              value={adminData.email}
              onChange={(email) => onDataChange({ email })}
            />
          </div>

          <PermissionSettings role={adminData.role} />
        </div>
        <ModalFooter
          cancelText='취소'
          confirmText='초대하기'
        />
      </form>
    );
  },
);

const AdminModal = ({ open, onOpenChange }: AdminModalProps) => {
  const [adminData, setAdminData] = useState<AdminData>(initialState);

  const handleDataChange = useCallback((data: Partial<AdminData>) => {
    setAdminData((prev) => ({ ...prev, ...data }));
  }, []);

  const handleClose = useCallback(() => {
    setAdminData(initialState);
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <AlertDialog
      open={open}
      onOpenChange={handleClose}>
      <ModalContent>
        <ModalHeader title='운영자 초대' />
        <AdminForm
          adminData={adminData}
          onDataChange={handleDataChange}
        />
      </ModalContent>
    </AlertDialog>
  );
};

export default memo(AdminModal);
