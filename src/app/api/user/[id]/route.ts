import { getDoc, setDoc, doc } from "firebase/firestore";
import { database } from "@/firebase/config";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const userData = await getDoc(doc(database, "users", id as string));
    return Response.json(userData.data());
  } catch (error: any) {
    return new Response(error, {
      status: 400,
    });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const userData = await getDoc(doc(database, "users", id as string));

    const payload = {
      ...(await req.json()),
      updated_at: userData.data() ? new Date().toISOString() : null,
      created_at: userData.data()
        ? userData.data()?.created_at
        : new Date().toISOString(),
    };

    await setDoc(doc(database, "users", id as string), payload);

    return Response.json({
      message: "User updated to completed tasks successfully👍",
      data: {
        id,
        ...payload,
      }, // Return the unique key generated for the new task
    });
  } catch (error: any) {
    return new Response(error, {
      status: 400,
    });
  }
}
