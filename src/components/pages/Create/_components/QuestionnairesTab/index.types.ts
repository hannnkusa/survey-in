import { FormEvent } from "react";

export interface questionnairesTabProps {
  isFormShown: boolean;
  submittedUrl: string;
  onSubmitForm: (event: FormEvent<HTMLFormElement>) => void;
  onHideForm: () => void;
  onShowForm: () => void;
}
