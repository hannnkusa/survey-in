import {
  useEffect,
  useCallback,
  useMemo,
  useRef,
  RefObject,
  useState,
} from "react";

import {
  Flex,
  Grid,
  GridItem,
  RadioGroup,
  Radio,
  Stack,
  Heading,
  Text,
  Box,
  Divider,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";

import useRespondentTab from "./index.hook";

import Counter from "@/components/fragments/Counter";

import { RespondentsTabProps } from "./index.types";
import { RespondentNeeds } from "../RespondentNeeds";
import RadioButtonGroup from "@/components/elements/RadioCard";
import CheckboxButtonGroup from "@/components/elements/CheckboxCard";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RespondentPostUI } from "@/types/questionnaire";
import { addRespondentSchema } from "@/validations/questionnaire";
import { useRouter } from "next/navigation";
import { constructWAChat } from "@/utils/helper";
import { useAuthStore } from "@/stores/auth";
import { phone_number } from "./index.constants";
import {
  constructRespondentRequirement,
  constructRespondentRequirementsValue,
} from "@/utils/helper";

import WarningComponent from "./_components/Warning";

export default function RespondentsTab({
  respondentDetail,
  setRespondentDetail,
  lastChangedAdvanced,
  setLastChangedAdvanced,
  setPricing,
  handlePay,
}: RespondentsTabProps) {
  const { currentUser } = useAuthStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    reset,
    resetField,
    formState: { errors },
  } = useForm<RespondentPostUI>({
    resolver: zodResolver(addRespondentSchema),
    defaultValues: {
      respondent_type: "",
      segmented_type: [],
      respondent_qty: 0,
    },
    mode: "onChange",
  });

  const {
    isOpenSelection,
    onCloseSelection,
    onOpenSelection,
    isOpenWarningAdvanced,
    onOpenWarningAdvanced,
    onCloseWarningAdvanced,
    handlePricingCalculation,
  } = useRespondentTab({ setPricing });

  const [recentSegmentType, setRecentSegmentType] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const respondent_qty = watch("respondent_qty");
  const respondent_type = watch("respondent_type");
  const segmented_type = watch("segmented_type");
  const segmented_advanced_detail = JSON.stringify(
    getValues("segmented_advanced_detail")
  );

  const selection: any[] = useMemo(() => {
    const constructData = !!segmented_advanced_detail
      ? Object.entries(JSON.parse(segmented_advanced_detail) || {})
      : Object.entries({});

    return JSON.parse(JSON.stringify(constructData));
  }, [segmented_advanced_detail]);

  const lastChanged = useMemo(() => {
    if (!!selection && !!lastChangedAdvanced) {
      const checker: string[] = selection.find(
        (val) => val[0] !== lastChangedAdvanced
      );

      if (!!checker) return { [checker[0]]: checker[1] };
    }
    return;
  }, [lastChangedAdvanced, selection]);

  const recentChanged = useMemo(() => {
    if (!!selection && !!lastChangedAdvanced) {
      const checker: string[] = selection.find(
        (val) => val[0] === lastChangedAdvanced
      );

      if (!!checker) return { [checker[0]]: checker[1] };
    }
    return;
  }, [lastChangedAdvanced, selection]);

  useEffect(() => {
    handlePricingCalculation(respondent_qty);
  }, [handlePricingCalculation, respondent_qty]);

  useEffect(() => {
    const checkSelection = async () => {
      if (selection && Object.entries(selection).length > 1) {
        await onOpenWarningAdvanced();
      }
    };

    checkSelection();
  }, [onOpenWarningAdvanced, selection, watch]);

  const handleSegmentedTypeChanges = useCallback(
    async (val: string) => {
      setRecentSegmentType(val);
      if (["basic", "advanced"].includes(val)) {
        if (segmented_type.includes(val)) {
          const unselectedSegment =
            val === "advanced"
              ? "segmented_advanced_detail"
              : "segmented_basic_detail";
          setValue(unselectedSegment, null);
        } else {
          onOpenSelection();
        }
      } else if (val === "request-segment") {
        onOpen();
      }
    },
    [onOpen, onOpenSelection, segmented_type, setValue]
  );

  const redirectReqSegmentToWA = useCallback(async () => {
    const chatWA = constructWAChat({
      head: "Halo+Ka%2C+saya+ingin+request+segment+untuk+penelitian+saya",
      body: `email+%3A+${currentUser?.email}`,
      phone_number,
    });
    const newWindow = window.open(chatWA, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
    handlePay(router, true);
  }, [currentUser?.email, handlePay, router]);

  useEffect(() => {
    if (
      !!respondent_qty ||
      !!respondent_type ||
      (!!segmented_type && segmented_type.length > 0)
    ) {
      setRespondentDetail(getValues());
    }
  }, [
    getValues,
    respondent_qty,
    respondent_type,
    segmented_type,
    setRespondentDetail,
  ]);

  return (
    <Flex
      w="100%"
      boxShadow="0px 8px 16px 1px rgba(8, 67, 115, 0.20);"
      direction="column"
      borderRadius={["30px", "30px", "60px", "60px"]}
      overflow="hidden"
    >
      <Box
        background="#00ADF0"
        pl={["30px", "30px", "60px", "60px"]}
        paddingY={["8px", "8px", "21px", "21px"]}
      >
        <Heading
          color="#FFF"
          as="h4"
          fontSize={[16, 16, 24, 24]}
          fontWeight={600}
        >
          Respondent Segment
        </Heading>
      </Box>
      <Stack
        paddingX={["30px", "30px", "35px", "35px"]}
        paddingY={["16px", "16px", "24px", "24px"]}
        gap={6}
      >
        <Flex paddingX={["", "", "25px", "25px"]}>
          <RadioGroup
            onChange={(val) => setValue("respondent_type", val)}
            value={watch("respondent_type")}
            gap={3}
          >
            <Stack>
              <Radio value="random" size={["md", "md", "lg", "lg"]}>
                Random
              </Radio>
              <Radio value="segmented" size={["md", "md", "lg", "lg"]}>
                Segmented
              </Radio>
            </Stack>
          </RadioGroup>
        </Flex>
        {watch("respondent_type") === "segmented" && (
          <Stack gap={6}>
            <Divider h="2px" background="#E3E3E3" />
            <Flex w="100%" justifyContent="center" gap={4}>
              <CheckboxButtonGroup
                name={"segmented-type"}
                value={watch("segmented_type")}
                onChange={(val) =>
                  setValue(
                    "segmented_type",
                    val.filter((option: string) => option !== "request-segment")
                  )
                }
                onSelectedValue={handleSegmentedTypeChanges}
                options={["basic", "advanced", "request-segment"]}
              />
            </Flex>
            {(watch("segmented_advanced_detail") ||
              watch("segmented_basic_detail")) &&
              watch("segmented_type") && (
                <Flex direction="column" gap={2}>
                  {constructRespondentRequirement(getValues()).map(
                    (val: any, idx: any) => (
                      <Grid templateColumns="repeat(12, 1fr)" key={idx}>
                        <GridItem colSpan={4}>
                          <Text>{val.key}</Text>
                        </GridItem>
                        <GridItem colSpan={1}>
                          <Text>: </Text>
                        </GridItem>
                        <GridItem colSpan={7}>
                          <Text textAlign="right">
                            {constructRespondentRequirementsValue({
                              ...val,
                              divider: "; ",
                            })}
                          </Text>
                        </GridItem>
                      </Grid>
                    )
                  )}
                </Flex>
              )}
          </Stack>
        )}
        <GridItem>
          <Counter
            value={watch("respondent_qty")}
            setValue={(val: number) => setValue("respondent_qty", val)}
          />
        </GridItem>
      </Stack>
      <RespondentNeeds
        isOpen={isOpenSelection}
        onClose={onCloseSelection}
        onOpen={onOpenSelection}
        segmentedType={recentSegmentType}
        respondentDetail={respondentDetail}
        setRespondentDetail={setRespondentDetail}
        register={register}
        watch={watch}
        setValue={setValue}
        reset={reset}
        resetField={resetField}
        getValues={getValues}
        lastChangedAdvanced={lastChangedAdvanced}
        setLastChangedAdvanced={setLastChangedAdvanced}
      />
      <WarningComponent
        onOpen={onOpenWarningAdvanced}
        onClose={onCloseWarningAdvanced}
        isOpen={isOpenWarningAdvanced}
        lastChangedAdvanced={lastChangedAdvanced}
        setLastChangedAdvanced={setLastChangedAdvanced}
        keepItHandler={() => {
          setValue(`segmented_advanced_detail`, lastChanged as any);
          onCloseWarningAdvanced();
        }}
        changeItHandler={() => {
          onCloseWarningAdvanced();
          setValue(`segmented_advanced_detail`, recentChanged as any);
        }}
      />

      {/* This alert is used to receive confirmation from the user */}
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef as RefObject<any>}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent p="8px">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Attention
            </AlertDialogHeader>

            <AlertDialogBody>
              You select the request segment, this action will result in a
              redirect to WhatsApp admin, continue?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef as RefObject<any>} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="green"
                onClick={redirectReqSegmentToWA}
                ml={3}
              >
                Yes, Direct Me!
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}
