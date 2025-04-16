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
      `https://graph.instagram.com/me?fields=id,username,name,profile_picture_url,biography,website,followers_count,follows_count,media_count&access_token=${accessToken}`
    );

    if (!response.ok) {
      //const errorData = await response.json();
      //console.error("Error fetching Instagram profile from server:", errorData);
      return NextResponse.json(
        { error: "Failed to fetch Instagram profile data from Instagram." },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    //console.error("Error during Instagram profile fetch on server:", error);
    return NextResponse.json(
      { error: "Internal server error while fetching Instagram profile." },
      { status: 500 }
    );
  }
}
