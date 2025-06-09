import { AlertDialog } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { memo, useState, useCallback } from 'react';
import { ModalHeader, ModalFooter, ModalContent } from '@/components/modal';

type AdminModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

interface AdminData {
  name: string;
  email: string;
  role: 'operation' | 'system';
  permissions: string[];
}

const initialState: AdminData = {
  name: '',
  email: '',
  role: 'operation',
  permissions: [],
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
    return (
      <div className='col-span-2'>
        <label className='block text-sm font-regular mb-3 text-gray-600'>
          관리자 타입 지정
        </label>
        <div className='flex gap-4'>
          <div
            className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedRole === 'operation'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onRoleChange('operation')}>
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                selectedRole === 'operation'
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
              {selectedRole === 'operation' && (
                <div className='w-2 h-2 bg-white rounded-full m-0.5'></div>
              )}
            </div>
            <span className='font-medium'>운영 관리자</span>
          </div>

          <div
            className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedRole === 'system'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onRoleChange('system')}>
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                selectedRole === 'system'
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
              {selectedRole === 'system' && (
                <div className='w-2 h-2 bg-white rounded-full m-0.5'></div>
              )}
            </div>
            <span className='font-medium'>시스템 관리자</span>
          </div>
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
        <label className='block text-sm font-regular mb-1 text-gray-600'>
          이름
        </label>
        <Input
          name='name'
          placeholder='관리자 이름을 입력하세요'
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
        <label className='block text-sm font-regular mb-1 text-gray-600'>
          이메일
        </label>
        <Input
          name='email'
          type='email'
          placeholder='관리자 이메일을 입력하세요'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  },
);

// 권한 설정 컴포넌트
const PermissionSettings = memo(() => {
  return (
    <div className='col-span-2'>
      <label className='block text-sm font-regular mb-3 text-gray-600'>
        시스템 관리자의 권한
      </label>
      <div className='space-y-3'>
        <div className='flex items-center gap-3'>
          <div className='w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center'>
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'>
              <path
                d='M2 6L5 9L10 3'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <span className='text-sm'>운영 기능 사용 가능</span>
          <span className='text-xs text-gray-500 ml-auto'>
            관리자 타입 지정
          </span>
        </div>

        <div className='flex items-center gap-3'>
          <div className='w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center'>
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'>
              <path
                d='M2 6L5 9L10 3'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <span className='text-sm'>서비스 사용량 분석 대시보드 사용 가능</span>
        </div>

        <div className='flex items-center gap-3'>
          <div className='w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center'>
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'>
              <path
                d='M2 6L5 9L10 3'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <span className='text-sm'>사용량 분석 대시보드 사용 가능</span>
        </div>
      </div>
    </div>
  );
});

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
        <div className='grid grid-cols-2 gap-4 mb-6'>
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

          <PermissionSettings />
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
