"use client";

import {
  Stack,
  Text,
  Heading,
  Flex,
  Grid,
  GridItem,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import Button from "@/components/elements/Button";
import MainLayout from "@/components/layouts/MainLayout";

import Link from "next/link";

import { useQuestionnaireList } from "@/services/questionnaire";
import List from "./_components/List";
import LoaderOverlay from "@/components/elements/LoaderOverlay";
import { useAuthStore } from "@/stores/auth";

import dayjs from "dayjs";
import { resolveStatusColor, currencyFormat } from "@/utils/helper";

export default function QuestionnaireComponent() {
  const { currentUser } = useAuthStore();
  const { data, isLoading } = useQuestionnaireList({
    userId: currentUser?.uid ?? "",
  });

  return (
    <MainLayout>
      {/* Desktop */}
      <LoaderOverlay isLoading={isLoading} />
      <Grid display={["none", "none", "grid", "grid"]}>
        <GridItem>
          <Stack spacing="4">
            <Grid
              templateColumns="repeat(12, 1fr)"
              gap={4}
              w="93vw"
              position="fixed"
              background="#FFF"
              top="69"
              h="60px"
              paddingY="40px"
              paddingX="12px"
            >
              <GridItem colSpan={4}>Survey Title</GridItem>
              <GridItem colSpan={2}>Price</GridItem>
              <GridItem colSpan={2}>Updated</GridItem>
              <GridItem colSpan={4}>Status</GridItem>
            </Grid>
            <Flex
              direction="column"
              paddingTop="52px"
              paddingBottom="140px"
              paddingX="12px"
              maxW="100%"
              overflowY="auto"
              gap="24px"
            >
              {data?.data && data?.data.length > 0 ? (
                data?.data?.map((val, index) => <List data={val} key={index} />)
              ) : !isLoading ? (
                <Alert status="info">
                  <AlertIcon />
                  You haven&apos;t created any questionnaires yet! Click the
                  &quot;create new&quot; button below to create a new one
                </Alert>
              ) : null}
            </Flex>
          </Stack>
          <Flex
            bg="white"
            h="120px"
            w="100%"
            position="absolute"
            left={0}
            bottom={0}
            zIndex={100}
            paddingTop="32px"
            paddingRight="61px"
            boxShadow="4px -10px 24px 2px rgba(0, 0, 0, 0.06)"
            justifyContent="end"
          >
            <Link href="/questionnaire/create">
              <Button
                primary
                p="24px"
                fontWeight={500}
                fontSize={16}
                w="236px"
                h="56px"
                borderRadius="34px"
              >
                Create New
              </Button>
            </Link>
          </Flex>
        </GridItem>
      </Grid>
      {/* Mobile */}
      <Stack
        w="100%"
        mb="32px"
        display={["flex", "flex", "none", "none"]}
        px="24px"
      >
        <Heading
          color="#00ADF0"
          fontWeight={600}
          fontSize={24}
          textAlign="center"
          mb="32px"
        >
          My Questionnaire
        </Heading>
        <Stack spacing="4" marginBottom="96px">
          {data?.data && data?.data.length > 0 ? (
            data?.data?.map((val, index) => (
              <Link href={`/questionnaire/${val?.id}`} key={index}>
                <Flex
                  boxShadow="0px 8px 16px -4px rgba(8, 67, 115, 0.30)"
                  direction="column"
                  padding="16px"
                  borderRadius="16px"
                  gap="8px"
                >
                  <Text fontSize="xl" as="b">
                    {val?.questionnaire_title}
                  </Text>
                  <Text fontSize="md">
                    {dayjs(val?.created_at).format("DD MMM YYYY")}
                  </Text>
                  <Text fontSize="xl" fontWeight="400">
                    Price: Rp {currencyFormat(val?.questionnaire_total_price)}
                  </Text>
                  <Text fontSize="xl" fontWeight="400">
                    Updated: {dayjs(val?.updated_at).format("DD MMM YYYY")}
                  </Text>
                  <Flex>
                    <Text fontSize="xl" fontWeight="400" mr="8px">
                      Status:
                    </Text>
                    <Text
                      fontSize="xl"
                      color={resolveStatusColor(val?.status)}
                      textTransform="capitalize"
                    >
                      {val?.status}
                    </Text>
                  </Flex>
                </Flex>
              </Link>
            ))
          ) : !isLoading ? (
            <Alert status="info">
              <AlertIcon />
              You haven&apos;t created any questionnaires yet! Click the
              &quot;create new&quot; button below to create a new one
            </Alert>
          ) : null}
        </Stack>
        <Flex
          bg="white"
          h="88px"
          w="100%"
          position="absolute"
          left={0}
          bottom={0}
          zIndex={100}
          paddingTop="18px"
          paddingRight="26px"
          boxShadow="4px -10px 24px 2px rgba(0, 0, 0, 0.06)"
          justifyContent="end"
        >
          <Link href="/questionnaire/create">
            <Button
              primary
              p="24px"
              fontWeight={500}
              fontSize={16}
              w="160px"
              h="40px"
              borderRadius="50px"
            >
              Create New
            </Button>
          </Link>
        </Flex>
      </Stack>
    </MainLayout>
  );
}
