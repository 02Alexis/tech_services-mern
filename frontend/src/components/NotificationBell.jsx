import { Bell } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

import useNotifications from "../features/notifications/useNotifications";

const NotificationBell = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const { notifications, handleRead } = useNotifications();

  const unread = notifications.filter((item) => !item.read).length;

  const openNotification = async (notification) => {
    await handleRead(notification._id);

    if (notification.serviceId) {
      navigate(`/services/${notification.serviceId}`);
    }

    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="
          relative
          cursor-pointer
        "
      >
        <Bell size={22} />

        {unread > 0 && (
          <span
            className="
              absolute
              -top-2
              -right-2
              bg-red-600
              text-white
              text-xs
              w-5
              h-5
              rounded-full
              flex
              items-center
              justify-center
            "
          >
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-3
            w-96
            bg-white
            rounded-xl
            border
            shadow-xl
            z-50
            max-h-[500px]
            overflow-y-auto
          "
        >
          <div
            className="
              p-4
              border-b
              font-semibold
            "
          >
            Notificaciones
          </div>

          {notifications.length === 0 ? (
            <div className="p-4 text-sm">Sin notificaciones</div>
          ) : (
            notifications.map((notification) => (
              <button
                key={notification._id}
                onClick={() => openNotification(notification)}
                className={`
                    w-full
                    text-left
                    p-4
                    border-b
                    hover:bg-slate-50
                    cursor-pointer
                    ${!notification.read ? "bg-blue-50" : ""}
                  `}
              >
                <p
                  className="
                      font-medium
                    "
                >
                  {notification.title}
                </p>

                <p
                  className="
                      text-sm
                      text-slate-600
                    "
                >
                  {notification.message}
                </p>

                <p
                  className="
                      text-xs
                      text-slate-400
                      mt-1
                    "
                >
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                    locale: es,
                  })}
                </p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
