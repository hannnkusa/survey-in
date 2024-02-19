"use client";

import { Box, Stack, Text, Heading, Grid, GridItem } from "@chakra-ui/react";

import Image from "next/image";
import company from "./_assets/company.png";
import companyMobile from "./_assets/company_mobile.jpeg";

import MainLayout from "@/components/layouts/MainLayout";

export default function CompanyPage() {
  return (
    <MainLayout>
      {/* Desktop */}
      <Stack w="100%" mb="32px" display={["none", "none", "flex", "flex"]}>
        <Grid templateColumns="repeat(6, 1fr)" mb="40px">
          <GridItem colSpan={3}>
            <Heading color="#00ADF0" fontWeight={600} fontSize={40}>
              About
            </Heading>
            <Text mt="18px" fontWeight={500} fontSize={16}>
              survey.in provide reliable respondents to support surveyor’s
              research become a source of value, growth, and improvement. Our
              mission is to modernize research habit for common development. We
              uphold integrity, accuracy, and commitment in every survey we
              conduct. Our goal is to support our client effort into a
              meaningful piece and to accelerate its growth by providing useful
              and reliable data.
            </Text>
          </GridItem>
        </Grid>
        <Image src={company} alt={"company"} width={1920} />
      </Stack>
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
        >
          About
        </Heading>
        <Text mt="32px" fontWeight={500} fontSize={16} mb="40px">
          survey.in provide reliable respondents to support surveyor’s research
          become a source of value, growth, and improvement. Our mission is to
          modernize research habit for common development. We uphold integrity,
          accuracy, and commitment in every survey we conduct. Our goal is to
          support our client effort into a meaningful piece and to accelerate
          its growth by providing useful and reliable data.
        </Text>
        <Box borderRadius="24px" position="relative" width={1920}>
          <Image
            src={companyMobile}
            alt={"company"}
            sizes="500px"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </Box>
      </Stack>
    </MainLayout>
  );
}
