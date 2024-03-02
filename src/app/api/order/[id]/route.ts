import { getDoc, updateDoc, doc } from "firebase/firestore";
import { database, storage } from "@/firebase/config";
import { uploadString, ref, getDownloadURL } from "firebase/storage";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const orderData = await getDoc(doc(database, "orders", id as string));
    const payment_proof_url = await getDownloadURL(ref(storage, orderData?.id));

    return NextResponse.json({
      message: "Data successfully fetched👍",
      data: {
        ...orderData,
        payment_proof_url,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch order detail" },
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

    await updateDoc(doc(database, "orders", id as string), {
      ...payload,
      updated_at: new Date().toISOString(),
    });
    return Response.json({
      message: "Order updated successfully👍",
      data: {
        id,
        ...payload,
      }, // Return the unique key generated for the new task
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update order detail" },
      { status: 400 }
    );
  }
}
