import {
  HStack,
  Box,
  useRadio,
  useRadioGroup,
  useCheckbox,
  useCheckboxGroup,
} from "@chakra-ui/react";

import Image from "next/image";

import male from "./_assets/male.svg";
import female from "./_assets/female.svg";

import { RadioButtonGroupProps } from "./index.types";

import { capital } from "case";

// 1. Create a component that consumes the `useRadio` hook
function CheckboxCard(props: any) {
  const { getInputProps, getCheckboxProps } = useCheckbox(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="2px"
        borderRadius="20px"
        borderColor="#00ADF0"
        // h="35px"
        _checked={{
          bg: "#D2F1FE",
        }}
        _focus={{
          boxShadow: "none",
        }}
        px={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export function RenderGender(gender: "male" | "female") {
  if (gender === "male") return <Image src={male} alt={"male"} />;
  if (gender === "female") return <Image src={female} alt={"female"} />;
  return <></>;
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
export default function CheckboxButtonGroup({
  name,
  defaultValue,
  onChange,
  options,
}: RadioButtonGroupProps) {
  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue,
    onChange,
  });

  // const group = getRootProps();

  return (
    <HStack maxW="100%">
      {options.map((value) => {
        const radio = getCheckboxProps({ value });
        return (
          <CheckboxCard key={value} {...radio}>
            {["male", "female"].includes(value) ? (
              <Box p={2}>{RenderGender(value as "male" | "female")}</Box>
            ) : (
              capital(value)
            )}
          </CheckboxCard>
        );
      })}
    </HStack>
  );
}
