import { useRef, RefObject } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

import { WarningComponentProps } from "./index.types";

export default function WarningComponent({
  changeItHandler,
  keepItHandler,
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

        <AlertDialogContent p="8px">
          <AlertDialogHeader>Hold on!</AlertDialogHeader>
          <AlertDialogBody>
            In Advanced Segment, you can only choose one container.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef as RefObject<any>}
              onClick={keepItHandler}
              w="134px"
            >
              Keep it
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              w="134px"
              onClick={changeItHandler}
            >
              Change it
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
