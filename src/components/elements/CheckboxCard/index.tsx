import { FormEvent } from "react";

import {
  Wrap,
  WrapItem,
  Box,
  useCheckbox,
  useCheckboxGroup,
  Skeleton,
} from "@chakra-ui/react";

import Image from "next/image";

import male from "./_assets/male.svg";
import female from "./_assets/female.svg";

import { CheckboxButtonGroupProps } from "./index.types";

import { capital } from "case";

// 1. Create a component that consumes the `useCheckbox` hook
function CheckboxCard(props: any) {
  const { getInputProps, getCheckboxProps } = useCheckbox(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <WrapItem as="label">
      <input {...input} name={input.value} />
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
        onClick={() => {
          // Call your custom onClick handler here
          props.onClick && props.onClick();
        }}
      >
        {props.children}
      </Box>
    </WrapItem>
  );
}

export function RenderGender(gender: "male" | "female") {
  if (gender === "male") return <Image src={male} alt={"male"} width={32} />;
  if (gender === "female")
    return <Image src={female} alt={"female"} width={32} />;
  return <></>;
}

// Step 2: Use the `useCheckboxGroup` hook to control a group of custom checkboxes.
export default function CheckboxButtonGroup({
  name,
  defaultValue,
  onChange,
  onSelectedValue,
  options,
  value,
}: CheckboxButtonGroupProps) {
  const { getCheckboxProps } = useCheckboxGroup({
    defaultValue,
    onChange,
    value: !!value && value.length > 0 ? value : [],
  });

  if (options && options.length > 0) {
    return (
      <Wrap maxW="100%">
        {options.map((value) => {
          const checkbox = getCheckboxProps({ value });
          return (
            <CheckboxCard
              key={value}
              {...checkbox}
              onClick={() => {
                onSelectedValue?.(value);
              }}
            >
              {["male", "female"].includes(value) ? (
                <Box p={2}>{RenderGender(value as "male" | "female")}</Box>
              ) : (
                capital(value)
              )}
            </CheckboxCard>
          );
        })}
      </Wrap>
    );
  } else {
    return (
      <Wrap maxW="100%">
        <Skeleton borderRadius="20px" />
      </Wrap>
    );
  }
}
