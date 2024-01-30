import { Flex, Text, Collapse } from "@chakra-ui/react";

import TogglerButton from "@/components/elements/TogglerButton";

import { NeedsCardProps } from "./index.types";

export default function NeedsCard({
  handleToggle,
  show,
  children,
  title,
}: NeedsCardProps) {
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
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        onClick={handleToggle}
      >
        <Text>{title}</Text>
        <TogglerButton show={show} />
      </Flex>
      <Collapse in={show} animateOpacity>
        {children}
      </Collapse>
    </Flex>
  );
}
