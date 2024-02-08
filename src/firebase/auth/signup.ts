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
    await createUserWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        await putUserUpdate(
          { role: "admin", phone_number: phone_number },
          userCredential.user.uid
        );

        await updateProfile(userCredential.user, {
          displayName: full_name,
        });

        await signInWithEmailAndPassword(auth, email, password);
        await handleAuthChanges();
      }
    );
  } catch (e) {
    error = e;
  }

  return { result, error };
}
