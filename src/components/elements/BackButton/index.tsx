import { IconButton, useDisclosure } from "@chakra-ui/react";
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
    <>
      <IconButton
        variant="unstyled"
        colorScheme="teal"
        aria-label="Call Sage"
        fontSize="20px"
        onClick={() => executeFunction()}
        position="absolute"
        top={95}
        left={left ? left : 84}
        icon={<Image src={backIcon} alt="back" width={24} />}
      />
      <WarningComponent
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
        handler={back}
      />
    </>
  );
}
