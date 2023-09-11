import { ReactNode } from "react";

export type PropsWithRequiredChildren<TProps> = {
    children: ReactNode;
} & TProps;