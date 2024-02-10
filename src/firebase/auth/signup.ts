import { auth } from "../config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  PhoneAuthProvider,
  updatePhoneNumber,
  linkWithPhoneNumber,
} from "firebase/auth";
import { putUserUpdate } from "@/services/user";
import { formatPhoneNumber } from "@/utils/helper";

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
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        updateProfile(userCredential.user, {
          displayName: full_name,
        });
        putUserUpdate(
          { role: "admin", phone_number: formatPhoneNumber(phone_number) },
          userCredential.user.uid
        );
        // .then(() => {
        //   signInWithEmailAndPassword(auth, email, password);
        // });
      }
    );
  } catch (e) {
    error = e;
  }

  return { result, error };
}
