import { UseDisclosureProps } from "@chakra-ui/react";

export interface PricingCardProps extends UseDisclosureProps {
  price: number;
  tabIndex: number;
  buttonTitle: string;
  buttonAction: () => void;
  disabledCheckoutButton: boolean;
}
