import { useEffect, useRef, useState, useCallback } from 'react';
import { subscribeToNotifications } from '@/apis/notification';
import { useNotificationRefactored } from './useNotificationRefactored';
import { useUserStore } from '@/store/useUserStore';
import { toast } from 'sonner';
import { showErrorToast, showInfoToast } from '@/lib/toast';

export const useNotificationSSE = () => {
  const eventSourceRef = useRef<EventSource | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [hasShownConnectionError, setHasShownConnectionError] = useState(false);
  const { refreshAllData } = useNotificationRefactored();
  const { user } = useUserStore();

  // refreshAllData를 useCallback으로 안정화
  const stableRefreshAllData = useCallback(() => {
    refreshAllData();
  }, [refreshAllData]);

  useEffect(() => {
    if (!user?.adminId) {
      console.log('SSE: user.adminId가 없습니다:', user);
      return;
    }

    console.log('SSE: 연결 시작, adminId:', user.adminId);

    // 기존 연결이 있으면 닫기
    if (eventSourceRef.current) {
      console.log('SSE: 기존 연결 닫기');
      eventSourceRef.current.close();
    }

    // 새 SSE 연결 생성
    const eventSource = subscribeToNotifications(user.adminId);
    eventSourceRef.current = eventSource;

    console.log('SSE: EventSource 생성됨:', eventSource);

    // 알림 수신 이벤트 리스너
    eventSource.addEventListener('notification', (event) => {
      try {
        const notificationData = JSON.parse(event.data);
        console.log('새 알림 수신:', notificationData);

        // 데이터 새로고침
        stableRefreshAllData();

        // 토스트 알림 표시 - 새로운 알림 도착 메시지
        showInfoToast(
          '새로운 알림이 도착했습니다',
          notificationData.notificationContent,
        );
      } catch (error) {
        console.error('알림 데이터 파싱 실패:', error);
      }
    });

    // 연결 상태 변경 이벤트
    eventSource.onopen = () => {
      console.log('SSE: 연결 성공!');
      setIsConnected(true);
      setHasShownConnectionError(false); // 연결 성공시 에러 플래그 리셋
    };

    // 연결 오류 처리
    eventSource.onerror = (error) => {
      console.error('SSE 연결 오류:', error);
      console.log('SSE: readyState:', eventSource.readyState);
      setIsConnected(false);

      // 연결 실패시 토스트 피드백 (일회성)
      if (!hasShownConnectionError) {
        showErrorToast(
          '알림 연결에 실패했습니다',
          '실시간 알림을 받을 수 없습니다. 페이지를 새로고침해주세요.',
        );
        setHasShownConnectionError(true);
      }
    };

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (eventSourceRef.current) {
        console.log('SSE: 연결 해제');
        eventSourceRef.current.close();
        eventSourceRef.current = null;
        setIsConnected(false);
      }
    };
  }, [user?.adminId, stableRefreshAllData, hasShownConnectionError]);

  return {
    isConnected,
  };
};
