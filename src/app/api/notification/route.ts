import { collection, getDocs, query, where } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { NextResponse, type NextRequest } from "next/server";
import { database, storage } from "@/firebase/config";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const target = searchParams.get("target");
    const q = query(
      collection(database, "notifications"),
      where("target", "==", target)
    );
    const notificationDatas = await getDocs(q);

    return NextResponse.json({
      message: "Data successfully fetched👍",
      data: notificationDatas.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })),
    });
  } catch (error) {
    return NextResponse.error();
  }
}
