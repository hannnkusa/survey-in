"use client";

import { Box, GridItem, Heading } from "@chakra-ui/react";
import Link from "next/link";

import Button from "@/components/elements/Button";
import Grid from "@/components/elements/Grid";

import styles from "./index.module.css";

export default function Carousel() {
  return (
    <Box className={styles.banner}>
      <Grid>
        <GridItem colSpan={8}>
          <Grid gap={13}>
            <GridItem colSpan={12}>
              <Grid gridTemplateRows="1fr" gridTemplateColumns="1fr">
                <GridItem gridRowStart={1} gridColumnStart={1}>
                  <Heading
                    className={styles.heading + " " + styles.carousel1}
                    as="h1"
                    fontSize={64}
                    fontWeight="normal"
                  >
                    SAVE YOUR TIME, WE GOT YOU COVERED.
                  </Heading>
                </GridItem>
                <GridItem gridRowStart={1} gridColumnStart={1}>
                  <Heading
                    className={styles.heading + " " + styles.carousel2}
                    as="h1"
                  >
                    MAKE RESEARCH EASIER.
                  </Heading>
                </GridItem>
                <GridItem gridRowStart={1} gridColumnStart={1}>
                  <Heading
                    className={styles.heading + " " + styles.carousel3}
                    as="h1"
                  >
                    RIGHT DATA. RIGHT HERE. RIGHT NOW.
                  </Heading>
                </GridItem>
                <GridItem gridRowStart={1} gridColumnStart={1}>
                  <Heading
                    className={styles.heading + " " + styles.carousel4}
                    as="h1"
                  >
                    COLLECT DATA WITHOUT HARD TIMES.
                  </Heading>
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem colSpan={12}>
              <Link href="/create">
                <Button primary>Get Respondent</Button>
              </Link>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem colSpan={4}></GridItem>
      </Grid>
    </Box>
  );
}
