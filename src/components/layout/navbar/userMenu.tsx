"use client";

import ChangePasswordModal from "@/components/modal/ChangePasswordModal";
import ConfirmDeleteModal from "@/components/modal/ConfirmDeleteModal";
import { useAuth } from "@/hooks/useAuth";
import { UserService } from "@/services/user.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";

const UserMenu = () => {
  const { user, accessToken, logout, deleteAccount } = useAuth();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [openPassword, setOpenPassword] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  async function handleLogout() {
    try {
      await logout();

      router.replace("/");
    } catch {
      toast.error("No se pudo cerrar la sesión");
    }
  }

  async function handleDeleteAccount() {
    if (!accessToken) return;

    try {
      setLoadingDelete(true);

      await deleteAccount();

      toast.success("La cuenta fue eliminada correctamente.");

      router.replace("/");
    } catch {
      toast.error("No fue posible eliminar la cuenta.");
    } finally {
      setLoadingDelete(false);
      setOpenDelete(false);
    }
  }

  async function handleChangePassword(
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    if (!accessToken) return;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Completa todos los campos");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoadingPassword(true);

      await UserService.changePassword(accessToken, {
        currentPassword,
        newPassword,
      });

      toast.success("Contraseña actualizada");

      setOpenPassword(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoadingPassword(false);
    }
  }

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-full border border-yellow-500/40 bg-black/30 px-3 py-2 transition hover:bg-yellow-600/10 cursor-pointer"
        >
          <FaUserCircle size={28} className="text-yellow-400" />

          <span className="hidden md:block font-medium">{user?.username}</span>

          <FaChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-xl border border-yellow-700/30 bg-zinc-900 shadow-xl z-50">
            <div className="border-b border-yellow-700/20 px-4 py-3">
              <p className="font-semibold">{user?.username}</p>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>

            <Link
              href="/profile"
              className="block px-4 py-3 transition hover:bg-yellow-600/10"
              onClick={() => setOpen(false)}
            >
              Mi Perfil
            </Link>

            <button
              onClick={() => {
                setOpen(false);
                setOpenPassword(true);
              }}
              className="block w-full px-4 py-3 text-left transition hover:bg-yellow-600/10 cursor-pointer"
            >
              Cambiar contraseña
            </button>

            <button
              onClick={() => setOpenDelete(true)}
              className="w-full px-4 py-3 text-left text-red-400 transition hover:bg-red-900/20 cursor-pointer"
            >
              Eliminar cuenta
            </button>

            <button
              onClick={handleLogout}
              className="w-full border-t border-yellow-700/20 px-4 py-3 text-left transition hover:bg-yellow-600/10 cursor-pointer"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>

      <ConfirmDeleteModal
        title="Eliminar cuenta"
        message="¿Estás seguro de que querés eliminar tu cuenta? Esta acción es irreversible."
        open={openDelete}
        loading={loadingDelete}
        onCancel={() => setOpenDelete(false)}
        onConfirm={handleDeleteAccount}
      />

      <ChangePasswordModal
        open={openPassword}
        loading={loadingPassword}
        onCancel={() => setOpenPassword(false)}
        onSubmit={handleChangePassword}
      />
    </>
  );
};

export default UserMenu;
