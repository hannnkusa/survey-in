"use client";

import {
  Grid,
  GridItem,
  Center,
  Input,
  Flex,
  IconButton,
} from "@chakra-ui/react";

import Image from "next/image";

import minus from "./_assets/minus.svg";
import plus from "./_assets/plus.svg";

import { PricingCardProps } from "./index.types";

export default function Counter({ value, setValue }: PricingCardProps) {
  return (
    <Flex justifyContent="center" alignItems="center">
      <IconButton
        aria-label={"Min"}
        onClick={() => setValue(value - 1)}
        icon={<Image alt="Min" src={minus} width={32} />}
        variant="unstyled"
      />

      <Input
        variant="unstyled"
        placeholder="Unstyled"
        value={value}
        w="3vw"
        onChange={(event) => setValue(+event.target.value)}
        marginX="16px"
      />

      <IconButton
        aria-label={"Plus"}
        onClick={() => setValue(value + 1)}
        icon={<Image alt="Plus" src={plus} width={32} />}
        variant="unstyled"
      />
    </Flex>
  );
}
