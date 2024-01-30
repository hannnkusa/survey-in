import { ReactNode } from "react";

export interface NeedsCardProps {
  title: string;
  children: ReactNode;
  show: boolean;
  handleToggle: () => void;
}
