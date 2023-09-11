"use client";

import {
  Box,
  Card,
  Flex,
  GridItem,
  Heading,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";

import Button from "@/components/Button";
import Grid from "@/components/Grid";

import JoinWithUsVignette from "../_assets/join_us_vignette.png";

import {
  FOOTER_CARD,
  MIDDLE_CARDS,
  MIDDLE_TITLE,
  RIGHT_MAIN_CARD,
} from "../_constants/copywritings";

import { Header } from "./Header";
import Carousel from "./Carousel";

import styles from "../page.module.css";

export default function HomeComponent() {
  return (
    <Grid>
      <GridItem colSpan={12} h="22.2vh" maxHeight={123} zIndex={10}>
        <Header />
      </GridItem>
      <GridItem colSpan={12} overflow="scroll" maxHeight="calc(100vh - 125px)">
        <Grid gap={8} paddingBottom={20}>
          <GridItem colSpan={12}>
            <Carousel />
          </GridItem>
          <GridItem gridColumn="2 / -2">
            <Flex justifyContent="space-between">
              <Box w="40vw" maxW={640} h="44vh" maxH={415} bg="main.grey2">
                Video
              </Box>
              <Card
                w="40vw"
                maxW={640}
                h="44vh"
                maxH={415}
                color="white"
                bg="main.blue2"
                p={14}
              >
                <Heading as="h2" size="xl" fontWeight="normal">
                  {RIGHT_MAIN_CARD.title}
                </Heading>
                <br />
                <OrderedList>
                  {RIGHT_MAIN_CARD.list.map((text, index) => (
                    <ListItem key={index}>{text}</ListItem>
                  ))}
                </OrderedList>
              </Card>
            </Flex>
          </GridItem>
          <GridItem gridColumn="2 / 7">
            <Heading as="h2" size="3xl" fontWeight="normal">
              {MIDDLE_TITLE}
            </Heading>
          </GridItem>
          <GridItem gridColumn="2 / -2">
            <Flex justifyContent="space-between">
              {MIDDLE_CARDS.map(({ title, description }, index) => (
                <Card
                  w="25.3vw"
                  maxW={364.92}
                  h="21.8vh"
                  maxH={204}
                  p={4}
                  key={index}
                  bg="main.grey1"
                  textOverflow="auto"
                >
                  <Heading as="h4" fontSize={28} marginBottom={4}>
                    {index + 1}. {title}
                  </Heading>
                  <Text size="lg">{description}</Text>
                </Card>
              ))}
            </Flex>
          </GridItem>
          <GridItem gridColumn="2 / -2">
            <Card>
              <Grid>
                <GridItem
                  bg="linear-gradient(82.73deg, var(--chakra-colors-main-blue4) -19.44%, var(--chakra-colors-main-blue3) 82.97%, var(--chakra-colors-main-blue1) 106.96%)"
                  color="white"
                  colSpan={7}
                  p={30}
                  borderTopLeftRadius="var(--chakra-radii-md)"
                  borderBottomLeftRadius="var(--chakra-radii-md)"
                >
                  <Heading as="h2" size="2xl" fontWeight="normal">
                    {FOOTER_CARD.title}
                  </Heading>
                  <br />
                  <OrderedList>
                    {FOOTER_CARD.list.map((text, index) => (
                      <ListItem key={index}>{text}</ListItem>
                    ))}
                  </OrderedList>
                  <br />
                  <Button
                    bg="main.grey2"
                    color="white"
                    _hover={{
                      bg: "main.grey3",
                    }}
                  >
                    Sign up as Partner
                  </Button>
                </GridItem>
                <GridItem colSpan={5}>
                  <Image
                    className={styles.vignetteImg}
                    alt="Join with us"
                    src={JoinWithUsVignette}
                  />
                </GridItem>
              </Grid>
            </Card>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
}
