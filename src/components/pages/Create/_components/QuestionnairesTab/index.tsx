import {
  Flex,
  Heading,
  Card,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import Button from "@/components/elements/Button";

import Image from "next/image";

import styles from "./index.module.css";

import dropLink from "../../_assets/dropLink.svg";

import { questionnairesTabProps } from "./index.types";

export default function QuestionnairesTab({
  isFormShown,
  onSubmitForm,
  submittedUrl,
  onHideForm,
  onShowForm,
}: questionnairesTabProps) {
  const questionnaire = submittedUrl ? (
    <Flex gap="2vw" w="100%">
      <iframe
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        className={styles.gdocsIframe}
        src={submittedUrl}
      />
    </Flex>
  ) : (
    <form onSubmit={onSubmitForm}>
      <Flex
        flexDirection="column"
        gap="4vh"
        maxW={["90vw", "90vw", "none", "none"]}
      >
        <InputGroup
          _visited={{
            borderColor: "none",
          }}
        >
          <InputLeftElement pointerEvents="none">
            <LinkIcon marginTop="3px" />
          </InputLeftElement>
          <Input
            className={styles.inputLink}
            required
            // pattern="^.*docs.google.com/forms.*$"
            name="url"
            type="url"
            placeholder="https://docs.google.com/forms"
            htmlSize={40}
            width="auto"
            height="46px"
          />
        </InputGroup>
        <Flex flexDirection="column" gap="2vh">
          <Button primary type="submit">
            Submit
          </Button>
          <Button
            type="button"
            onClick={onHideForm}
            color="main.grey3"
            bg="white"
            border="1px solid var(--chakra-colors-main-grey2)"
          >
            Cancel
          </Button>
        </Flex>
      </Flex>
    </form>
  );

  return (
    <Flex
      // w={["80vw", "80vw", "100%", "100%"]}
      w="100%"
      alignItems="center"
      gap={isFormShown ? "4vh" : "12vh"}
      flexDir="column"
    >
      {isFormShown && !submittedUrl ? (
        <Heading
          as="h2"
          size="xl"
          color="main.blue2"
          fontWeight={600}
          marginTop="7.3vh"
        >
          Let&apos;s Start Your Survey!
        </Heading>
      ) : null}
      {questionnaire}
      {/* {isFormShown ? (
      ) : (
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap="4vh"
        >
          <Heading mt="4vh" color="#00ADF0">
            Let’s Start Your Survey!
          </Heading>
          <Card
            borderRadius={60}
            boxShadow="4px 10px 24px 2px rgba(0, 0, 0, 0.10)"
            w="80%"
            p="12%"
            as="button"
            _hover={{
              bg: "main.grey1",
            }}
            onClick={onShowForm}
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              flexDir="column"
            >
              <Image alt="Drop Link" src={dropLink} width={78} />
              <Heading
                as="h3"
                size="lg"
                margin="30px 0 15px"
                color="main.blue2"
                fontWeight={600}
              >
                Paste Link
              </Heading>
              <Text color="main.blue2">
                Questionnaire URL from other platform
              </Text>
            </Flex>
          </Card>
        </Flex>
      )} */}
    </Flex>
  );
}
