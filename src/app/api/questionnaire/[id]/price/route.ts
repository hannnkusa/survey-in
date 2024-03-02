import { updateDoc, doc, collection, addDoc, getDoc } from "firebase/firestore";
import { database } from "@/firebase/config";
import dayjs from "dayjs";
import { NextResponse, type NextRequest } from "next/server";

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

    const questionnaireData = await getDoc(
      doc(database, "questionnaires", id as string)
    );

    await addDoc(collection(database, "notifications"), {
      title: "Questionnaire Price Updated",
      description: "Questionnaire price updated by Super Admin",
      url: `/questionnaire/${id}`,
      target: questionnaireData?.data()?.created_by,
      created_at: dayjs().toISOString(),
      updated_at: null,
      deleted_at: null,
      readed: false,
    });

    return Response.json({
      message: "Questionnaire price updated successfully👍",
      data: {
        id,
        ...payload,
      }, // Return the unique key generated for the new task
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update questionnaire price" },
      { status: 400 }
    );
  }
}
