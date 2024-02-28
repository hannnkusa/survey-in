import { useRef, RefObject } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  // Button,
} from "@chakra-ui/react";

import Button from "@/components/elements/Button";

import { WarningComponentProps } from "./index.types";

export default function WarningComponent({
  handler,
  isOpen,
  onClose,
  onOpen,
}: WarningComponentProps) {
  const cancelRef = useRef<any>(null);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef as RefObject<any>}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent p="8px" marginX={[8, 8, 0, 0]}>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to discard all of your changes?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef as RefObject<any>}
              onClick={onClose}
              w="134px"
            >
              No
            </Button>
            <Button colorScheme="red" ml={3} w="134px" onClick={handler}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
