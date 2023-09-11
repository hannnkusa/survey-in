// app/providers.tsx
"use client";

import { Work_Sans } from "next/font/google";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

import { PropsWithRequiredChildren } from "@/types";

import theme from "./theme";

const workSans = Work_Sans({ subsets: ["latin"] });

export default function Providers({
  children,
}: PropsWithRequiredChildren<unknown>) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-work-sans: ${workSans.style.fontFamily};
          }
        `}
      </style>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </>
  );
}
