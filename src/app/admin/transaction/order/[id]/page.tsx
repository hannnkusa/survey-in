"use client";

import LoaderOverlay from "@/components/elements/LoaderOverlay";
import MainLayout from "@/components/layouts/MainLayout";
import { useQuestionnaireDetail } from "@/services/questionnaire";
import { useOrderQuery, useOrderDetail } from "@/services/order";
import { useAuthStore } from "@/stores/auth";

import {
  Flex,
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  Stack,
  Card,
  CardHeader,
  CardBody,
  Wrap,
  WrapItem,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import dayjs from "dayjs";

import date from "@/components/pages/Summary/_assets/date.svg";
import order from "@/components/pages/Summary/_assets/order.svg";
import link from "@/components/pages/Summary/_assets/link.svg";
import qris from "@/components/pages/Summary/_assets/qris.png";
import upload from "@/components/pages/Summary/_assets/upload.svg";

import Image from "next/image";
import Link from "next/link";

import { useDropzone } from "react-dropzone";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderPostUI } from "@/types/order";
import { addOrderSchema } from "@/validations/order";
import { useRouter } from "next/navigation";
import { title } from "case";
import BackButton from "@/components/elements/BackButton";
import {
  currencyFormat,
  constructRespondentRequirement,
  constructRespondentRequirementsValue,
} from "@/utils/helper";

