import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { NextResponse, type NextRequest } from "next/server";
import { database } from "@/firebase/config";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("user-id");
    const q = query(
      collection(database, "questionnaires"),
      where("created_by", "==", userId)
    );

    const getter = userId ? q : collection(database, "questionnaires");

    const questionnaireData = await getDocs(getter);
    return NextResponse.json({
      message: "Data successfully fetched👍",
      data: questionnaireData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })),
    });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("user-id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 422 }
      );
    }

    const payload = await req.json();
    const questionnaireData = await addDoc(
      collection(database, "questionnaires"),
      {
        ...payload,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: userId,
        questionnaire_filled: 0,
        status:
          payload.segmented_type === "request-segment" ? "in review" : "draft",
      }
    );

    return NextResponse.json({
      message: "Questionnaire added successfully👍",
      data: {
        id: questionnaireData.id,
        ...payload,
      }, // Return the unique key generated for the new task
    });
  } catch (error) {
    return NextResponse.error();
  }
}
