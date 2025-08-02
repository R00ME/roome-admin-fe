import { AlertDialog } from '@/components/ui/alert-dialog';
import { useCallback, memo } from 'react';
import { ModalHeader, ModalFooter, ModalContent } from '@/components/modal';
import { Label, CheckList } from '@/components/form';
import type {
  AdminInviteRequest,
  AdminRole,
  AdminModalProps,
} from '@/types/admins';
import { useAdminInviteForm } from '@/hooks/useAdminInviteForm';
import {
  AdminTypeSelector,
  NameInput,
  EmailInput,
  PhoneInput,
} from '@/components/form/AdminFormFields';
import { ADMIN_PERMISSIONS } from '@/constants/admins';

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

// 입력 폼 영역
const InputFormSection = memo(
  ({
    adminData,
    onDataChange,
  }: {
    adminData: AdminInviteRequest;
    onDataChange: (data: Partial<AdminInviteRequest>) => void;
  }) => {
    return (
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
    );
  },
);

// 권한 설정 영역
const PermissionSection = memo(({ role }: { role: AdminRole }) => {
  return <PermissionSettings role={role} />;
});

// 모달 폼 컴포넌트
const AdminForm = memo(
  ({
    adminData,
    onDataChange,
    onSubmit,
    error,
  }: {
    adminData: AdminInviteRequest;
    onDataChange: (data: Partial<AdminInviteRequest>) => void;
    onSubmit: () => void;
    error?: string;
  }) => {
    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
      },
      [onSubmit],
    );

    return (
      <form onSubmit={handleSubmit}>
        {error && (
          <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-md'>
            <p className='text-red-600 text-sm'>{error}</p>
          </div>
        )}

        <div className='grid grid-cols-2 gap-8 mb-6'>
          <InputFormSection
            adminData={adminData}
            onDataChange={onDataChange}
          />
          <PermissionSection role={adminData.adminRole} />
        </div>
        <ModalFooter
          cancelText='취소'
          confirmText='초대하기'
        />
      </form>
    );
  },
);

// 메인 모달 컴포넌트
const AdminModal = memo(({ open, onOpenChange, onInvite }: AdminModalProps) => {
  const { adminData, error, handleDataChange, handleSubmit, resetForm } =
    useAdminInviteForm(onInvite);

  const handleClose = useCallback(() => {
    resetForm();
    onOpenChange(false);
  }, [resetForm, onOpenChange]);

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
          error={error}
        />
      </ModalContent>
    </AlertDialog>
  );
});

export default AdminModal;
