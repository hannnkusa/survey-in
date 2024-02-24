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
        display="flex"
        justifyContent="center"
        alignItems="center"
      />

      <Input
        variant="unstyled"
        placeholder="Unstyled"
        value={value}
        w={["12vw", "12vw", "5vw", "5vw"]}
        onChange={(event) => setValue(+event.target.value)}
        marginX="16px"
        textAlign="center"
        fontWeight={500}
        fontSize={["20px", "20px", "40px", "40px"]}
      />

      <IconButton
        aria-label={"Plus"}
        onClick={() => setValue(value + 1)}
        icon={<Image alt="Plus" src={plus} width={32} />}
        variant="unstyled"
        display="flex"
        justifyContent="center"
        alignItems="center"
      />
    </Flex>
  );
}
