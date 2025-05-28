import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode
} from "react";
import { useFetcher } from "react-router";
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
  const fetcher = useFetcher();

  const [unreadCount, setUnreadCount] = useState(0);

  const markAsRead = useCallback((id: string) => {
    // TODO: サーバー側の既読状態も更新する必要がある場合はここでAPI呼び出し
    fetcher.submit(
      {
        userId: "5",
        like: true
      },
      {
        method: "post",
        action: "/notifications/read"
      }
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    // TODO: サーバー側の既読状態も更新する必要がある場合はここでAPI呼び出し
  }, []);

  const value: NotificationContextType = {
    markAsRead,
    markAllAsRead,
    setUnreadCount,
    unreadCount
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
