import { getAuth } from "firebase-admin/auth";
import { collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import { NextResponse, type NextRequest } from "next/server";
import { customInitApp } from "@/firebase-admin/config";
import { database } from "@/firebase/config";
import dayjs from "dayjs";
import id from "dayjs/locale/id";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { displayName } = await req.json();
    const { id } = params;

    getAuth().updateUser(id, {
      displayName: displayName,
    });

    return Response.json({
      message: "User updated successfully👍",
      data: {
        id,
        displayName,
      }, // Return the unique key generated for the new task
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update user detail" },
      { status: 400 }
    );
  }
}
