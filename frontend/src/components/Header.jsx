import useAuthStore from "../store/authStore";
import NotificationBell from "./NotificationBell";

export default function Header() {
  const user = useAuthStore((state) => state.user);

  const roleLabel = {
    admin: "Administrador",
    technician: "Técnico",
  };

  return (
    <header
      className="
        bg-white
        px-6
        h-16
        flex
        items-center
        justify-between
      "
    >
      <h1
        className="
          font-semibold
          text-lg
        "
      >
        Panel Administrativo
      </h1>

      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <NotificationBell />
        <div
          className="
            h-10
            w-10
            rounded-full
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            font-semibold
          "
        >
          {user?.name?.charAt(0)}
        </div>

        <div>
          <p
            className="
              font-medium
            "
          >
            {user?.name}
          </p>

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            {roleLabel[user?.role]}
          </p>
        </div>
      </div>
    </header>
  );
}
