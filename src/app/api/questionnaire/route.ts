import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { NextResponse, type NextRequest } from "next/server";
import { database } from "@/firebase/config";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("user-id");
    const q = query(collection(database, "cities"), where("created_by", "==", userId));
    console.log({ userId });
    const questionnaireData = await getDocs(
      collection(database, "questionnaires")
    );
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
    console.log({ searchParams });

    const payload = await req.json();
    const questionnaireData = await addDoc(
      collection(database, "questionnaires"),
      {
        ...payload,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: userId,
      }
    );

    return NextResponse.json({
      message: "Questionnaire added to completed tasks successfully👍",
      data: {
        id: questionnaireData.id,
        ...payload,
      }, // Return the unique key generated for the new task
    });
  } catch (error) {
    return NextResponse.error();
  }
}
