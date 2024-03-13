import { useState } from "react";

import { FormValue } from "./index.types";

import signUp from "@/firebase/auth/signup";
import { googleSignIn, facebookSignIn } from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

export default function useAuth() {
  const toast = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState<FormValue>({
    full_name: "",
    email: "",
    phone_number: "",
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

    const signupPromise = signUp(formData);

    toast.promise(signupPromise, {
      success: {
        title: "Account created",
        description: "Successfully create your account!",
      },
      error: { title: "Failed", description: "Failed to create your account" },
      loading: {
        title: "Creating your account",
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
