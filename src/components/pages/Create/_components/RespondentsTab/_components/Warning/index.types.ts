import { Dispatch, SetStateAction } from "react";

export interface WarningComponentProps {
  changeItHandler: () => void;
  keepItHandler: () => void;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  lastChangedAdvanced: string | null;
  setLastChangedAdvanced: Dispatch<SetStateAction<string | null>>;
}
