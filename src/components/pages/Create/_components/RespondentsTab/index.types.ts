import { Dispatch, SetStateAction } from "react";

export interface RespondentsTabProps {
  respondentDetail: any;
  setRespondentDetail: Dispatch<SetStateAction<any>>;
  lastChangedAdvanced: string | null;
  setLastChangedAdvanced: Dispatch<SetStateAction<string | null>>;
  setPricing: Dispatch<SetStateAction<number>>;
  handlePay: any;
}
