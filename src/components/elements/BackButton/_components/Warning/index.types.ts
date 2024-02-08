export interface WarningComponentProps {
  handler: () => void;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}
