"use client";

import { useEffect, useState } from "react";
import PasswordInput from "../ui/PasswordInput";

type Props = {
  open: boolean;
  loading: boolean;

  onCancel: () => void;

  onSubmit: (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) => Promise<void>;
};

const ChangePasswordModal = ({ open, loading, onCancel, onSubmit }: Props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!open) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    await onSubmit(currentPassword, newPassword, confirmPassword);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-2xl bg-zinc-900 p-6 shadow-2xl"
      >
        <h2 className="text-2xl font-bold">Cambiar contraseña</h2>

        <div className="mt-6 space-y-4">
          <PasswordInput
            value={currentPassword}
            onChange={setCurrentPassword}
            visible={showCurrent}
            toggle={() => setShowCurrent(!showCurrent)}
            placeholder="Contraseña actual"
          />

          <PasswordInput
            value={newPassword}
            onChange={setNewPassword}
            visible={showNew}
            toggle={() => setShowNew(!showNew)}
            placeholder="Nueva contraseña"
          />

          <PasswordInput
            value={confirmPassword}
            onChange={setConfirmPassword}
            visible={showConfirm}
            toggle={() => setShowConfirm(!showConfirm)}
            placeholder="Confirmar contraseña"
          />
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-gray-600 px-5 py-2 hover:bg-gray-700 cursor-pointer"
          >
            Cancelar
          </button>

          <button
            disabled={loading}
            className="rounded-full bg-yellow-500 px-5 py-2 font-semibold text-black hover:bg-yellow-400 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Actualizando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordModal;
