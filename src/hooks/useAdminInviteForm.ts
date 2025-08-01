import { useState, useCallback } from 'react';
import type { AdminInviteRequest } from '@/types/admins';
import { getAdminInviteFormError } from '@/lib/adminValidation';

// 초기 폼 데이터
const INITIAL_FORM_DATA: AdminInviteRequest = {
  adminRole: 'SYSTEM_MANAGER',
  adminName: '',
  adminEmail: '',
  phoneNumber: '',
};

/**
 * 운영자 초대 폼 상태 관리 훅
 */
export const useAdminInviteForm = (
  onInvite?: (data: AdminInviteRequest) => Promise<void>,
) => {
  const [adminData, setAdminData] =
    useState<AdminInviteRequest>(INITIAL_FORM_DATA);
  const [error, setError] = useState<string>('');

  const handleDataChange = useCallback(
    (data: Partial<AdminInviteRequest>) => {
      setAdminData((prev) => ({ ...prev, ...data }));
      // 에러가 있으면 입력 시 에러 메시지 제거
      if (error) setError('');
    },
    [error],
  );

  const resetForm = useCallback(() => {
    setAdminData(INITIAL_FORM_DATA);
    setError('');
  }, []);

  const handleSubmit = useCallback(async () => {
    const validationError = getAdminInviteFormError(adminData);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!onInvite) return;

    try {
      await onInvite(adminData);
      resetForm();
    } catch {
      setError('초대 중 오류가 발생했습니다.');
    }
  }, [adminData, onInvite, resetForm]);

  return {
    adminData,
    error,
    handleDataChange,
    handleSubmit,
    resetForm,
  };
};
