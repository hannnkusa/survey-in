import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import Button from "@/components/elements/Button";

import { RespondentSelectionProps } from "./index.types";
import RespondentDetailBasicComponent from "./_components/Basic";
import RespondentDetailAdvancedComponent from "./_components/Advanced";

export function RespondentDetail({
  isOpen,
  onClose,
  onOpen,
  respondentType,
}: RespondentSelectionProps) {
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal
        isOpen={isOpen ?? false}
        onClose={() => {
          onClose();
        }}
        onCloseComplete={() => {
          console.log("called close");
        }}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent borderRadius="60px" maxW="45vw">
          <ModalBody p="45px">
            {respondentType === "basic" ? (
              <RespondentDetailBasicComponent />
            ) : (
              <RespondentDetailAdvancedComponent />
            )}
          </ModalBody>

          <ModalFooter boxShadow="4px -10px 24px 2px rgba(0, 0, 0, 0.06)">
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="ghost">Apply</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
