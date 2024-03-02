import { collection, getDocs, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { database } from "@/firebase/config";

export async function GET(req: Request) {
  try {
    const dataList = await getDocs(collection(database, "religions"));
    return NextResponse.json({
      message: "Data successfully fetched👍",
      data: dataList.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch religion list" },
      { status: 400 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const questionnaireData = await addDoc(
      collection(database, "religions"),
      payload
    );

    return NextResponse.json({
      message: "Religion added to completed tasks successfully👍",
      data: {
        id: questionnaireData.id,
        ...payload,
      }, // Return the unique key generated for the new task
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create religion" },
      { status: 400 }
    );
  }
}
