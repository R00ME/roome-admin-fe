import { useEffect, useRef } from 'react';
import { subscribeToNotifications } from '@/apis/notification';
import { useNotificationRefactored } from './useNotificationRefactored';
import { useUserStore } from '@/store/useUserStore';
import { toast } from 'sonner';

export const useNotificationSSE = () => {
  const eventSourceRef = useRef<EventSource | null>(null);
  const { refreshAllData } = useNotificationRefactored();
  const { user } = useUserStore();

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
        refreshAllData();

        // 토스트 알림 표시
        toast.info(notificationData.notificationTitle, {
          description: notificationData.notificationContent,
          duration: 5000,
        });
      } catch (error) {
        console.error('알림 데이터 파싱 실패:', error);
      }
    });

    // 연결 상태 변경 이벤트
    eventSource.onopen = () => {
      console.log('SSE: 연결 성공!');
    };

    // 연결 오류 처리
    eventSource.onerror = (error) => {
      console.error('SSE 연결 오류:', error);
      console.log('SSE: readyState:', eventSource.readyState);
      // 재연결 로직 추가 가능
    };

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (eventSourceRef.current) {
        console.log('SSE: 연결 해제');
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [user?.adminId, refreshAllData]);

  return {
    isConnected: eventSourceRef.current?.readyState === EventSource.OPEN,
  };
};
