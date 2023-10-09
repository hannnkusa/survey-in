import { FormEvent, useState } from "react";
import emailjs from '@emailjs/browser';

import { FormValue, ProcessEnvConstants } from "./index.types";

import { PUBLIC_KEY } from "./index.constants";

export default function useCreate() {
    const [isFormShown, setShowForm] = useState(false);
    const [isURLSubmitted, setURLSubmitted] = useState(false);
    const [submittedUrl, setSubmittedUrl] = useState('');
    emailjs.init(PUBLIC_KEY);

    const handleShowForm = () => setShowForm(true);
    const handleHideForm = () => setShowForm(false);
    const resetUrl = () => setSubmittedUrl('');

    const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmittedUrl((event.target as typeof event.target & FormValue).url.value);
    }

    const sendEmail = async () => {
        try {
            if (process?.env?.NEXT_PUBLIC_SERVICE_ID && process?.env?.NEXT_PUBLIC_TEMPLATE) {
                await emailjs.send(process.env.NEXT_PUBLIC_SERVICE_ID, process.env.NEXT_PUBLIC_TEMPLATE, {
                    url: submittedUrl,
                });
                setURLSubmitted(true);
            } else throw new Error('Service or Template ID is not defined');
        } catch (error) {
            console.error(error);
        }
    }

    return {
        isFormShown,
        isURLSubmitted,
        submittedUrl,
        onShowForm: handleShowForm,
        onHideForm: handleHideForm,
        onSubmitForm: handleSubmitForm,
        onSubmitURL: sendEmail,
        onCancelSubmitURL: resetUrl,
    }
}