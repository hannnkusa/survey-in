import { getDoc, setDoc, doc } from "firebase/firestore";
import { database } from "@/firebase/config";
import dayjs from "dayjs";
import indonesia from "dayjs/locale/id";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const userData = await getDoc(doc(database, "users", id as string));
    return Response.json(userData.data());
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch user detail" },
      { status: 400 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dayjs.locale(indonesia);
    const { id } = params;

    const userData = await getDoc(doc(database, "users", id as string));

    const payload = {
      ...(await req.json()),
      updated_at: userData.data() ? dayjs().toISOString() : null,
      created_at: userData.data()
        ? userData.data()?.created_at
        : dayjs().toISOString(),
    };

    await setDoc(doc(database, "users", id as string), payload);

    return Response.json({
      message: "User updated successfully👍",
      data: {
        id,
        ...payload,
      }, // Return the unique key generated for the new task
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update user detail" },
      { status: 400 }
    );
  }
}
