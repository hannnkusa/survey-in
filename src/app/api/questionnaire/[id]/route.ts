import { getDoc, updateDoc, doc } from "firebase/firestore";
import { database } from "@/firebase/config";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const questionnaireData = await getDoc(
      doc(database, "questionnaires", id as string)
    );
    return Response.json(questionnaireData.data());
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch questionnaire detail" },
      { status: 400 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const payload = await req.json();
    const { id } = params;

    await updateDoc(doc(database, "questionnaires", id as string), {
      ...payload,
      updated_at: new Date().toISOString(),
    });
    return Response.json({
      message: "Questionnaire updated successfully👍",
      data: {
        id,
        ...payload,
      }, // Return the unique key generated for the new task
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update questionnaire detail" },
      { status: 400 }
    );
  }
}
