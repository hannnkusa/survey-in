import { useState } from "react";

import { FormValue } from "./index.types";

import { signIn, googleSignIn, facebookSignIn } from "@/firebase/auth/signin";

export default function useAuth() {
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignInWithFacebook = async () => {
    try {
      await facebookSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitForm = async (event: any) => {
    event.preventDefault();
    const { result, error } = await signIn(formData);

    if (error) {
      return console.log(error);
    }

    console.log(result);
  };

  return {
    formData,
    handleChangeForm,
    onSubmitForm,
    handleSignInWithGoogle,
    handleSignInWithFacebook,
  };
}
