import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";
import { useProfileHeader } from "../hooks/use-profile-header";

export function ProfileHeader() {
  const { instagramProfile, loading, error, retry } = useProfileHeader();

  if (loading) {
    return <ProfileHeaderSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="bg-red-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
          <span className="text-red-500 text-2xl">!</span>
        </div>
        <h2 className="text-lg font-bold mb-1">Something went wrong</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          onClick={retry}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
      <div className="relative">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
          <Avatar className="w-full h-full object-cover border-2 border-white">
            <AvatarImage
              src={instagramProfile?.profile_picture_url}
              alt={instagramProfile?.username}
            />
            <AvatarFallback>
              <span className="text-2xl">
                {instagramProfile?.username.substring(0, 2).toUpperCase()}
              </span>
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <h1 className="text-xl md:text-2xl font-semibold">
            {instagramProfile?.username}
          </h1>
        </div>

        <div className="flex gap-8 mb-4">
          <div className="text-center md:text-left">
            <span className="font-semibold">
              {instagramProfile?.media_count}
            </span>
            <span className="text-gray-600 text-sm ml-1">posts</span>
          </div>
          <div className="text-center md:text-left">
            <span className="font-semibold">
              {instagramProfile?.followers_count}
            </span>
            <span className="text-gray-600 text-sm ml-1">followers</span>
          </div>
          <div className="text-center md:text-left">
            <span className="font-semibold">
              {instagramProfile?.follows_count}
            </span>
            <span className="text-gray-600 text-sm ml-1">following</span>
          </div>
        </div>

        <div className="mb-2">
          <h2 className="font-semibold">{instagramProfile?.name}</h2>
          <p className="text-sm whitespace-pre-line">
            {instagramProfile?.biography}
          </p>
        </div>

        {instagramProfile?.website && (
          <a
            href={instagramProfile.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-900 font-medium flex items-center gap-1 hover:underline"
          >
            <ExternalLink className="w-3 h-3" />
            {instagramProfile.website.replace(/(^\w+:|^)\/\//, "")}
          </a>
        )}
      </div>
    </div>
  );
}

function ProfileHeaderSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
      <div className="relative">
        <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200" />
      </div>
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <Skeleton className="h-8 bg-gray-200 rounded w-32" />
        </div>
        <div className="flex gap-8 mb-4">
          <Skeleton className="w-16 h-5 bg-gray-200 rounded" />
          <Skeleton className="w-20 h-5 bg-gray-200 rounded" />
          <Skeleton className="w-20 h-5 bg-gray-200 rounded" />
        </div>
        <div className="mb-2">
          <Skeleton className="w-32 h-5 bg-gray-200 rounded mb-2" />
          <Skeleton className="w-full max-w-md h-4 bg-gray-200 rounded mb-1" />
          <Skeleton className="w-3/4 max-w-md h-4 bg-gray-200 rounded" />
        </div>
        <Skeleton className="w-40 h-4 bg-gray-200 rounded mt-2" />
      </div>
    </div>
  );
}
