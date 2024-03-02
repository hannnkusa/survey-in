import {
  collection,
  query,
  where,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";
import { NextResponse } from "next/server";
import { database } from "@/firebase/config";

export async function GET(req: Request) {
  try {
    const coll = collection(database, "ratings");

    let ratingValueTotal = 0;
    let ratingPickedTotal = 0;

    const ratingCounts = await Promise.all(
      Array(5)
        .fill({
          rating_value: 0,
          rating_picked: 0,
        })
        .map(async (rating, index) => {
          const currentIndex = index + 1;
          const q = query(coll, where("rating", "==", currentIndex));
          const snapshot = await getCountFromServer(q);
          const rating_picked = snapshot.data().count;

          ratingValueTotal += currentIndex * rating_picked;
          ratingPickedTotal += rating_picked;

          return {
            rating_value: currentIndex,
            rating_picked,
          };
        })
    );

    const rating_average = ratingValueTotal / ratingPickedTotal;

    return NextResponse.json({
      message: "Rating summary successfully fetched👍",
      data: {
        rating_summary: ratingCounts,
        rating_average,
        rating_picked_total: ratingPickedTotal,
        rating_value_total: ratingValueTotal,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch rating summary" },
      { status: 400 }
    );
  }
}
