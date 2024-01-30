// app/providers.tsx
"use client";

import { Work_Sans } from "next/font/google";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PropsWithRequiredChildren } from "@/types";

import theme from "@/theme";

const workSans = Work_Sans({ subsets: ["latin"] });

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
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
      </QueryClientProvider>
    </>
  );
}
