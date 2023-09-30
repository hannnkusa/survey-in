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

import Button from "@/components/elements/Button";
import Grid from "@/components/elements/Grid";
import Navigation from "@/components/fragments/Navigation";

import JoinWithUsVignette from "./_assets/join_us_vignette.png";

import {
  FOOTER_CARD,
  MIDDLE_CARDS,
  MIDDLE_EMPHASIZE,
  MIDDLE_TITLE,
  RIGHT_MAIN_CARD,
  RIGHT_MAIN_CARD_EMPHASIZE,
} from "./_constants/copywritings";

import Carousel from "./_components/Carousel";

import styles from "./index.module.css";
import { Fragment } from "react";

export default function HomeComponent() {
  const renderWordWithEmphasize = (words: string, emphasize: string[]) => {
    const splittedWords = words.split(" ");
    return splittedWords.map((word, index) => (
      <Fragment key={index}>
        {emphasize.includes(word) ? (
          <span className={styles.rightMainCardEmphasized}>{word}</span>
        ) : (
          word
        )}
        {index === splittedWords.length - 1 ? "" : " "}
      </Fragment>
    ));
  };

  return (
    <Grid>
      <GridItem colSpan={12} h="18vh" maxHeight={69} zIndex={10}>
        <Navigation />
      </GridItem>
      <GridItem colSpan={12} overflow="scroll" maxHeight="calc(100vh - 69px)">
        <Grid gap={12} paddingBottom={20}>
          <GridItem colSpan={12}>
            <Carousel />
          </GridItem>
          <GridItem gridColumn="1 / -1" p="0 4.4vw">
            <Flex justifyContent="space-between">
              <Box
                w="40vw"
                maxW={640}
                h="44vh"
                maxH={415}
                borderRadius={80}
                bg="main.grey1"
              ></Box>
              <Card
                w="40vw"
                maxW={640}
                h="44vh"
                maxH={415}
                borderRadius={80}
                boxShadow="4px 10px 24px 2px rgba(0, 0, 0, 0.10)"
                p={14}
              >
                <Heading as="h2" size="xl" fontWeight="600">
                  {renderWordWithEmphasize(
                    RIGHT_MAIN_CARD.title,
                    RIGHT_MAIN_CARD_EMPHASIZE
                  )}
                  .
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
          <GridItem gridColumn="1 / 8" p="0 4.4vw">
            <Heading as="h2" size="3xl" fontWeight="normal">
              {renderWordWithEmphasize(MIDDLE_TITLE, MIDDLE_EMPHASIZE)}
            </Heading>
          </GridItem>
          <GridItem gridColumn="1 / -1" p="0 4.4vw">
            <Flex justifyContent="space-between">
              {MIDDLE_CARDS.map(({ icon, title, description }, index) => (
                <Card
                  w="25.3vw"
                  maxW={364.92}
                  h="27vh"
                  maxH={204}
                  p={4}
                  key={index}
                  borderRadius={40}
                  boxShadow="4px 10px 24px 2px rgba(0, 0, 0, 0.10)"
                  textAlign="center"
                  boxSizing="content-box"
                >
                  <Image
                    className={styles.centerAligned}
                    alt="title"
                    src={icon}
                    width={55}
                    height={55}
                  />
                  <Heading
                    as="h4"
                    fontSize={28}
                    marginTop={15}
                    marginBottom={4}
                    fontWeight="600"
                  >
                    {index + 1}. {title}
                  </Heading>
                  <Text size="lg">{description}</Text>
                </Card>
              ))}
            </Flex>
          </GridItem>
          <GridItem gridColumn="1 / -1" p="0 4.4vw">
            <Card border="none" boxShadow="none">
              <Grid>
                <GridItem
                  bg="linear-gradient(82.73deg, var(--chakra-colors-main-blue4) -19.44%, var(--chakra-colors-main-blue3) 82.97%)"
                  color="white"
                  colSpan={6}
                  p={50}
                  borderTopLeftRadius="80px"
                  borderBottomLeftRadius="80px"
                >
                  <Heading as="h2" size="2xl" fontWeight="600">
                    {FOOTER_CARD.title}
                  </Heading>
                  <br />
                  <OrderedList paddingLeft="48px">
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
                <GridItem colSpan={6}>
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
