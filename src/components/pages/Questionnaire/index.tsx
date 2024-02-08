"use client";

import {
  Stack,
  Text,
  Heading,
  Flex,
  Grid,
  GridItem,
  Box,
  Spinner,
} from "@chakra-ui/react";

import Button from "@/components/elements/Button";
import MainLayout from "@/components/layouts/MainLayout";

import Link from "next/link";

import { useQuestionnaireList } from "@/services/questionnaire";
import List from "./_components/List";
import LoaderOverlay from "@/components/elements/LoaderOverlay";
import { useAuthStore } from "@/stores/auth";

export default function QuestionnaireComponent() {
  const { currentUser } = useAuthStore();
  const { data, isLoading } = useQuestionnaireList({
    userId: currentUser?.uid ?? "",
  });

  return (
    <MainLayout>
      <Grid>
        <GridItem>
          <LoaderOverlay isLoading={isLoading} />
          <Stack spacing="4">
            <Grid
              templateColumns="repeat(12, 1fr)"
              gap={4}
              w="100%"
              position="fixed"
              background="#FFF"
              top="69"
              h="60px"
              paddingY="40px"
              paddingX="12px"
            >
              <GridItem colSpan={4}>Survey Title</GridItem>
              <GridItem colSpan={2}>Progress</GridItem>
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
              {data?.data?.map((val, index) => (
                <List data={val} key={index} />
              ))}
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
    </MainLayout>
  );
}
