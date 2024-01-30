"use client";

import dynamic from "next/dynamic";

import { GridItem } from "@chakra-ui/react";

import { PropsWithRequiredChildren } from "@/types";

import Grid from "@/components/elements/Grid";
const Navigation = dynamic(() => import("@/components/fragments/Navigation"), {
  ssr: false,
});

export default function MainLayout(props: PropsWithRequiredChildren<unknown>) {
  const { children } = props;

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
        paddingTop="4vh"
        paddingX="6.7vh"
      >
        {children}
      </GridItem>
    </Grid>
  );
}
