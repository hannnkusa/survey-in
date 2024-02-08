import { useCallback, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { OrderPostUI } from "@/types/order";
import { useToast } from "@chakra-ui/react";
import {
  constructRespondentRequirement,
  constructRespondentRequirementsValue,
  toDataURL,
} from "@/utils/helper";

export default function useSummary({
  setValue,
  watch,
  submitOrder,
  router,
  questionnaireId,
}: {
  setValue: any;
  watch: any;
  submitOrder: any;
  router: any;
  questionnaireId: string | string[];
}) {
  const [blobUrl, setBlobUrl] = useState<any>("");
  const toast = useToast();
  useEffect(() => {
    if (process?.env?.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
      emailjs.init(process?.env?.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
  }, []);

  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      const file = acceptedFiles?.[0];

      if (!file) {
        return;
      }

      // Do something with the files
      console.log(file);
      const imgUrl = URL.createObjectURL(file);
      setBlobUrl(imgUrl);
      await toDataURL(imgUrl, (img) => {
        setValue("file", img);
      });
      // console.log(file.name.split(".").pop());
    },
    [setValue]
  );

  const onSubmit = async (data: OrderPostUI) => {
    try {
      if (!watch("file") && !blobUrl) {
        return toast({
          title: "Failed",
          description: "File is required",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }

      const payload = {
        ...data,
        questionnaire_id: questionnaireId,
      };
      await submitOrder(payload);

      if (
        process?.env?.NEXT_PUBLIC_SERVICE_ID &&
        process?.env?.NEXT_PUBLIC_TEMPLATE
      ) {
        // Kirim ke survey in & customer
        await emailjs.send(
          process.env.NEXT_PUBLIC_SERVICE_ID,
          process.env.NEXT_PUBLIC_TEMPLATE,
          {
            to_name: payload.full_name,
            reply_to: payload.email,
            email_target: payload.email,
            message:
              "Your order is currently being reviewed by our team, wait until our team confirms your payment",
          }
        );
      }

      toast({
        title: "Success",
        description: "Payment proof successfully submitted",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      router.push(`/questionnaire/${questionnaireId}/order-in-review`);
    } catch (error) {
      toast({
        title: "Failed.",
        description: "Failed to post order",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      console.error(error);
    }
  };

  return {
    onDrop,
    onSubmit,
    respondentRequirement: constructRespondentRequirement,
    respondentRequirementValue: constructRespondentRequirementsValue,
    blobUrl,
  };
}
