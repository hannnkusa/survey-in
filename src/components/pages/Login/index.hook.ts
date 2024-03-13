import { useState } from "react";

import { FormValue } from "./index.types";

import { signIn, googleSignIn, facebookSignIn } from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

export default function useAuth() {
  const toast = useToast();
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
    const checker = Object.entries(formData).every(([key, value]) => {
      return !!value;
    });

    if (!checker) {
      toast({
        position: "top",
        title: "Failed",
        description: "please complete the form.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      return;
    }

    const signinPromise = signIn(formData);

    toast.promise(signinPromise, {
      success: {
        title: "Success",
        description: "Successfully login to your account!",
      },
      error: { title: "Failed", description: "Email or Password could be wrong" },
      loading: {
        title: "Signing in to your account",
        description: "Please wait",
        position: "top",
      },
    });
  };

  return {
    formData,
    handleChangeForm,
    onSubmitForm,
    handleSignInWithGoogle,
    handleSignInWithFacebook,
  };
}
