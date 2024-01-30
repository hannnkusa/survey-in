import { IconButton } from "@chakra-ui/react";

import plus from "./_assets/plus.svg";
import cross from "./_assets/cross.svg";

import Image from "next/image";

import { TogglerButtonProps } from "./index.types";

export default function TogglerButton({ show }: TogglerButtonProps) {
  return (
    <IconButton
      aria-label={show ? "Less" : "More"}
      icon={<Image src={show ? cross : plus} alt="Open" width={36} />}
      variant="unstyled"
    />
  );
}
