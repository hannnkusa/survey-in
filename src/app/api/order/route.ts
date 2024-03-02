import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { uploadString, ref, getDownloadURL } from "firebase/storage";
import { NextResponse, type NextRequest } from "next/server";
import { database, storage } from "@/firebase/config";
import { convertDataURIToBinary } from "@/utils/helper";
import dayjs from "dayjs";
import id from "dayjs/locale/id";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const questionnaireId = searchParams.get("questionnaire-id");
    const q = query(
      collection(database, "orders"),
      where("questionnaire_id", "==", questionnaireId)
    );
    // const questionnaireData = await getDocs(
    //   collection(database, "questionnaires")
    // );
    const orderDatas = await getDocs(q);
    const orderData = orderDatas.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))[0];

    const payment_proof_url = await getDownloadURL(ref(storage, orderData?.id));

    return NextResponse.json({
      message: "Data successfully fetched👍",
      data: {
        ...orderData,
        payment_proof_url,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch order list" },
      { status: 400 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dayjs.locale(id);
    const searchParams = req.nextUrl.searchParams;
    const questionnaireId = searchParams.get("questionnaire-id");

    const payload = await req.json();

    if (!questionnaireId) {
      return NextResponse.json(
        { error: "Questionnaire ID is required" },
        { status: 422 }
      );
    }

    if (!payload.file) {
      return NextResponse.json({ error: "File is required" }, { status: 422 });
    }

    const { file, ...rest } = payload;

    const orderData = await addDoc(collection(database, "orders"), {
      ...rest,
      created_at: dayjs().toISOString(),
    });

    const base64String = await file;

    const storageRef = ref(storage, orderData.id);

    uploadString(storageRef, base64String, "data_url");

    await updateDoc(doc(database, "questionnaires", payload.questionnaire_id), {
      status: "in review",
      order_id: orderData.id,
      updated_at: new Date().toISOString(),
    });

    await addDoc(collection(database, "notifications"), {
      title: "Payment Proof Uploaded",
      description: `Payment Proof uploaded by ${payload.created_by_name}`,
      url: `/transaction/order/${orderData.id}`,
      target: "super-admin",
      created_at: dayjs().toISOString(),
      updated_at: null,
      deleted_at: null,
      readed: false,
    });

    return NextResponse.json({
      message: "Order added successfully👍",
      data: {
        id: orderData.id,
        ...payload,
      }, // Return the unique key generated for the new task
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 400 }
    );
  }
}
