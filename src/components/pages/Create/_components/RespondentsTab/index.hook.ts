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

  const handlePricingCalculation = ({
    qty,
    segmented_type,
    selection,
  }: {
    qty: number;
    segmented_type: string;
    selection: Record<string, any[]> | any;
  }) => {
    let total = 0;
    const currentPrice = 2500 * qty;
    if (segmented_type === "advanced") {
      if (!!selection && selection.length > 0) {
        const multiplier = selection[0][1].length;
        total = currentPrice * multiplier;
      }
    } else {
      total = currentPrice;
    }
    setPricing(total);
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
