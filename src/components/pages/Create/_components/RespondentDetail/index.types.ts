import { UseDisclosureReturn } from "@chakra-ui/react";

export interface Props {
    respondentType: string;
}

export type RespondentSelectionProps = UseDisclosureReturn & Props;
