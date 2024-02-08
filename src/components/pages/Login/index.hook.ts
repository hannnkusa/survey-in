import { useState } from "react";

import { FormValue } from "./index.types";

import { signIn, googleSignIn, facebookSignIn } from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormValue>({
    email: "",
    password: "",
  });

  const handleChangeForm = (selector: string, event: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [selector]: event.target.value,
    }));
  };

  const handleSignInWithGoogle = async () => {
    try {
      await googleSignIn();
      router.push("/questionnaire");
    } catch (error) {
      // console.log(error);
    }
  };

  const handleSignInWithFacebook = async () => {
    try {
      await facebookSignIn();
    } catch (error) {
      // console.log(error);
    }
  };

  const onSubmitForm = async (event: any) => {
    event.preventDefault();
    const { result, error } = await signIn(formData);

    if (!!result) {
      router.push("/questionnaire");
    }

    if (error) {
      // console.log(error);
      return error;
    }
  };

  return {
    formData,
    handleChangeForm,
    onSubmitForm,
    handleSignInWithGoogle,
    handleSignInWithFacebook,
  };
}
