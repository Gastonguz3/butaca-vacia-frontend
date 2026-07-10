"use client";

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

  async function handleLogout() {
    try {
      await logout();

      toast.success("Sesión cerrada");

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

            <Link
              href="/profile/password"
              className="block px-4 py-3 transition hover:bg-yellow-600/10"
              onClick={() => setOpen(false)}
            >
              Cambiar contraseña
            </Link>

            <Link
              href="/profile/reviews"
              className="block px-4 py-3 transition hover:bg-yellow-600/10"
              onClick={() => setOpen(false)}
            >
              Mis comentarios
            </Link>

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
    </>
  );
};

export default UserMenu;
