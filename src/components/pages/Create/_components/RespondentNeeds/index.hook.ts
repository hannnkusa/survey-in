import { useCallback } from "react";
import { RespondentNeedsProps } from "./index.types";

export default function useRespondentNeeds({
  onClose,
  watch,
  setValue,
  reset,
  resetField,
  getValues,
  respondentDetail,
  segmentedType,
  setRespondentDetail,
}: RespondentNeedsProps) {
  const handleOnCancel = useCallback(async () => {
    const objToGet =
      segmentedType === "basic"
        ? "segmented_basic_detail"
        : "segmented_advanced_detail";

    const respondentDetailFilled =
      respondentDetail && respondentDetail[objToGet];

    const objDetail = watch(objToGet);

    if (!respondentDetailFilled) {
      setValue(objToGet, undefined);
    } else {
      Object.entries(objDetail).forEach(([key, value]: any[]) => {
        setValue(`${objToGet}.${key}`, respondentDetail[objToGet[key]] ?? []);
      });
    }

    onClose();
  }, [onClose, respondentDetail, segmentedType, setValue, watch]);

  const handleOnApply = useCallback(() => {
    const objToGet =
      segmentedType === "basic"
        ? "segmented_basic_detail"
        : "segmented_advanced_detail";
    const objDetail = watch(objToGet);

    const respondentDetailFilled =
      objDetail &&
      Object.entries(objDetail)
        .map(([key, value]) => value)
        .find((val: any) => val.length > 0);

    if (!respondentDetailFilled) {
      setValue("segmented_type", "");
      setValue("respondent_type", "random");
    } else {
      setRespondentDetail(getValues());
    }

    onClose();
  }, [getValues, onClose, segmentedType, setRespondentDetail, setValue, watch]);

  return {
    handleOnApply,
    handleOnCancel,
  };
}
