import { Grid as ChakraGrid } from "@chakra-ui/react";

import { PropsWithRequiredChildren } from "@/types";

export default function Grid(
  props: PropsWithRequiredChildren<Parameters<typeof ChakraGrid>[0]>
) {
  const { children, ...restProps } = props;

  return (
    <ChakraGrid templateColumns="repeat(12, 1fr)" {...restProps}>
      {children}
    </ChakraGrid>
  );
}
