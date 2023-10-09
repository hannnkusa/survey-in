import { Button as ChakraButton } from "@chakra-ui/react";

import { PropsWithRequiredChildren } from "@/types";

interface AdditionalButtonProps {
    primary?: boolean;
}
export type ButtonProps = PropsWithRequiredChildren<Parameters<typeof ChakraButton>[0] & AdditionalButtonProps>;