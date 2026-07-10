"use client";

import { useAuth } from "@/hooks/useAuth";

const ProfileInfo = () => {
  const { user } = useAuth();

  return (
    <div className="rounded-2xl bg-black/30 p-6 border border-yellow-600/20">
      <h2 className="text-xl font-bold mb-5">Información</h2>

      <div className="space-y-4">
        <div>
          <p className="text-gray-400 text-sm">Usuario</p>

          <p>{user?.username}</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Email</p>

          <p>{user?.email}</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Rol</p>

          <p>{user?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
