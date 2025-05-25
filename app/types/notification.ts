// クライアント側で使用する通知型
export type Notification = {
  id: string;
  title: string;
  message: string;
  type: "reservation" | "new" | "price_change" | "campaign";
  isRead: boolean;
  timestamp: Date;
  relatedPetId?: string;
  relatedPetName?: string;
};

// サーバーから取得する通知型（snake_case）
export type ServerNotification = {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  updated_at: string; // ISO string format
  related_pet_id?: string;
  related_pet_name?: string;
};

// API レスポンス型
export type NotificationsResponse = {
  data: ServerNotification[];
  total: number;
};

export type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp" | "isRead">
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
};
