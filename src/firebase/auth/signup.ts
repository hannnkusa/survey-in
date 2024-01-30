import { auth } from "../config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  PhoneAuthProvider,
  updatePhoneNumber,
  linkWithPhoneNumber,
} from "firebase/auth";
import { putUserUpdate } from "@/services/user";
import { formatPhoneNumber, handleAuthChanges } from "@/utils/helper";

export default async function signUp({
  email,
  password,
  full_name,
  phone_number,
}: {
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
}) {
  let result = null;
  let error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);

    updateProfile(result.user, {
      displayName: full_name,
    });

    putUserUpdate({ full_name, phone_number }, result.user.uid);

    handleAuthChanges();
  } catch (e) {
    error = e;
  }

  return { result, error };
}
