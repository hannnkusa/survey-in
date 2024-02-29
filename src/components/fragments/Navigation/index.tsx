"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  GridItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Avatar,
  Text,
  Heading,
  Button,
  IconButton,
  Switch,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.svg";

import { NAV_URLS } from "@/constants/links";

import Grid from "@/components/elements/Grid";

import { ChevronRightIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import styles from "./index.module.css";

import { useAuthStore } from "@/stores/auth";

import useNavigation from "./index.hook";

import { handleLogout as logout } from "@/firebase/auth/logout";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Navigation() {
  const { setCurrentUser, currentUser } = useAuthStore();
  const { createSupportLink } = useNavigation();
  const { replace, push } = useRouter();
  const [display, changeDisplay] = useState(["none", "none", "none", "none"]);
  const { isOpen, onToggle } = useDisclosure();

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    Cookies.remove("current-user");
    Cookies.remove("signed-id");
    replace("/login");
    location.reload();
  };

  return (
    <Flex
      bg="linear-gradient(82.73deg, var(--chakra-colors-main-blue4) -19.44%, var(--chakra-colors-main-blue3) 82.97%, var(--chakra-colors-main-blue1) 106.96%)"
      paddingX={["14px", "14px", "64px", "64px"]}
      w="100%"
      h="100%"
      // justifyContent="center"
      alignItems="center"
    >
      <Grid templateRows="1fr" gap={3} placeContent="center" w="100%">
        <GridItem alignSelf="center" colSpan={2}>
          <Link href={"/"}>
            <Box
              position="relative"
              width={[137, 137, 137, 137]}
              height={[30, 30, 27, 27]}
            >
              <Image
                src={logo}
                alt="logo"
                sizes="1024px"
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            </Box>
          </Link>
        </GridItem>
        <GridItem colSpan={10}>
          {/* Desktop */}
          <Flex
            color="white"
            justifyContent="space-between"
            alignItems="center"
            display={["none", "none", "flex", "flex"]}
          >
            {NAV_URLS.map(({ text, url }, index) => {
              if (currentUser && text === "My Account") {
                return (
                  <Box key={index}>
                    <Popover>
                      <PopoverTrigger>
                        <Button variant="unstyled" fontWeight={400}>
                          My Account
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent color="#193742" borderRadius="40px">
                        <PopoverArrow />
                        {/* <PopoverCloseButton /> */}
                        <PopoverHeader padding="32px">
                          <Flex justifyContent="center" alignItems="center">
                            <Flex direction="column">
                              <Avatar
                                size="lg"
                                name={currentUser?.displayName ?? ""}
                                src={currentUser?.photoURL ?? ""}
                              />
                              <Heading as="h3" size="lg" marginTop="16px">
                                {currentUser.displayName}
                              </Heading>
                            </Flex>
                            <IconButton
                              variant="unstyled"
                              aria-label="Call Segun"
                              size="lg"
                              icon={<ChevronRightIcon boxSize={10} />}
                            />
                          </Flex>
                        </PopoverHeader>
                        <PopoverBody paddingX="32px">
                          <Flex
                            direction="column"
                            justifyContent="flex-start"
                            gap={2}
                          >
                            {currentUser?.userDetail?.role ===
                              "super-admin" && (
                              <Flex
                                onClick={() => {
                                  push("/app-control");
                                }}
                                fontWeight={400}
                                fontSize={16}
                                cursor="pointer"
                                w="100%"
                              >
                                Super Admin
                              </Flex>
                            )}
                            <Flex
                              onClick={handleLogout}
                              fontWeight={400}
                              fontSize={16}
                              cursor="pointer"
                              w="100%"
                            >
                              Logout
                            </Flex>
                          </Flex>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Box>
                );
              } else {
                if (text === "Support") {
                  return (
                    <Link
                      key={index}
                      href={createSupportLink(currentUser)}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {text}
                    </Link>
                  );
                } else {
                  return (
                    <Link key={index} href={url}>
                      {text}
                    </Link>
                  );
                }
              }
            })}
          </Flex>

          {/* Mobile */}
          <IconButton
            aria-label="Open Menu"
            size="lg"
            ml="auto"
            variant="unstyled"
            icon={
              display[0] === "flex" ? (
                <CloseIcon color="#FFFFFF" />
              ) : (
                <HamburgerIcon color="#FFFFFF" />
              )
            }
            onClick={() =>
              changeDisplay(
                display[0] === "flex"
                  ? ["none", "none", "none", "none"]
                  : ["flex", "flex", "none", "none"]
              )
            }
            display={["flex", "flex", "none", "none"]}
          />
          {/* <Switch color="green" isChecked={isDark} onChange={toggleColorMode} /> */}
        </GridItem>
      </Grid>
      {/* Mobile Content */}
      <Flex
        w="100vw"
        display={display}
        bgColor="gray.50"
        zIndex={1000}
        h="100vh"
        pos="fixed"
        top={69}
        left="0"
        overflowY="auto"
        flexDir="column"
      >
        <Flex flexDir="column" alignItems="flex-end" justifyContent="center">
          {NAV_URLS.map(({ text, url }, index) => {
            if (currentUser && text === "My Account") {
              return (
                <Flex
                  key={index}
                  direction="column"
                  alignItems="flex-end"
                  justifyContent="center"
                >
                  <Flex>
                    <Button
                      as="a"
                      variant="ghost"
                      aria-label={text}
                      my={5}
                      fontWeight={500}
                      onClick={onToggle}
                    >
                      {text}
                    </Button>
                  </Flex>
                  <Collapse in={isOpen} animateOpacity>
                    <Flex
                      direction="column"
                      color="#193742"
                      borderRadius="40px"
                      background="#FFFFFF"
                      padding="32px"
                      gap={4}
                      w="100%"
                    >
                      <Flex justifyContent="center" alignItems="center">
                        <Flex direction="column">
                          <Avatar
                            size="lg"
                            name={currentUser?.displayName ?? ""}
                            src={currentUser?.photoURL ?? ""}
                          />
                          <Heading as="h3" size="lg" marginTop="16px">
                            {currentUser.displayName}
                          </Heading>
                        </Flex>
                        <IconButton
                          variant="unstyled"
                          aria-label="Call Segun"
                          size="lg"
                          icon={<ChevronRightIcon boxSize={10} />}
                        />
                      </Flex>
                      <Flex
                        direction="column"
                        justifyContent="flex-start"
                        gap={2}
                      >
                        {currentUser?.userDetail?.role === "super-admin" && (
                          <Flex
                            onClick={() => {
                              push("/app-control");
                            }}
                            fontWeight={400}
                            fontSize={16}
                            cursor="pointer"
                            w="100%"
                          >
                            Super Admin
                          </Flex>
                        )}
                        <Flex
                          onClick={handleLogout}
                          fontWeight={400}
                          fontSize={16}
                          cursor="pointer"
                          w="100%"
                        >
                          Logout
                        </Flex>
                      </Flex>
                    </Flex>
                  </Collapse>
                </Flex>
              );
            } else {
              return (
                <Link
                  key={index}
                  href={
                    text === "Support" ? createSupportLink(currentUser) : url
                  }
                  rel={text === "Support" ? "noopener noreferrer" : ""}
                  target={text === "Support" ? "_blank" : ""}
                >
                  <Button
                    as="a"
                    variant="ghost"
                    aria-label={text}
                    my={5}
                    fontWeight={500}
                  >
                    {text}
                  </Button>
                </Link>
              );
            }
          })}
        </Flex>
      </Flex>
    </Flex>
  );
}
