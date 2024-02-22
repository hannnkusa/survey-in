import { Box, IconButton, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import backIcon from "./_assets/back.svg";
import { useRouter } from "next/navigation";

import WarningComponent from "./_components/Warning";
import { BackButtonProps } from "./index.types";

export default function BackButton({ hasWarn, customFunction, left }: BackButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { back } = useRouter();
  const functionToExecute = customFunction ? customFunction : back
  const executeFunction = hasWarn ? onOpen : functionToExecute;

  return (
    <Box position="relative">
      <IconButton
        variant="unstyled"
        colorScheme="teal"
        aria-label="Call Sage"
        fontSize="20px"
        onClick={() => executeFunction()}
        position="absolute"
        top={0}
        left={[left ? left : 2, left ? left : 2, left ? left : 0, left ? left : 0]}
        icon={<Image src={backIcon} alt="back" width={24} />}
      />
      <WarningComponent
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
        handler={back}
      />
    </Box>
  );
}
