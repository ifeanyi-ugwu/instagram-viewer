import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ mediaId: string }> }
) {
  const token = await getToken({ req: request });

  const accessToken = token?.accessToken;
  const { mediaId } = await params;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    /*const response = await fetch(
      `https://graph.instagram.com/${mediaId}/comments?fields=id,text,timestamp,from{id,username},replies{id,text,timestamp,from{id,username}},parent_id&access_token=${accessToken}`
    );*/

    const response = await fetch(
      `https://graph.instagram.com/${mediaId}/comments?fields=id,text,timestamp,from{id,username},parent_id&limit=100&access_token=${accessToken}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch comments" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    //console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ mediaId: string }> }
) {
  const token = await getToken({ req: request });
  const accessToken = token?.accessToken;
  const { mediaId } = await params;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const message = data.message;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://graph.instagram.com/${mediaId}/comments?access_token=${accessToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      //console.error("Error posting comment:", errorData);
      return NextResponse.json(
        { error: "Failed to post comment", details: errorData },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    return NextResponse.json({ success: true, id: responseData.id });
  } catch (error) {
    //console.error("Error posting comment:", error);
    return NextResponse.json(
      { error: "Failed to post comment" },
      { status: 500 }
    );
  }
}
