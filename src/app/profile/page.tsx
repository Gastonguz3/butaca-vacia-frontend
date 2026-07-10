import ProfileHeader from "@/components/features/profile/ProfileHeader";
import ProfileInfo from "@/components/features/profile/ProfileInfo";
import ProfileStats from "@/components/features/profile/ProfileStats";
import UserReviews from "@/components/features/profile/UserReviews";


export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-linear-to-tr from-black via-amber-900 to-yellow-700 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">

        <ProfileHeader />

        <div className="grid gap-6 lg:grid-cols-3">

          <div className="space-y-6">
            <ProfileInfo />
            <ProfileStats />
          </div>

          <div className="lg:col-span-2">
            <UserReviews />
          </div>

        </div>

      </div>
    </main>
  );
}