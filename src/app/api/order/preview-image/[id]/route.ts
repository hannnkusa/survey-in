import { ref, getDownloadURL } from "firebase/storage";
import { database, storage } from "@/firebase/config";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const url = await getDownloadURL(ref(storage, id))

    return Response.json(url);
  } catch (error: any) {
    return new Response(error, {
      status: 400,
    });
  }
}
