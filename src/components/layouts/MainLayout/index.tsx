"use client";

import { GridItem } from "@chakra-ui/react";

import { PropsWithRequiredChildren } from "@/types";

import Grid from "@/components/elements/Grid";
import Navigation from "@/components/fragments/Navigation";

export default function MainLayout(props: PropsWithRequiredChildren<unknown>) {
  const { children } = props;

  return (
    <Grid>
      <GridItem colSpan={12} h="18vh" maxHeight={69} zIndex={10}>
        <Navigation />
      </GridItem>
      <GridItem colSpan={12} overflow="scroll" maxHeight="calc(100vh - 69px)">
        {children}
      </GridItem>
    </Grid>
  );
}
