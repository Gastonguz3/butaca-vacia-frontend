"use client";

import { useAuth } from "@/hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";

const ProfileHeader = () => {
  const { user } = useAuth();

  return (
    <section className="rounded-3xl bg-black/30 border border-yellow-600/20 p-8">
      <div className="flex items-center gap-6">
        <FaUserCircle size={90} className="text-yellow-400" />

        <div>
          <h1 className="text-4xl font-bold">{user?.username}</h1>

          <p className="text-gray-300 mt-2">{user?.email}</p>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
