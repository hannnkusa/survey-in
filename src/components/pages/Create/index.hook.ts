import { FormEvent, useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import emailjs from "@emailjs/browser";

import {
  FormValue,
  ProcessEnvConstants,
  RespondentsDetail,
} from "./index.types";

import { PUBLIC_KEY } from "./index.constants";

export default function useCreate() {
  const [isFormShown, setShowForm] = useState(false);
  const [isURLSubmitted, setURLSubmitted] = useState(false);
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [respondentsCounter, setRespondentsCounter] = useState(0);
  const [respondentSegment, setRespondentSegment] = useState("");
  const [respondentType, setRespondentType] = useState("");
  const [respondentDetail, setRespondentDetail] = useState<any>(null);
  emailjs.init(PUBLIC_KEY);

  const {
    isOpen: isOpenSelection,
    onOpen: onOpenSelection,
    onClose: onCloseSelection,
  } = useDisclosure();

  const handleShowForm = () => setShowForm(true);
  const handleHideForm = () => setShowForm(false);
  const resetUrl = () => setSubmittedUrl("random");

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedUrl(
      (event.target as typeof event.target & FormValue).url.value
    );
  };

  const sendEmail = async () => {
    try {
      //   if (
      //     process?.env?.NEXT_PUBLIC_SERVICE_ID &&
      //     process?.env?.NEXT_PUBLIC_TEMPLATE
      //   ) {
      //     await emailjs.send(
      //       process.env.NEXT_PUBLIC_SERVICE_ID,
      //       process.env.NEXT_PUBLIC_TEMPLATE,
      //       {
      //         url: submittedUrl,
      //       }
      //     );
      //     setURLSubmitted(true);
      //   } else throw new Error("Service or Template ID is not defined");
      setTabIndex(1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (["basic", "advanced"].includes(respondentType)) {
      onOpenSelection();
    }
  }, [onOpenSelection, respondentType]);

  return {
    isFormShown,
    isURLSubmitted,
    submittedUrl,
    onShowForm: handleShowForm,
    onHideForm: handleHideForm,
    onSubmitForm: handleSubmitForm,
    onSubmitURL: sendEmail,
    onCancelSubmitURL: resetUrl,
    tabIndex,
    setTabIndex,
    handleTabsChange,
    respondentsCounter,
    setRespondentsCounter,
    respondentSegment,
    setRespondentSegment,
    isOpenSelection,
    onOpenSelection,
    onCloseSelection,
    respondentDetail,
    setRespondentDetail,
    respondentType,
    setRespondentType,
  };
}
