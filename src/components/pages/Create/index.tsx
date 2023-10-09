"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import Image from "next/image";

import Button from "@/components/elements/Button";
import MainLayout from "@/components/layouts/MainLayout";

import dropLink from "./_assets/dropLink.svg";
import success from "./_assets/success.svg";

import useCreate from "./index.hook";

import styles from "./index.module.css";
import Link from "next/link";

export default function CreateComponent() {
  const {
    submittedUrl,
    isFormShown,
    isURLSubmitted,
    onShowForm,
    onHideForm,
    onSubmitForm,
    onSubmitURL,
    onCancelSubmitURL,
  } = useCreate();

  const questionnaire = submittedUrl ? (
    <Flex gap="2vw">
      <iframe className={styles.gdocsIframe} src={submittedUrl} />
      <Card>
        <CardHeader>
          <Text fontSize={25}>Total: Rp. 0</Text>
        </CardHeader>
        <CardBody>
          <Flex direction="column" gap="1vh">
            <Button primary width="22.5vw" onClick={onSubmitURL}>
              Submit
            </Button>
            <Button
              type="button"
              color="main.grey3"
              bg="white"
              border="1px solid var(--chakra-colors-main-grey2)"
              onClick={onCancelSubmitURL}
            >
              Cancel
            </Button>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  ) : (
    <form onSubmit={onSubmitForm}>
      <Flex flexDirection="column" gap="4vh">
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
            pattern="^.*docs.google.com/forms.*$"
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

  const content = isURLSubmitted ? (
    <>
      <Image alt="Successfully submit the link" src={success} width={169} />
      <Heading
        size="xl"
        color="main.blue2"
        textAlign="center"
        margin="20px 0 0"
      >
        Thank You
      </Heading>
      <Text width="70%" textAlign="center" marginBottom="20px">
        Our team will be in touch with you for further updates on your form.
        Additionally, you can monitor your progress by reviewing the responses
        in Google Forms.
      </Text>
      <Link href="/" rel="noopener noreferrer">
        <Button
          onClick={onHideForm}
          color="main.grey3"
          bg="white"
          border="1px solid var(--chakra-colors-main-grey2)"
        >
          Back to Home
        </Button>
      </Link>
    </>
  ) : (
    <Tabs>
      <TabList>
        <Tab>QUESTIONNAIRES</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Flex
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
            {isFormShown ? (
              questionnaire
            ) : (
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
                  <Text>Questionnaire URL from other platform</Text>
                </Flex>
              </Card>
            )}
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );

  return (
    <MainLayout>
      <Flex
        justifyContent="center"
        alignItems="center"
        paddingTop={26}
        flexDirection={isURLSubmitted ? "column" : "row"}
      >
        {content}
      </Flex>
    </MainLayout>
  );
}
