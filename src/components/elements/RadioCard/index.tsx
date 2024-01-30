import { HStack, Box, useRadio, useRadioGroup } from "@chakra-ui/react";

import Image from "next/image";

import male from "./_assets/male.svg";
import female from "./_assets/female.svg";

import { RadioButtonGroupProps } from "./index.types";

import { capital } from "case";

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="2px"
        borderRadius="8px"
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
export default function RadioButtonGroup({
  name,
  defaultValue,
  onChange,
  options,
}: RadioButtonGroupProps) {
  const { value, getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {["male", "female"].includes(value) ? (
              <Box p={2}>{RenderGender(value as "male" | "female")}</Box>
            ) : (
              capital(value)
            )}
          </RadioCard>
        );
      })}
    </HStack>
  );
}
