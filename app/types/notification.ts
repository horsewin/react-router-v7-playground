// クライアント側で使用する通知型
export type Notification = {
  id: string;
  title: string;
  message: string;
  type: "reservation" | "new" | "price_change" | "campaign";
  isRead: boolean;
  timestamp: Date;
};

// サーバーから取得する通知型（snake_case）
export type ServerNotification = {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  updated_at: string; // ISO string format
};

// API レスポンス型
export type NotificationsResponse = {
  data: ServerNotification[];
};

export type NotificationContextType = {
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
};
