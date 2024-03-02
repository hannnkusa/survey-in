import { ref, getDownloadURL } from "firebase/storage";
import { database, storage } from "@/firebase/config";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const url = await getDownloadURL(ref(storage, id));

    return Response.json(url);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch notification list" },
      { status: 400 }
    );
  }
}
