import { Button as ChakraButton } from "@chakra-ui/react";

import { ButtonProps } from "./index.types";

export default function Button(props: ButtonProps) {
  const { children, primary, ...restProps } = props;

  return (
    <ChakraButton
      fontWeight="normal"
      borderRadius="50px"
      {...(primary && {
        color: "white",
        bg: "main.blue3",
        fontWeight: "bold",
        _hover: {
          bg: "main.grey1",
          color: "main.grey3",
        },
      })}
      {...restProps}
    >
      {children}
    </ChakraButton>
  );
}
