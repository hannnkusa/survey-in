import { Wrap, WrapItem, Box, useRadio, useRadioGroup } from "@chakra-ui/react";
import Image from "next/image";
import male from "./_assets/male.svg";
import female from "./_assets/female.svg";
import { RadioButtonGroupProps } from "./index.types";
import { capital } from "case";

function RadioCard({ children, ...props }: any) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <WrapItem as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="2px"
        borderRadius="8px"
        borderColor="#00ADF0"
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
        {children}
      </Box>
    </WrapItem>
  );
}

export function RenderGender(gender: "male" | "female") {
  if (gender === "male") return <Image src={male} alt={"male"} />;
  if (gender === "female") return <Image src={female} alt={"female"} />;
  return <></>;
}

export default function RadioButtonGroup({
  name,
  defaultValue = "",
  onChange = () => {},
  options,
  value
}: RadioButtonGroupProps) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    value,
    onChange: onChange,
  });

  const group = getRootProps();

  return (
    <Wrap {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard
            key={value}
            {...radio}
            onClick={() => {
              onChange(value);
            }}
          >
            {["male", "female"].includes(value) ? (
              <Box p={2}>{RenderGender(value as "male" | "female")}</Box>
            ) : (
              capital(value)
            )}
          </RadioCard>
        );
      })}
    </Wrap>
  );
}
