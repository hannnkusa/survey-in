"use client";

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
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.svg";

import { NAV_URLS } from "@/constants/links";

import Grid from "@/components/elements/Grid";

import { ChevronRightIcon } from "@chakra-ui/icons";

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

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    Cookies.remove("current-user");
    Cookies.remove("signed-id");
    replace("/login");
    location.reload();
  };

  return (
    <Box
      bg="linear-gradient(82.73deg, var(--chakra-colors-main-blue4) -19.44%, var(--chakra-colors-main-blue3) 82.97%, var(--chakra-colors-main-blue1) 106.96%)"
      p="18px 64px"
    >
      <Grid templateRows="1fr" gap={3}>
        <GridItem alignSelf="center" colSpan={2}>
          <Link href={"/"}>
            <Image width={137} src={logo} alt="logo" />
          </Link>
        </GridItem>
        <GridItem alignSelf="center" colSpan={10}>
          <Flex
            color="white"
            justifyContent="space-between"
            alignItems="center"
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
        </GridItem>
      </Grid>
    </Box>
  );
}
