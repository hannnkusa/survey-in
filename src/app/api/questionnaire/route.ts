import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { NextResponse, type NextRequest } from "next/server";
import { database } from "@/firebase/config";
import dayjs from "dayjs";
import id from "dayjs/locale/id";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("user-id");
    const search = searchParams.get("search");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const status = searchParams.get("status");

    let questionnaireRef = collection(database, "questionnaires");
    let questionnaireQuery = query(questionnaireRef);

    if (userId && userId?.trim() !== "") {
      questionnaireQuery = query(
        questionnaireRef,
        where("created_by", "==", userId)
      );
    }

    if (status && status?.trim() !== "") {
      questionnaireQuery = query(
        questionnaireRef,
        where("status", "==", status?.trim())
      );
    }

    const questionnaireSnapshot = await getDocs(questionnaireQuery);

    dayjs.locale(id);
    dayjs.extend(isSameOrBefore);
    dayjs.extend(isSameOrAfter);

    const filteredData = <any>[];
    questionnaireSnapshot.forEach((doc) => {
      const data = doc.data();
      const createdAt = dayjs(data.created_at);

      if (
        (search === "" ||
          data.created_by_name
            .toLowerCase()
            .includes(search?.toLowerCase() ?? "")) &&
        (!startDate || createdAt.isSameOrAfter(dayjs(startDate))) &&
        (!endDate || createdAt.isSameOrBefore(dayjs(endDate)))
      ) {
        filteredData.push({ ...data, id: doc.id });
      }
    });

    return NextResponse.json({
      message: "Data successfully fetched👍",
      data: filteredData,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error();
  }
}

export async function POST(req: NextRequest) {
  try {
    await dayjs.locale(id);
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
        created_at: dayjs().toISOString(),
        updated_at: dayjs().toISOString(),
        created_by: userId,
        questionnaire_filled: 0,
        status: payload.segmented_type.includes("request-segment")
          ? "in review"
          : "draft",
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
