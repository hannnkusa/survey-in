import { collection, getDocs, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { database } from "@/firebase/config";

export async function GET(req: Request) {
  try {
    const dataList = await getDocs(collection(database, "educations"));
    return NextResponse.json({
      message: "Data successfully fetched👍",
      data: dataList.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch education list" },
      { status: 400 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const data = await addDoc(collection(database, "educations"), payload);

    return NextResponse.json({
      message: "Education added to completed tasks successfully👍",
      data: {
        id: data.id,
        ...payload,
      }, // Return the unique key generated for the new task
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch create education" },
      { status: 400 }
    );
  }
}
