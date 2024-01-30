"use client";

import { Flex, Heading, Input, Text, Checkbox } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

import Button from "@/components/elements/Button";
import MainLayout from "@/components/layouts/MainLayout";

import google from "./_assets/google.svg";
import apple from "./_assets/apple.svg";
import facebook from "./_assets/facebook.svg";

import useAuth from "./index.hook";

export default function LoginComponent() {
  const {
    formData,
    handleChangeForm,
    onSubmitForm,
    handleSignInWithGoogle,
    handleSignInWithFacebook,
  } = useAuth();

  const content = (
    <Flex flexDir="column">
      <Flex direction="column" marginBottom="3vh">
        <Heading as="h2" size="xl" fontWeight={600}>
          Login to your account
        </Heading>
        <Text mt="1.2vh">It’s free and easy</Text>
      </Flex>
      <form onSubmit={onSubmitForm}>
        <Flex direction="column" paddingY="2.5vh" gap="3vh">
          <Flex direction="column">
            <Text>E-mail</Text>
            <Input
              value={formData.email}
              placeholder="Type your e-mail or phone number"
              onChange={(e) => handleChangeForm("email", e)}
            />
          </Flex>
          <Flex direction="column">
            <Text>Password</Text>
            <Input
              type="password"
              value={formData.password}
              placeholder="Type your password"
              onChange={(e) => handleChangeForm("password", e)}
            />
          </Flex>
          <Flex direction="row">
            <Checkbox marginRight="1vh"></Checkbox>
            <Text>
              By creating an account means you agree to the Terms and
              Conditions, and our Privacy Policy
            </Text>
          </Flex>
          <Button primary type="submit">
            Sign Up
          </Button>
          <Flex direction="row" justifyContent="center">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <Text mr={1}>Don't have an account yet?</Text>
            <Link href="/register">
              <Text color="#00ADF0">Register here</Text>
            </Link>
          </Flex>
        </Flex>
      </form>
      <Flex direction="column" alignItems="center">
        <Text marginTop="5.2vh">or do it via other accounts</Text>
        <Flex direction="row" gap="3.2vh" marginTop="2.5vh">
          <Button
            bgColor="white"
            boxShadow="0px 1px 3px 0px rgba(50, 50, 71, 0.10), 0px 0px 1px 0px rgba(12, 26, 75, 0.20)"
            variant="solid"
            borderRadius={26}
            h="52px"
            w="52px"
            onClick={handleSignInWithGoogle}
          >
            <Image alt="Drop Link" src={google} width={24} />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
  return (
    <MainLayout>
      <Flex
        justifyContent="center"
        alignItems="center"
        paddingTop="2vh"
        flexDirection="column"
        paddingX="40vh"
      >
        {content}
      </Flex>
    </MainLayout>
  );
}
