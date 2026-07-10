"use client";

type Props = {
  open: boolean;
  loading?: boolean;

  title: string;
  message: string;

  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDeleteModal({
  open,
  loading,
  title,
  message,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-zinc-900 p-6">
        <h2 className="text-2xl font-bold text-red-400">{title}</h2>

        <p className="mt-4 text-gray-300">
          {message}
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-zinc-700 px-5 py-2 hover:bg-zinc-800 transition cursor-pointer"
          >
            Cancelar
          </button>

          <button
            disabled={loading}
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-5 py-2 font-semibold hover:bg-red-500 transition disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}
