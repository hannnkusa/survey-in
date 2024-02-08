import { useCallback, useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabPanels,
  TabPanel,
  Flex,
} from "@chakra-ui/react";

import Button from "@/components/elements/Button";

import RadioButtonGroup from "@/components/elements/RadioCard";

import { RespondentNeedsProps } from "./index.types";
import useRespondentNeeds from "./index.hook";
import RespondentDetailBasicComponent from "./_components/Basic";
import RespondentDetailAdvancedComponent from "./_components/Advanced";

export function RespondentNeeds({
  isOpen,
  onClose,
  onOpen,
  segmentedType,
  register,
  watch,
  setValue,
  respondentDetail,
  setRespondentDetail,
  reset,
  resetField,
  getValues,
  lastChangedAdvanced,
  setLastChangedAdvanced,
}: RespondentNeedsProps) {
  const { handleOnApply, handleOnCancel } = useRespondentNeeds({
    watch,
    setValue,
    respondentDetail,
    setRespondentDetail,
    segmentedType,
    reset,
    resetField,
    onClose,
    getValues,
    lastChangedAdvanced,
    setLastChangedAdvanced,
  });

  return (
    <>
      <Modal
        isOpen={isOpen ?? false}
        onClose={() => {}}
        scrollBehavior="inside"
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxW="45vw">
          <ModalBody p="45px">
            {segmentedType === "basic" ? (
              <RespondentDetailBasicComponent
                register={register}
                watch={watch}
                setValue={setValue}
              />
            ) : (
              <RespondentDetailAdvancedComponent
                register={register}
                watch={watch}
                setValue={setValue}
                lastChangedAdvanced={lastChangedAdvanced}
                setLastChangedAdvanced={setLastChangedAdvanced}
              />
            )}
          </ModalBody>

          <ModalFooter
            boxShadow="4px -10px 24px 2px rgba(0, 0, 0, 0.06)"
            padding="32px"
          >
            <Button
              mr={3}
              bg="#193742"
              color="white"
              h="35px"
              w="134px"
              onClick={() => {
                handleOnCancel();
              }}
            >
              Cancel
            </Button>
            <Button
              bg="#00ADF0"
              color="white"
              h="35px"
              w="134px"
              onClick={() => {
                handleOnApply();
              }}
            >
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
