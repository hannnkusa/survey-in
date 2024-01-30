import { UseDisclosureProps } from "@chakra-ui/react";

export interface PricingCardProps extends UseDisclosureProps {
  price: number;
  buttonTitle: string;
  buttonAction: () => void;
}
