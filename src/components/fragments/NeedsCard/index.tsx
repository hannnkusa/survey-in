import { Flex, Text, Collapse, useDisclosure } from "@chakra-ui/react";

import TogglerButton from "@/components/elements/TogglerButton";

import { NeedsCardProps } from "./index.types";

export default function NeedsCard({ children, title }: NeedsCardProps) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex
      bg="#EFF1F7"
      borderRadius="40px"
      w="100%"
      py="10px"
      px="24px"
      direction="column"
    >
      <Flex
        cursor="pointer"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        onClick={onToggle}
      >
        <Text>{title}</Text>
        <TogglerButton show={isOpen} />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Flex w="90%" direction="column">{children}</Flex>
      </Collapse>
    </Flex>
  );
}
