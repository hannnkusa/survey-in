"use client";

import { Box, Flex, GridItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.svg";

import { LOGIN_URL, NAV_URLS, SIGN_UP_URL } from "@/constants/links";

import Button from "@/components/elements/Button";
import Grid from "@/components/elements/Grid";

import styles from "./index.module.css";

export default function Navigation() {
  return (
    <Box
      bg="linear-gradient(82.73deg, var(--chakra-colors-main-blue4) -19.44%, var(--chakra-colors-main-blue3) 82.97%, var(--chakra-colors-main-blue1) 106.96%)"
      p="18px 35px"
    >
      <Grid templateRows="1fr" gap={3}>
        <GridItem alignSelf="center" colSpan={2}>
          <Image width={137} src={logo} alt="logo" />
        </GridItem>
        <GridItem alignSelf="center" colSpan={5}>
          <Flex color="white" justifyContent="space-between">
            {NAV_URLS.map(({ text, url }, index) => (
              <Link key={index} href={url}>
                {text} {index === 0 ? <ChevronDownIcon /> : null}
              </Link>
            ))}
          </Flex>
        </GridItem>
        <GridItem alignSelf="center" gridColumn="-3 / -1">
          <Flex justifyContent="space-between">
            <Link className={styles.navButton} href={LOGIN_URL}>
              <Button size="sm" color="main.grey3" bg="white" p="0 34px">
                Login
              </Button>
            </Link>
            <Link className={styles.navButton} href={SIGN_UP_URL}>
              <Button
                size="sm"
                p="0 26px"
                color="white"
                bg="main.grey2"
                _hover={{
                  bg: "main.grey3",
                }}
              >
                Sign Up
              </Button>
            </Link>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
}
