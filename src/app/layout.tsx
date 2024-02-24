"use client";

import { PropsWithRequiredChildren } from "@/types";

import Providers from "./providers";

export default function RootLayout({
  children,
}: PropsWithRequiredChildren<unknown>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
