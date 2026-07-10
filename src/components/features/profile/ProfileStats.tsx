"use client";

import { useEffect, useState } from "react";
import { ReviewsService } from "@/services/reviews.service";
import { useAuth } from "@/hooks/useAuth";

const ProfileStats = () => {
  const { accessToken } = useAuth();

  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    async function load() {
      if (!accessToken) return;

      const response = await ReviewsService.findMyReviews(accessToken, 1, 1);

      setTotalReviews(response.meta.total);
    }

    load();
  }, [accessToken]);

  return (
    <div className="rounded-2xl bg-black/30 p-6 border border-yellow-600/20">
      <h2 className="text-xl font-bold mb-5">Estadísticas</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Comentarios</span>

          <span className="font-bold text-yellow-400">{totalReviews}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
