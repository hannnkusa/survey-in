import { Dispatch, SetStateAction } from "react";
import { useDisclosure } from "@chakra-ui/react";

export default function useRespondentTab({
  setPricing,
}: {
  setPricing: Dispatch<SetStateAction<number>>;
}) {
  const {
    isOpen: isOpenSelection,
    onOpen: onOpenSelection,
    onClose: onCloseSelection,
  } = useDisclosure();

  const {
    isOpen: isOpenWarningAdvanced,
    onOpen: onOpenWarningAdvanced,
    onClose: onCloseWarningAdvanced,
  } = useDisclosure();

  const handlePricingCalculation = (qty: number) => {
    const currentPrice = 2500 * qty;
    setPricing(currentPrice);
  };

  return {
    isOpenSelection,
    onOpenSelection,
    onCloseSelection,
    isOpenWarningAdvanced,
    onOpenWarningAdvanced,
    onCloseWarningAdvanced,
    handlePricingCalculation,
  };
}
