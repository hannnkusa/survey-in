import { UseDisclosureReturn } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

export interface RespondentNeedsProps {
  segmentedType: string;
  register?: any;
  watch: any;
  setValue: any;
  reset: any;
  resetField: any;
  getValues: any;
  respondentDetail: any;
  setRespondentDetail: Dispatch<SetStateAction<any>>;
  lastChangedAdvanced: string | null;
  setLastChangedAdvanced: Dispatch<SetStateAction<string | null>>;
  onClose: UseDisclosureReturn["onClose"];
  onOpen?: UseDisclosureReturn["onOpen"];
  isOpen?: UseDisclosureReturn["isOpen"];
}
