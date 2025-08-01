import { AlertDialog } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { memo, useState, useCallback } from 'react';
import { ModalHeader, ModalFooter, ModalContent } from '@/components/modal';
import { Label, RadioCard, CheckList } from '@/components/form';
import type {
  AdminInviteRequest,
  AdminRole,
  AdminModalProps,
} from '@/types/admins';

import { ADMIN_PERMISSIONS, ADMIN_TYPES } from '@/constants/admins';

// 관리자 타입 선택 컴포넌트
const AdminTypeSelector = memo(
  ({
    selectedRole,
    onRoleChange,
  }: {
    selectedRole: AdminRole;
    onRoleChange: (role: AdminRole) => void;
  }) => {
    const handleChange = useCallback(
      (value: string) => {
        onRoleChange(value as AdminRole);
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

// 전화번호 입력 컴포넌트
const PhoneInput = memo(
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

// 권한 설정 컴포넌트
const PermissionSettings = memo(({ role }: { role: AdminRole }) => {
  const permissions = ADMIN_PERMISSIONS[role];

  return (
    <div>
      <Label>{role}의 권한</Label>
      <div className='mt-3'>
        <CheckList items={permissions} />
      </div>
    </div>
  );
});

// 모달 폼 컴포넌트
const AdminForm = memo(
  ({
    adminData,
    onDataChange,
    onSubmit,
  }: {
    adminData: AdminInviteRequest;
    onDataChange: (data: Partial<AdminInviteRequest>) => void;
    onSubmit: () => void;
  }) => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit();
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-8 mb-6'>
          <div className='space-y-4'>
            <AdminTypeSelector
              selectedRole={adminData.adminRole}
              onRoleChange={(role) => onDataChange({ adminRole: role })}
            />
            <NameInput
              value={adminData.adminName}
              onChange={(adminName) => onDataChange({ adminName })}
            />
            <EmailInput
              value={adminData.adminEmail}
              onChange={(adminEmail) => onDataChange({ adminEmail })}
            />
            <PhoneInput
              value={adminData.phoneNumber}
              onChange={(phoneNumber) => onDataChange({ phoneNumber })}
            />
          </div>

          <PermissionSettings role={adminData.adminRole} />
        </div>
        <ModalFooter
          cancelText='취소'
          confirmText='초대하기'
        />
      </form>
    );
  },
);

const AdminModal = ({ open, onOpenChange, onInvite }: AdminModalProps) => {
  const [adminData, setAdminData] = useState<AdminInviteRequest>({
    adminRole: 'SYSTEM_MANAGER',
    adminName: '',
    adminEmail: '',
    phoneNumber: '',
  });

  const handleDataChange = useCallback((data: Partial<AdminInviteRequest>) => {
    setAdminData((prev) => ({ ...prev, ...data }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (
      !adminData.adminName ||
      !adminData.adminEmail ||
      !adminData.phoneNumber
    ) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (!onInvite) return;

    await onInvite(adminData);
  }, [adminData, onInvite]);

  const handleClose = useCallback(() => {
    setAdminData({
      adminRole: 'SYSTEM_MANAGER',
      adminName: '',
      adminEmail: '',
      phoneNumber: '',
    });
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
          onSubmit={handleSubmit}
        />
      </ModalContent>
    </AlertDialog>
  );
};

export default memo(AdminModal);
