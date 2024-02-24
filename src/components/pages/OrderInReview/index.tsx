"use client";

import LoaderOverlay from "@/components/elements/LoaderOverlay";
import MainLayout from "@/components/layouts/MainLayout";
import { useQuestionnaireDetail } from "@/services/questionnaire";
import { useOrderDetail } from "@/services/order";
import { useAuthStore } from "@/stores/auth";

import {
  Flex,
  Heading,
  Text,
  Grid,
  Stack,
  Card,
  CardBody,
  Button,
  IconButton,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import dayjs from "dayjs";

import Link from "next/link";

import success from "./_assets/success.svg";
import copy from "./_assets/copy.svg";

import Image from "next/image";

export default function SummaryComponent() {
  const params = useParams();
  const { currentUser } = useAuthStore.getState();

  const questionnaireId = params?.id;

  const { isLoading, data } = useOrderDetail(questionnaireId as string);
  const toast = useToast();

  const copylink = (e: any) => {
    navigator.clipboard.writeText(data?.data?.id ?? "");
    toast({
      title: "Success",
      description: "Order number successfully copied",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <MainLayout>
      {/* Desktop */}
      <Grid
        justifyItems="center"
        marginBottom="48px"
        display={["none", "none", "grid", "grid"]}
      >
        <Image alt="Successfully submit the link" src={success} width={169} />
        <Heading
          as="h2"
          size="xl"
          color="main.blue2"
          fontWeight={600}
          mt="16px"
          mb="24px"
        >
          Order in review
        </Heading>
        <Card
          boxShadow="0px 8px 16px 1px rgb(8, 67, 115, 0.20)"
          borderRadius={40}
          w={734}
          mb="24px"
        >
          <CardBody py="32px">
            <Stack gap="16px" p={0}>
              <Flex
                background="#EFF1F7"
                direction="column"
                borderRadius={40}
                px="40px"
                py="18px"
              >
                <Heading fontWeight={600} fontSize={18}>
                  Purchase time
                </Heading>
                <Skeleton borderRadius={40} isLoaded={!isLoading}>
                  <Text fontWeight={300} fontSize={16}>
                    {!data && !isLoading
                      ? "Request Segment, Wait From Admin"
                      : dayjs(data?.data?.created_at).format(
                          "dddd[,] D MMMM YYYY"
                        )}
                  </Text>
                </Skeleton>
              </Flex>
              <Flex
                background="#EFF1F7"
                direction="column"
                borderRadius={40}
                px="40px"
                py="18px"
              >
                <Heading fontWeight={600} fontSize={18}>
                  Order number
                </Heading>
                <Skeleton borderRadius={40} isLoaded={!isLoading}>
                  <Flex alignItems="center">
                    {!data && !isLoading ? (
                      <Text fontWeight={300} fontSize={16} mr="56px">
                        Request Segment, Wait From Admin
                      </Text>
                    ) : (
                      <>
                        <Text fontWeight={300} fontSize={16} mr="56px">
                          {data?.data?.id}
                        </Text>
                        <IconButton
                          variant="unstyled"
                          aria-label={"copy"}
                          onClick={copylink}
                          icon={
                            <Image
                              src={copy}
                              alt={"copy to clipboard"}
                              width={22}
                            />
                          }
                        />
                      </>
                    )}
                  </Flex>
                </Skeleton>
              </Flex>
              <Flex
                background="#EFF1F7"
                direction="column"
                borderRadius={40}
                px="40px"
                py="18px"
              >
                <Heading fontWeight={600} fontSize={18}>
                  Buyer’s detail
                </Heading>
                <Skeleton borderRadius={40} isLoaded={!isLoading}>
                  <Text fontWeight={300} fontSize={16}>
                    {!data && !isLoading
                      ? "Request Segment, Wait From Admin"
                      : `${data?.data?.full_name}, ${data?.data?.email}, ${data?.data?.phone_number}`}
                  </Text>
                </Skeleton>
              </Flex>
            </Stack>
          </CardBody>
        </Card>
        <Link href="/questionnaire">
          <Button
            bg="#00ADF0"
            color="#FBF9F9"
            fontWeight={500}
            fontSize={16}
            w="236px"
            h="56px"
            borderRadius="34px"
          >
            Review progress
          </Button>
        </Link>
        <LoaderOverlay isLoading={isLoading} />
      </Grid>

      {/* Mobile */}
      <Stack
        display={["flex", "flex", "none", "none"]}
        w="100%"
        mb="32px"
        px="24px"
        justifyContent="center"
        alignItems="center"
      >
        <Image alt="Successfully submit the link" src={success} width={74} />
        <Heading
          color="#00ADF0"
          fontWeight={600}
          fontSize={24}
          textAlign="center"
          mb="32px"
        >
          Order In Review
        </Heading>
        <Card
          boxShadow="0px 8px 16px 1px rgb(8, 67, 115, 0.20)"
          borderRadius={40}
          w={342}
          mb="24px"
        >
          <CardBody py="16px">
            <Stack gap="16px" p={0}>
              <Flex
                background="#EFF1F7"
                direction="column"
                borderRadius={16}
                px="12px"
                py="8px"
              >
                <Heading fontWeight={300} fontSize={12}>
                  Purchase time
                </Heading>
                <Skeleton borderRadius={16} isLoaded={!isLoading}>
                  <Text fontWeight={500} fontSize={16}>
                    {!data && !isLoading
                      ? "Request Segment, Wait From Admin"
                      : dayjs(data?.data?.created_at).format(
                          "dddd[,] D MMMM YYYY"
                        )}
                  </Text>
                </Skeleton>
              </Flex>
              <Flex
                background="#EFF1F7"
                direction="column"
                borderRadius={16}
                px="12px"
                py="8px"
              >
                <Heading fontWeight={300} fontSize={12}>
                  Order number
                </Heading>
                <Skeleton borderRadius={16} isLoaded={!isLoading}>
                  <Flex alignItems="center">
                    {!data && !isLoading ? (
                      <Text fontWeight={500} fontSize={16} mr="56px">
                        Request Segment, Wait From Admin
                      </Text>
                    ) : (
                      <>
                        <Text fontWeight={500} fontSize={16} mr="56px">
                          {data?.data?.id}
                        </Text>
                        <IconButton
                          variant="unstyled"
                          aria-label={"copy"}
                          onClick={copylink}
                          icon={
                            <Image
                              src={copy}
                              alt={"copy to clipboard"}
                              width={22}
                            />
                          }
                        />
                      </>
                    )}
                  </Flex>
                </Skeleton>
              </Flex>
              <Flex
                background="#EFF1F7"
                direction="column"
                borderRadius={16}
                px="12px"
                py="8px"
              >
                <Heading fontWeight={300} fontSize={12}>
                  Buyer’s detail
                </Heading>
                <Skeleton borderRadius={16} isLoaded={!isLoading}>
                  <Text fontWeight={500} fontSize={16}>
                    {!data && !isLoading
                      ? "Request Segment, Wait From Admin"
                      : `${data?.data?.full_name}, ${data?.data?.email}, ${data?.data?.phone_number}`}
                  </Text>
                </Skeleton>
              </Flex>
            </Stack>
          </CardBody>
        </Card>
        <Link href="/questionnaire">
          <Button
            bg="#00ADF0"
            color="#FBF9F9"
            fontWeight={500}
            fontSize={16}
            w="236px"
            h="56px"
            borderRadius="34px"
          >
            Review progress
          </Button>
        </Link>
        <LoaderOverlay isLoading={isLoading} />
      </Stack>
    </MainLayout>
  );
}
