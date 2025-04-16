import { useEffect, useState } from "react";

interface InstagramProfile {
  id: string;
  username: string;
  name: string;
  profile_picture_url?: string;
  biography?: string;
  website?: string;
  followers_count: number;
  follows_count: number;
  media_count: number;
}

export function useProfileHeader() {
  const [instagramProfile, setInstagramProfile] =
    useState<InstagramProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchInstagramProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/instagram/profile");

      if (!response.ok) {
        //const errorData = await response.json();
        //console.error("Error fetching Instagram profile:", errorData);
        setError("Failed to fetch Instagram profile data.");
      } else {
        const data: InstagramProfile = await response.json();
        setInstagramProfile(data);
      }
    } catch (error: any) {
      //console.error("Error fetching Instagram profile:", error);
      setError("Failed to fetch Instagram profile data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstagramProfile();
  }, []);

  return { instagramProfile, loading, error, retry: fetchInstagramProfile };
}
