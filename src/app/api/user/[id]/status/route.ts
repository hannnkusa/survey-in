import { getAuth } from "firebase-admin/auth";
import { NextResponse, type NextRequest } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const payload = await req.json();
    const { id } = params;

    await getAuth().updateUser(id, payload);
    return Response.json({
      message: "User status updated successfully👍",
      data: {
        id,
        ...payload,
      }, // Return the unique key generated for the new task
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update user status" },
      { status: 400 }
    );
  }
}
