import { getAuth } from "firebase-admin/auth";
import { collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import { NextResponse, type NextRequest } from "next/server";
import { customInitApp } from "@/firebase-admin/config";
import { database } from "@/firebase/config";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    customInitApp();
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search");

    const users = await getAuth().listUsers();
    const usersDetailList = await getDocs(collection(database, "users"));

    const result = users.users.map((user) => {
      return {
        ...user,
        ...usersDetailList.docs.find((doc) => doc.id === user.uid)?.data(),
      };
    });

    const data = !!search
      ? result.filter((user) => {
          // Perform search based on email or displayName
          return user.displayName && user.displayName.includes(search);
        })
      : result;

    return NextResponse.json({
      message: "Users Data successfully fetched👍",
      data,
    });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(req: Request) {
  try {
    const bodyFromReq = await req.json();
    const userData = await getAuth().createUser({
      ...bodyFromReq,
      displayName: bodyFromReq.full_name,
    });

    const payload = {
      phone_number: bodyFromReq.phone_number,
      role: "admin",
      updated_at: null,
      created_at: new Date().toISOString(),
    };

    await setDoc(doc(database, "users", userData?.uid as string), payload);

    return Response.json({
      message: "User created successfully👍",
      data: {
        ...userData,
        ...payload,
      }, // Return the unique key generated for the new task
    });
  } catch (error: any) {
    return new Response(error, {
      status: 400,
    });
  }
}
