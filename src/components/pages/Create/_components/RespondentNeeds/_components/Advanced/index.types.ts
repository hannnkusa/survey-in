import { Dispatch, SetStateAction } from "react";

export interface RespondentDetailAdvancedComponentProps {
    register: any;
    watch: any;
    setValue: any;
    lastChangedAdvanced: string | null;
  setLastChangedAdvanced: Dispatch<SetStateAction<string | null>>;
}