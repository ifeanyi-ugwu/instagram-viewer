"use client";

import { Instagram } from "@/components/svgs/instagram";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginButton() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (session) {
      router.push("/profile");
    } else {
      signIn("instagram", { callbackUrl: "/profile" });
    }
  };

  return (
    <Button
      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-md hover:shadow-lg px-6 py-6 h-auto"
      size="lg"
      onClick={handleClick}
    >
      <div className="flex items-center">
        <div className="bg-white rounded-full p-1 mr-3">
          <Instagram className="h-5 w-5 text-pink-500" />
        </div>
        <span className="text-base font-medium">
          {session ? "Go to Profile" : "Login with Instagram"}
        </span>
      </div>
    </Button>
  );
}
