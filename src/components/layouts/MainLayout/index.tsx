"use client";

import dynamic from "next/dynamic";

import { Flex } from "@chakra-ui/react";

import { PropsWithRequiredChildren } from "@/types";

// import Grid from "@/components/elements/Grid";
const Navigation = dynamic(() => import("@/components/fragments/Navigation"), {
  ssr: false,
});

export default function MainLayout(props: PropsWithRequiredChildren<unknown>) {
  const { children } = props;

  return (
    <Flex direction="column" w="100vw">
      <Flex h="18vh" maxHeight={69} zIndex={10} w="100vw">
        <Navigation />
      </Flex>
      <Flex
        overflow="scroll"
        w="100vw"
        h="100vh"
        maxHeight="calc(100vh - 69px)"
        paddingTop="4vh"
        paddingX={["0", "0", "6.7vh", "6.7vh"]}
        direction="column"
      >
        {children}
      </Flex>
    </Flex>
  );
}
