"use client";

import { PropsWithRequiredChildren } from "@/types";

import dynamic from "next/dynamic";

// import Providers from "../providers";

import { GridItem } from "@chakra-ui/react";

import Grid from "@/components/elements/Grid";
const Navigation = dynamic(() => import("@/components/fragments/Navigation"), {
  ssr: false,
});

const Sidebar = dynamic(() => import("@/components/fragments/Sidebar"), {
  ssr: false,
});

export default function AdminLayout({
  children,
}: PropsWithRequiredChildren<unknown>) {
  return (
    <Grid>
      <GridItem colSpan={12} h="18vh" maxHeight={69} zIndex={10}>
        <Navigation />
      </GridItem>
      <GridItem
        colSpan={12}
        overflow="scroll"
        h="100vh"
        maxHeight="calc(100vh - 69px)"
      >
        <Grid templateColumns="repeat(12, 1fr)">
          <GridItem colSpan={2}>
            <Sidebar />
          </GridItem>
          <GridItem colStart={3} colEnd={13} paddingTop="4vh" paddingX="2vh">
            {/* <Providers>{children}</Providers> */}
            {children}
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
}
