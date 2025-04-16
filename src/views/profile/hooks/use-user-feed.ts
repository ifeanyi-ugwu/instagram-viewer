import { useState, useEffect } from "react";
import { Media } from "../types";

export function useUserFeed() {
  const [feed, setFeed] = useState<Media[]>([]);
  const [feedLoading, setFeedLoading] = useState(false);
  const [feedError, setFeedError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserFeed = async () => {
      setFeedLoading(true);
      setFeedError(null);

      try {
        const response = await fetch("/api/instagram/feed");

        if (!response.ok) {
          //const errorData = await response.json();
          //console.error("Error fetching user feed:", errorData);
          setFeedError("Failed to fetch user feed.");
        } else {
          const data = await response.json();
          setFeed(data.data as Media[]);
        }
      } catch (_error) {
        //console.error("Error fetching user feed:", error);
        setFeedError("Failed to fetch user feed.");
      } finally {
        setFeedLoading(false);
      }
    };

    fetchUserFeed();
  }, []);

  return {
    feed,
    feedLoading,
    feedError,
  };
}
