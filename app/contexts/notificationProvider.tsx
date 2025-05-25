import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode
} from "react";
import type {
  Notification,
  NotificationContextType
} from "~/types/notification";

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
}

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  // サーバーから取得した通知とクライアント側で追加された通知を区別
  const [clientNotifications, setClientNotifications] = useState<
    Notification[]
  >([]);

  const unreadCount = clientNotifications.filter(n => !n.isRead).length;

  const addNotification = useCallback(
    (notificationData: Omit<Notification, "id" | "timestamp" | "isRead">) => {
      const newNotification: Notification = {
        ...notificationData,
        id: `client-${Date.now()}`, // クライアント側通知にprefixを付ける
        timestamp: new Date(),
        isRead: false
      };
      setClientNotifications(prev => [newNotification, ...prev]);
    },
    []
  );

  const markAsRead = useCallback((id: string) => {
    setClientNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
    // TODO: サーバー側の既読状態も更新する必要がある場合はここでAPI呼び出し
  }, []);

  const markAllAsRead = useCallback(() => {
    setClientNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    // TODO: サーバー側の既読状態も更新する必要がある場合はここでAPI呼び出し
  }, []);

  const removeNotification = useCallback((id: string) => {
    setClientNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
    // TODO: サーバー側の通知も削除する必要がある場合はここでAPI呼び出し
  }, []);

  const clearAllNotifications = useCallback(() => {
    setClientNotifications([]);
    // TODO: サーバー側の通知も削除する必要がある場合はここでAPI呼び出し
  }, []);

  const value: NotificationContextType = {
    notifications: clientNotifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
