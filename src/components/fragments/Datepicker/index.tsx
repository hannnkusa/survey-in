import { Input, forwardRef } from "@chakra-ui/react";

export const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  <Input
    onClick={onClick}
    ref={ref}
    value={value}
    placeholder="Input Date"
    w="140px"
  />
));
