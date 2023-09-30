import { Button as ChakraButton } from "@chakra-ui/react";

import { PropsWithRequiredChildren } from "@/types";

export default function Button(
  props: PropsWithRequiredChildren<Parameters<typeof ChakraButton>[0]>
) {
  const { children, ...restProps } = props;

  return (
    <ChakraButton fontWeight="normal" borderRadius="50px" {...restProps}>
      {children}
    </ChakraButton>
  );
}
