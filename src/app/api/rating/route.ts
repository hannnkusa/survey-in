import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { NextResponse, type NextRequest } from "next/server";
import { database } from "@/firebase/config";
import dayjs from "dayjs";
import id from "dayjs/locale/id";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const rating = parseInt(searchParams.get("rating") ?? "");

    const ratingRef = collection(database, "ratings");
    let ratingQuery = query(ratingRef);

    if (rating && rating >= 1 && rating <= 5) {
      ratingQuery = query(ratingQuery, where("rating", "==", rating));
    }

    const dataList = await getDocs(ratingQuery);
    return NextResponse.json({
      message: "Data successfully fetched👍",
      data: dataList.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch rating list" },
      { status: 400 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    dayjs.locale(id);

    const data = await addDoc(collection(database, "ratings"), {
      ...payload,
      created_at: dayjs().toISOString(),
    });

    return NextResponse.json({
      message: "Rating added to completed tasks successfully👍",
      data: {
        id: data.id,
        ...payload,
      }, // Return the unique key generated for the new task
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create rating." },
      { status: 400 }
    );
  }
}
