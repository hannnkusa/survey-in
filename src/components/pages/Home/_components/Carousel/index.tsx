"use client";

import { Box, GridItem, Heading } from "@chakra-ui/react";
import Link from "next/link";

import Button from "@/components/elements/Button";
import Grid from "@/components/elements/Grid";

import styles from "./index.module.css";

export default function Carousel() {
  return (
    <Box
      className={styles.banner}
      width="100vw"
      h={["300px", "300px", "66.21vh", "66.21vh"]}
      borderRadius={["24px", "24px", "80px", "80px"]}
    >
      <Grid gap={13} placeContent="space-between" h="100%">
        <GridItem colSpan={12}>
          <Grid gridTemplateRows="1fr" gridTemplateColumns="1fr">
            <GridItem gridRowStart={1} gridColumnStart={1}>
              <Heading
                className={styles.heading + " " + styles.carousel1}
                as="h1"
                fontSize={[32, 32, 64, 64]}
                fontWeight="600"
              >
                SAVE YOUR TIME, WE GOT YOU COVERED.
              </Heading>
            </GridItem>
            <GridItem gridRowStart={1} gridColumnStart={1}>
              <Heading
                className={styles.heading + " " + styles.carousel2}
                fontSize={[32, 32, 64, 64]}
                as="h1"
                fontWeight="600"
              >
                MAKE RESEARCH EASIER.
              </Heading>
            </GridItem>
            <GridItem gridRowStart={1} gridColumnStart={1}>
              <Heading
                className={styles.heading + " " + styles.carousel3}
                fontSize={[32, 32, 64, 64]}
                as="h1"
                fontWeight="600"
              >
                RIGHT DATA. RIGHT HERE. RIGHT NOW.
              </Heading>
            </GridItem>
            <GridItem gridRowStart={1} gridColumnStart={1}>
              <Heading
                className={styles.heading + " " + styles.carousel4}
                fontSize={[32, 32, 64, 64]}
                as="h1"
                fontWeight="600"
              >
                COLLECT DATA WITHOUT HARD TIMES.
              </Heading>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem colSpan={12}>
          <Link href="/questionnaire/create">
            <Button primary>Get Respondent</Button>
          </Link>
        </GridItem>
      </Grid>
    </Box>
  );
}
