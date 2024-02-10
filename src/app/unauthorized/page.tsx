import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Button,
} from "@chakra-ui/react";

import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="480px"
        w="80vw"
        borderRadius={24}
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          401: Access Denied
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          You do not have permission to view this page. Please contact the
          system administrator for assistance
        </AlertDescription>
        <Link href={"/"}>
          <Button margin="12px" variant="outline" colorScheme="red">
            Back To Home
          </Button>
        </Link>
      </Alert>
    </Flex>
  );
}
