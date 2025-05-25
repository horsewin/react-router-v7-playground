import {
  Bell,
  CheckCircle,
  Info,
  AlertTriangle,
  XCircle,
  X
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { useNotifications } from "~/contexts/notificationProvider";
import type { Notification, NotificationsResponse } from "~/types/notification";
import type { Route } from "./+types/notifications";
import { config } from "~/lib/config";
import {
  convertServerNotificationsToClient,
  SAMPLE_NOTIFICATIONS
} from "~/lib/notifications";

// サーバーから通知データを取得
export async function loader() {
  try {
    const response = await fetch(
      `${config.api.schema}${config.api.backendUrl}/v1/notifications`
    );

    if (response.ok) {
      const data: NotificationsResponse = await response.json();
      const notifications = convertServerNotificationsToClient(data.data);
      return { notifications, total: notifications.length };
    } else {
      console.warn(`API Error: ${response.status} ${response.statusText}`);
      return {
        notifications: SAMPLE_NOTIFICATIONS,
        total: SAMPLE_NOTIFICATIONS.length
      };
    }
  } catch (error) {
    console.warn("Failed to fetch notifications from server:", error);
    console.warn("Falling back to sample data");
    return {
      notifications: SAMPLE_NOTIFICATIONS,
      total: SAMPLE_NOTIFICATIONS.length
    };
  }
}

function NotificationListItem({
  notification
}: {
  notification: Notification;
}) {
  const { markAsRead, removeNotification } = useNotifications();

  const getIcon = () => {
    switch (notification.type) {
      case "reservation":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "new":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "price_change":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "campaign":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getBadgeVariant = () => {
    switch (notification.type) {
      case "reservation":
        return "default";
      case "new":
        return "destructive";
      case "price_change":
        return "secondary";
      default:
        return "outline";
    }
  };

  const handleClick = () => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeNotification(notification.id);
  };

  const timeAgo = formatDistanceToNow(notification.timestamp, {
    addSuffix: true,
    locale: ja
  });

  return (
    <Card
      className={`
        cursor-pointer transition-all hover:shadow-md
        ${
          !notification.isRead
            ? "border-l-4 border-l-blue-400 bg-blue-50/50"
            : ""
        }
      `}
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="mt-1">{getIcon()}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3
                  className={`text-lg font-medium ${
                    !notification.isRead ? "font-semibold" : ""
                  }`}
                >
                  {notification.title}
                </h3>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
                <Badge variant={getBadgeVariant()} className="text-xs">
                  {notification.type === "new" && "新規追加"}
                  {notification.type === "reservation" && "予約完了"}
                  {notification.type === "price_change" && "価格変更"}
                  {notification.type === "campaign" && "キャンペーン"}
                </Badge>
              </div>
              <p className="text-gray-700 mb-3">{notification.message}</p>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span>{timeAgo}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function NotificationsPage({
  loaderData
}: Route.ComponentProps) {
  // サーバーから取得した通知データを使用
  const serverNotifications = loaderData?.notifications || [];
  const total = loaderData?.total || 0;

  // クライアント側の通知管理機能も使用
  const { markAllAsRead, clearAllNotifications } = useNotifications();

  const notifications = serverNotifications;
  const unreadCount = notifications.filter(
    (n: Notification) => !n.isRead
  ).length;
  const hasNotifications = notifications.length > 0;
  const hasUnread = unreadCount > 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">通知</h1>
              <p className="text-gray-600 mt-1">
                {hasUnread
                  ? `${unreadCount}件の未読通知があります (全${total}件)`
                  : `すべての通知を確認済みです (全${total}件)`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hasUnread && (
              <Button
                variant="outline"
                onClick={markAllAsRead}
                className="flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                すべて既読にする
              </Button>
            )}
            {hasNotifications && (
              <Button
                variant="destructive"
                onClick={clearAllNotifications}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                すべて削除
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {!hasNotifications ? (
          <Card className="text-center py-12">
            <CardContent>
              <Bell className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">
                通知はありません
              </h2>
              <p className="text-gray-500">
                新しい通知が届くとここに表示されます
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {hasUnread && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  未読の通知 ({unreadCount}件)
                </h2>
                <div className="space-y-3">
                  {notifications
                    .filter((n: Notification) => !n.isRead)
                    .map((notification: Notification) => (
                      <NotificationListItem
                        key={notification.id}
                        notification={notification}
                      />
                    ))}
                </div>
              </div>
            )}

            {notifications.some((n: Notification) => n.isRead) && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  既読の通知
                </h2>
                <div className="space-y-3">
                  {notifications
                    .filter((n: Notification) => n.isRead)
                    .map((notification: Notification) => (
                      <NotificationListItem
                        key={notification.id}
                        notification={notification}
                      />
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
