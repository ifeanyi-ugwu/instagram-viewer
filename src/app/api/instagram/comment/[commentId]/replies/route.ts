import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

/*export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const token = await getToken({ req: request });
  const accessToken = token?.accessToken;
  const { commentId } = await params;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/${commentId}/replies?fields=id,text,timestamp,from{id,username}&access_token=${accessToken}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch comment replies" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch comment replies" },
      { status: 500 }
    );
  }
}*/

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const token = await getToken({ req: request });

  const accessToken = token?.accessToken;
  const { commentId } = await params;

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
      `https://graph.instagram.com/${commentId}/replies?access_token=${accessToken}`,
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
      //console.error("Error posting reply:", errorData);
      return NextResponse.json(
        { error: "Failed to post reply", details: errorData },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    return NextResponse.json({ success: true, id: responseData.id });
  } catch (error) {
    //console.error("Error posting reply:", error);
    return NextResponse.json(
      { error: "Failed to post reply" },
      { status: 500 }
    );
  }
}
