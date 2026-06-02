import useAuthStore
  from "../store/authStore";

export default function Header() {

  const user =
    useAuthStore(
      state => state.user
    );

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
            {user?.role}
          </p>
        </div>
      </div>
    </header>
  );
}