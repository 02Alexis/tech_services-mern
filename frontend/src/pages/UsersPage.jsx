import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getUsers,
  deleteUser,
  createUser,
  updateUser,
  changeRole,
} from "../features/users/users.api";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "technician",
  });

  const [editingUser, setEditingUser] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "technician",
  });

  const loadUsers = async () => {
    const data = await getUsers();

    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar usuario?")) {
      return;
    }

    await deleteUser(id);

    loadUsers();
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createUser(form);

      toast.success("Usuario creado");

      setForm({
        name: "",
        email: "",
        password: "",
        role: "technician",
      });

      setShowForm(false);

      loadUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al crear usuario");
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);

    setEditForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateUser(editingUser._id, editForm);

      toast.success("Usuario actualizado");

      setEditingUser(null);

      loadUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al actualizar");
    }
  };
  // const handleRoleChange = async (user) => {
  //   const newRole = user.role === "admin" ? "technician" : "admin";

  //   try {
  //     await changeRole(user._id, newRole);

  //     toast.success("Rol actualizado");

  //     loadUsers();
  //   } catch {
  //     toast.error("Error al cambiar rol");
  //   }
  // };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Usuarios</h1>

        <button
          onClick={() => setShowForm(true)}
          className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded-lg
            cursor-pointer
          "
        >
          Nuevo Usuario
        </button>
      </div>

      {/* crear */}
      {showForm && (
        <div
          className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
      "
        >
          <form
            onSubmit={handleCreate}
            className="
          bg-white
          rounded-xl
          p-6
          w-full
          max-w-md
          space-y-4
        "
          >
            <h2 className="text-xl font-bold">Crear Usuario</h2>

            <input
              placeholder="Nombre"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="
            w-full
            border
            p-2
            rounded
          "
              required
            />

            <input
              type="email"
              placeholder="Correo"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="
            w-full
            border
            p-2
            rounded
          "
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="
            w-full
            border
            p-2
            rounded
          "
              required
            />

            <select
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.value,
                })
              }
              className="
            w-full
            border
            p-2
            rounded
          "
            >
              <option value="technician">Técnico</option>

              <option value="admin">Administrador</option>
            </select>

            <div className="flex gap-2">
              <button
                type="submit"
                className="
              bg-blue-600
              text-white
              px-4
              py-2
              rounded
            "
              >
                Guardar
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="
              border
              px-4
              py-2
              rounded
            "
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* editar  */}
      {editingUser && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            flex
            items-center
            justify-center
            z-50
          "
        >
          <form
            onSubmit={handleUpdate}
            className="
              bg-white
              p-6
              rounded-xl
              w-full
              max-w-md
              space-y-4
            "
          >
            <h2 className="text-xl font-bold">Editar Usuario</h2>

            <input
              value={editForm.name}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  name: e.target.value,
                })
              }
              className="w-full border p-2 rounded"
            />

            <input
              value={editForm.email}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  email: e.target.value,
                })
              }
              className="w-full border p-2 rounded"
            />

            <input
              type="password"
              placeholder="Nueva contraseña (opcional)"
              value={editForm.password}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  password: e.target.value,
                })
              }
              className="w-full border p-2 rounded"
            />

            <select
              value={editForm.role}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  role: e.target.value,
                })
              }
              className="w-full border p-2 rounded"
            >
              <option value="technician">Técnico</option>

              <option value="admin">Administrador</option>
            </select>

            <div className="flex gap-2">
              <button
                type="submit"
                className="
                bg-blue-600
                text-white
                px-4
                py-2
                rounded
              "
              >
                Guardar
              </button>

              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="
                border
                px-4
                py-2
                rounded
              "
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          bg-white
          rounded-2xl
          shadow-md
          overflow-hidden
          border
        "
      >
        <table className="w-full">
          <thead>
            <tr
              className="
                bg-slate-100
                text-slate-700
              "
            >
              <th className="p-4 text-left">Nombre</th>

              <th className="p-4 text-left">Correo</th>

              <th className="p-4 text-center">Rol</th>

              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t"
              >
                <td className="p-4 font-medium">{user.name}</td>

                <td className="p-4 text-slate-600">{user.email}</td>

                <td className="p-4 text-center">
                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                      ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }
                    `}
                  >
                    {user.role === "admin" ? "Administrador" : "Técnico"}
                  </span>
                </td>

                <td className="p-4">
                  <div
                    className="
                      flex
                      justify-center
                      gap-2 
                    "
                  >
                    <button
                      onClick={() => handleEditClick(user)}
                      className="
                        px-3
                        py-1
                        rounded-lg
                        bg-blue-100
                        text-blue-700
                        hover:bg-blue-200
                        transition
                        cursor-pointer
                      "
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="
                  px-3
                  py-1
                  rounded-lg
                  bg-red-100
                  text-red-700
                  hover:bg-red-200
                  transition
                  cursor-pointer
                "
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default UsersPage;