export default function TransactionOrderDetailPage() {
  const params = useParams();
  const { currentUser } = useAuthStore.getState();

  const questionnaireId = params?.id;

  const { isLoading, data } = useQuestionnaireDetail(questionnaireId as string);
  const { isLoading: isLoadingOrderDetail, data: orderDetail } = useOrderDetail(
    questionnaireId as string
  );
  const { isLoading: isLoadingSubmitOrder, mutateAsync: submitOrder } =
    useOrderQuery(currentUser?.uid);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    reset,
    resetField,
    formState: { errors },
  } = useForm<OrderPostUI>({
    resolver: zodResolver(addOrderSchema),
    defaultValues: {
      email: "",
      file: {
        blobUrl: "",
        name: "",
      },
      full_name: "",
      phone_number: "",
    },
    mode: "all",
  });

  const router = useRouter();

  return (
    <Grid
      alignItems="center"
      // paddingTop="48px"
      flexDirection="column"
      justifyItems="center"
      marginBottom="48px"
    >
      <BackButton left={360} />
      <Heading mt="4vh" as="h2" size="xl" color="main.blue2" fontWeight={600}>
        Order Summary
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap="32px" w="100%" mt="48px">
        <GridItem>
          <Stack gap="32px">
            <Card
              boxShadow="0px 8px 10px 1px rgba(8, 67, 115, 0.15)"
              borderRadius="30px"
              p="32px"
            >
              <CardHeader p={0}>
                <Heading fontSize="24px" fontWeight={500}>
                  Billing Information
                </Heading>
              </CardHeader>

              <CardBody p={0} mt="16px">
                <Grid
                  templateColumns="repeat(2, 1fr)"
                  columnGap="32px"
                  rowGap="12px"
                  w="100%"
                >
                  <GridItem>
                    <Heading size="sm" fontWeight={500}>
                      Payer&apos;s Name
                    </Heading>
                    <Text size="xs" fontWeight={500} color="#6E6E6E">
                      {orderDetail?.data?.full_name}
                    </Text>
                  </GridItem>
                  <GridItem>
                    <Heading size="sm" fontWeight={500}>
                      E-mail
                    </Heading>
                    <Text size="xs" fontWeight={500} color="#6E6E6E">
                      {orderDetail?.data?.email}
                    </Text>
                  </GridItem>
                  <GridItem>
                    <Heading size="sm" fontWeight={500}>
                      Phone Number
                    </Heading>
                    <Text size="xs" fontWeight={500} color="#6E6E6E">
                      {orderDetail?.data?.phone_number}
                    </Text>
                  </GridItem>
                </Grid>
              </CardBody>
            </Card>
            <Card
              boxShadow="0px 8px 10px 1px rgba(8, 67, 115, 0.15)"
              borderRadius="30px"
              p="32px"
            >
              <CardHeader p={0}>
                <Flex gap="32px" w="100%" justifyContent="space-between">
                  <Flex>
                    <Heading fontSize="24px" fontWeight={500}>
                      {data?.questionnaire_title}
                    </Heading>
                  </Flex>
                  <Flex direction="column" justifySelf="end">
                    <Flex
                      justifyContent="end"
                      alignItems="center"
                      mb="8px"
                      gap="4px"
                    >
                      <Image src={date} alt={"Date"} width={24} />
                      <Text fontWeight={500} fontSize="12px" color="#6E6E6E">
                        {dayjs(data?.created_at).format(
                          "ddd[.] D MMM YYYY - h:mA"
                        )}
                      </Text>
                    </Flex>
                    {/* <Flex justifyContent="end">
                        <Image src={order} alt={"Date"} width={24} />
                        <Text>15 Questions</Text>
                      </Flex> */}
                  </Flex>
                </Flex>
              </CardHeader>

              <CardBody p={0} mt="16px">
                <Heading size="sm" fontWeight={500}>
                  Respondent Requirements
                </Heading>
                <Wrap mt="16px" w="100%">
                  <WrapItem w="144px">
                    <Flex justifyContent="end" direction="column">
                      <Heading size="xs" fontWeight={500} color="#6E6E6E">
                        Amount
                      </Heading>
                      <Text color="#193742" fontWeight={500}>
                        {data?.respondent_qty}
                      </Text>
                    </Flex>
                  </WrapItem>
                  {data &&
                    constructRespondentRequirement(data).map(
                      (val: any, idx: any) => (
                        <WrapItem w="144px" key={idx}>
                          <Flex justifyContent="end" direction="column">
                            <Heading size="xs" fontWeight={500} color="#6E6E6E">
                              {val.key}
                            </Heading>
                            <Text color="#193742" fontWeight={500}>
                              {constructRespondentRequirementsValue(val)}
                            </Text>
                          </Flex>
                        </WrapItem>
                      )
                    )}
                </Wrap>
                <Flex mt="32px">
                  <Link
                    href={data?.questionnaire_url ?? ""}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Button
                      leftIcon={<Image src={link} width={24} alt={"link"} />}
                      variant="link"
                      color="#00ADF0"
                      fontWeight={500}
                      fontSize={16}
                      textDecorationLine="underline"
                    >
                      Link here
                    </Button>
                  </Link>
                </Flex>
                <Flex mt="32px" justifyContent="space-between" maxW="80%">
                  <Heading fontWeight={500} size="md">
                    TOTAL
                  </Heading>
                  <Heading fontWeight={500} size="md">
                    {currencyFormat(data?.questionnaire_total_price ?? 0)}
                  </Heading>
                </Flex>
              </CardBody>
            </Card>
          </Stack>
        </GridItem>
        <GridItem>
          <Stack gap="32px">
            <Card
              boxShadow="0px 8px 10px 1px rgba(8, 67, 115, 0.15)"
              borderRadius="30px"
              p="32px"
            >
              <CardHeader p={0}>
                <Heading fontSize="24px" fontWeight={500}>
                  Payment
                </Heading>
              </CardHeader>

              <CardBody p={0} mt="16px">
                <Flex alignItems="center" gap={6}>
                  <Image src={qris} alt={"qris"} width={160} />
                  <Flex direction="column" color="#193742">
                    <Text fontWeight={400} fontSize={16}>
                      BCA A/N
                    </Text>
                    <Text fontWeight={600} fontSize={16}>
                      AXEL ABELARD JEREMY
                    </Text>
                    <Text fontWeight={600} fontSize={16}>
                      4530157356
                    </Text>
                  </Flex>
                </Flex>
                <Text color="#6E6E6E" fontWeight={400} fontSize={"sm"} mt="8px">
                  Questionnaire will be proceed after you upload the payment
                  proof (screenshot of successful payment). Make sure you fill
                  payer’s name with name doing the transaction.
                </Text>
                <Flex mt="40px" direction="column">
                  <Heading size="sm" fontWeight={600}>
                    Payment proof
                  </Heading>
                  {data?.status === "draft" ? (
                    <Flex
                      mt="12px"
                      w="100%"
                      // h="120px"
                      bg="#EFF1F7"
                      borderRadius="8px"
                      py="32px"
                      justifyContent="center"
                      alignItems="center"
                      direction="column"
                    >
                      <Text>No Document Uploaded</Text>
                    </Flex>
                  ) : (
                    <Flex
                      mt="12px"
                      w="100%"
                      // h="120px"
                      bg="#EFF1F7"
                      borderRadius="8px"
                      py="32px"
                      justifyContent="center"
                      alignItems="center"
                      direction="column"
                    >
                      <Image
                        src={orderDetail?.data?.payment_proof_url ?? ""}
                        alt="uploaded"
                        width={480}
                        height={480}
                      ></Image>
                    </Flex>
                  )}
                </Flex>
              </CardBody>
            </Card>
          </Stack>
        </GridItem>
      </Grid>
      <LoaderOverlay
        isLoading={isLoading || isLoadingSubmitOrder || isLoadingOrderDetail}
      />
    </Grid>
  );
}
