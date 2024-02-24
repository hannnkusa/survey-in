// app/providers.tsx
"use client";

import { useEffect, useState } from "react";
import { Work_Sans } from "next/font/google";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, Flex } from "@chakra-ui/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PropsWithRequiredChildren } from "@/types";

import theme from "@/theme";
import reverse_logo from "@/assets/reverse-logo.svg";
import Image from "next/image";

import { useAuthStore } from "@/stores/auth";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { getUserDetail } from "@/services/user";
import { onMessage } from "firebase/messaging";
import { useRouter } from "next/navigation";

const workSans = Work_Sans({ subsets: ["latin"] });

import Cookies from "js-cookie";
// import useFcmToken from "@/utils/hooks/useFcmToken";

export default function Providers({
  children,
}: PropsWithRequiredChildren<unknown>) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  });

  const { replace } = useRouter();
  const { setCurrentUser, currentUser } = useAuthStore();
  const [redirecting, setRedirecting] = useState(true);

  // const { fcmToken, notificationPermissionStatus } = useFcmToken();
  // Use the token as needed
  // fcmToken && console.log("FCM token:", fcmToken);

  useEffect(() => {
    const hasLogin = Cookies.get("signed-id");
    if (hasLogin) {
      setRedirecting(false);
    } else {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const userDetail = await getUserDetail(user.uid);
            if (!!userDetail) {
              const signedId = user.uid;
              Cookies.set("signed-id", signedId, { expires: 99 });
              setRedirecting(true);
              Cookies.set("current-user", JSON.stringify(userDetail), {
                expires: 99,
              });
              const payload = {
                ...user,
                userDetail,
              };
              await setCurrentUser(payload);
              if (payload.userDetail.role === "super-admin")
                replace("/app-control");
              if (payload.userDetail.role === "admin")
                replace("/questionnaire");
            }
          } catch (error) {
            console.log(error);
            location.reload();
          } finally {
            setRedirecting(false);
          }
        } else {
          setRedirecting(false);
          console.log(new Error("You are not log in bro"));
        }
      });

      return () => unsubscribe();
    }
  }, [replace, setCurrentUser]);

  // useEffect(() => {
  //   if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  //     const unsubscribe = onMessage(messaging, (payload) => {
  //       console.log("Foreground push notification received:", payload);
  //       // Handle the received push notification while the app is in the foreground
  //       // You can display a notification or update the UI based on the payload
  //       new Notification(payload?.notification?.title ?? "", {
  //         body: payload?.notification?.body,
  //         icon: "./logo.png",
  //       });
  //     });
  //     return () => {
  //       unsubscribe(); // Unsubscribe from the onMessage event
  //     };
  //   }
  // }, []);

  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-work-sans: ${workSans.style.fontFamily};
          }
        `}
      </style>
      <QueryClientProvider client={queryClient}>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            {redirecting ? (
              <Flex
                h="100vh"
                w="100vw"
                justifyContent="center"
                alignItems="center"
              >
                <Image width={320} src={reverse_logo} alt="logo" />
              </Flex>
            ) : (
              children
            )}
          </ChakraProvider>
        </CacheProvider>
      </QueryClientProvider>
    </>
  );
}
