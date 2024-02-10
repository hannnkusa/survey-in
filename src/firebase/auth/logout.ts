import { auth } from "../config";
import { signOut } from "firebase/auth";

export async function handleLogout() {
  let result = null,
    error = null;
  try {
    result = await signOut(auth);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
