import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  const accessToken = token?.accessToken;
  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,comments_count,like_count,username&access_token=${accessToken}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user feed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (_error) {
    //console.error("Error fetching Instagram feed:", error);
    return NextResponse.json(
      { error: "Failed to fetch user feed" },
      { status: 500 }
    );
  }
}
