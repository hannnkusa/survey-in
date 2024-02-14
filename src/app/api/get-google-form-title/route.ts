import { NextResponse, type NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

export const dynamicParams = true // true | false,

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const url = searchParams.get("url");

    if (!!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 422 });
    }

    // Fetch the Google Form response
    const response = await fetch(url as string);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(
        `Failed to fetch Google Form response: ${response.statusText}`
      );
    }

    // Read the response body as text
    const responseData = await response.text();

    // Extract the title from the HTML response
    const titleMatch = responseData.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : "Form Title Not Found";

    return NextResponse.json({
      message: "Successfully retrieved Google Form",
      data: {
        url: url,
        title: title,
      },
    });
  } catch (error) {
    console.error("Error fetching Google Form response:", error);
    return NextResponse.error();
  }
}
