"use client";

import { Instagram } from "@/components/svgs/instagram";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MediaComments } from "./components/media-comments";
import { ProfileHeader } from "./components/profile-header";
import { UserFeed } from "./components/user-feed";
import type { Media } from "./types";

export function Profile() {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    if (status === "authenticated" && session?.accessTokenExpiry) {
      const expiryTime = session.accessTokenExpiry * 1000;
      const currentTime = new Date().getTime();

      if (currentTime >= expiryTime) {
        console.log("Access token expired. Signing out.");
        signOut();
      }

      // set up a timer to check for expiry
      const timeUntilExpiry = expiryTime - currentTime;
      if (timeUntilExpiry > 0) {
        const timer = setTimeout(() => {
          console.log("Access token expired (timer). Signing out.");
          signOut();
        }, timeUntilExpiry);

        return () => clearTimeout(timer);
      }
    }
  }, [session, status, router]);

  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  return (
    <div className="h-screen bg-white lg:overflow-hidden">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Instagram className="text-black" />
            <span className="text-lg font-semibold">Instagram</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:flex lg:gap-8 h-[90vh] overflow-auto lg:overflow-hidden">
        <section className="mb-12 lg:w-1/2 lg:overflow-y-auto">
          <ProfileHeader />

          <div className="border-t border-gray-200 mb-4" />
          <h2 className="text-xl font-semibold mb-4">Your Feed</h2>

          <section className="py-6">
            <UserFeed onFeedClick={setSelectedMedia} />
          </section>
        </section>

        {selectedMedia ? (
          <MediaComments
            media={selectedMedia}
            onClose={() => setSelectedMedia(null)}
          />
        ) : (
          <div className="hidden lg:flex lg:w-1/2 lg:items-center lg:justify-center">
            <div className="text-center text-gray-500">
              <h3 className="font-semibold text-lg mb-2">No Media Selected</h3>
              <p className="text-sm">
                Click on a post in your feed to view its details and comments.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
