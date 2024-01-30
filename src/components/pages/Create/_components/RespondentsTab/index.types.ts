import { UseDisclosureProps } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

export interface RespondentsTabProps extends UseDisclosureProps {
  respondentSegment: string;
  setRespondentSegment: Dispatch<SetStateAction<string>>;
  respondentsCounter: number;
  setRespondentsCounter: Dispatch<SetStateAction<number>>;
  respondentDetail: any;
  setRespondentDetail: Dispatch<SetStateAction<any>>;
  respondentType: string;
  setRespondentType: Dispatch<SetStateAction<string>>;
}
