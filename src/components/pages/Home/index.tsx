"use client";
import { Fragment } from "react";

import {
  Box,
  Card,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";

import Button from "@/components/elements/Button";

import JoinWithUsVignette from "./_assets/join_us_vignette.png";

import {
  FOOTER_CARD,
  MIDDLE_CARDS,
  MIDDLE_EMPHASIZE1,
  MIDDLE_TITLE1,
  MIDDLE_EMPHASIZE2,
  MIDDLE_TITLE2,
  RIGHT_MAIN_CARD,
  RIGHT_MAIN_CARD_EMPHASIZE,
} from "./_constants/copywritings";

import Carousel from "./_components/Carousel";

import styles from "./index.module.css";
import MainLayout from "@/components/layouts/MainLayout";

import Link from "next/link";
import { constructWAChat } from "@/utils/helper";
import { phone_number } from "./index.constants";

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

  const createSupportLink = () => {
    return constructWAChat({
      head: "Halo+Ka%2C+saya+ingin+mendaftar+sebagai+responden+survey.in",
      body: `username+%3A+%0D%0Aemail+%3A+`,
      phone_number,
    });
  };

  return (
    <MainLayout>
      <Flex gap={12} paddingBottom={[0, 0, 20, 20]} direction="column">
        <Flex paddingX={["24px", "24px", "0", "0"]}>
          <Carousel />
        </Flex>
        <Flex paddingX={["24px", "24px", "0", "0"]}>
          <Flex direction="column" display={["flex", "flex", "none", "none"]}>
            <Heading as="h2" size="xl" fontWeight="700" fontSize={24}>
              {renderWordWithEmphasize(
                RIGHT_MAIN_CARD.title,
                RIGHT_MAIN_CARD_EMPHASIZE
              )}
            </Heading>
            <br />
            <OrderedList spacing="16px">
              {RIGHT_MAIN_CARD.list.map((text, index) => (
                <ListItem key={index} fontWeight={500} fontSize={16}>
                  {text}
                </ListItem>
              ))}
            </OrderedList>
          </Flex>
        </Flex>
        <Flex gap="11.4vh" paddingX={["24px", "24px", "0", "0"]}>
          <Box
            w="100%"
            h={["100%", "100%", "4125px", "4125px"]}
            maxH={415}
            borderRadius={[24, 24, 80, 80]}
            bg="main.grey1"
          >
            <video
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "inherit",
                top: 0,
                left: 0,
              }}
              controls
              autoPlay
              loop
              muted
            >
              <source
                src="/static/videos/Tutorial Surveyin.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </Box>
          <Card
            w="100%"
            maxW={560}
            h="44vh"
            maxH={415}
            borderRadius={80}
            boxShadow="4px 10px 24px 2px rgba(0, 0, 0, 0.10)"
            p={14}
            display={["none", "none", "flex", "flex"]}
            justifyContent="center"
            alignItems="center"
          >
            <Heading as="h2" size="xl" fontWeight="700">
              {renderWordWithEmphasize(
                RIGHT_MAIN_CARD.title,
                RIGHT_MAIN_CARD_EMPHASIZE
              )}
            </Heading>
            <br />
            <OrderedList spacing={2}>
              {RIGHT_MAIN_CARD.list.map((text, index) => (
                <ListItem key={index} fontWeight={500}>
                  {text}
                </ListItem>
              ))}
            </OrderedList>
          </Card>
        </Flex>
        <Flex direction="column" paddingX={["24px", "24px", "0", "0"]}>
          <Heading as="h2" fontSize={[24, 24, 64, 64]} fontWeight="700">
            {renderWordWithEmphasize(MIDDLE_TITLE1, MIDDLE_EMPHASIZE1)}
          </Heading>
          <Heading as="h2" fontSize={[24, 24, 64, 64]} fontWeight="700">
            {renderWordWithEmphasize(MIDDLE_TITLE2, MIDDLE_EMPHASIZE2)}
          </Heading>
        </Flex>
        {/* Desktop */}
        <Flex gap="3.3vh" display={["none", "none", "flex", "flex"]}>
          {MIDDLE_CARDS.map(({ icon, title, description }, index) => (
            <Flex
              w={["", "", "100%", "100%"]}
              // maxW={364.92}
              // h="27vh"
              // maxH={204}
              direction="column"
              p="3.3vh"
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
                marginTop="3.3vh"
                marginBottom="1.6vh"
                fontWeight="600"
              >
                {title}
              </Heading>
              <Text>{description}</Text>
            </Flex>
          ))}
        </Flex>
        {/* Mobile */}
        <Flex
          gap="16px"
          paddingX="24px"
          display={["flex", "flex", "none", "none"]}
          direction="column"
        >
          {MIDDLE_CARDS.map(({ icon, title, description }, index) => (
            <Flex
              w={["", "", "100%", "100%"]}
              // maxW={364.92}
              // h="27vh"
              // maxH={204}
              direction="column"
              p="3.3vh"
              key={index}
              borderRadius={24}
              boxShadow="0px 8px 16px -4px rgba(8, 67, 115, 0.3)"
              textAlign="center"
              boxSizing="content-box"
            >
              <Image
                className={styles.centerAligned}
                alt="title"
                src={icon}
                width={32}
                height={32}
              />
              <Heading
                as="h4"
                fontSize={24}
                marginTop="3.3vh"
                marginBottom="1.6vh"
                fontWeight="600"
              >
                {title}
              </Heading>
              <Text fontWeight={400} fontSize={16}>
                {description}
              </Text>
            </Flex>
          ))}
        </Flex>
        {/* Dekstop */}
        <Flex display={["none", "none", "flex", "flex"]} w="100%">
          <Flex
            bg="#1287DB"
            color="white"
            pl="10.1vh"
            py="64px"
            pr="32px"
            borderTopLeftRadius="80px"
            borderBottomLeftRadius="80px"
            direction="column"
            w="100%"
            // maxW={740}
          >
            <Heading as="h4" size="xl" fontWeight="600">
              {FOOTER_CARD.title}
            </Heading>
            <Heading as="h2" size="2xl" fontWeight="600">
              {FOOTER_CARD.description}
            </Heading>
            <br />
            <OrderedList spacing="16px">
              {FOOTER_CARD.list.map((text, index) => (
                <ListItem key={index}>{text}</ListItem>
              ))}
            </OrderedList>
            <br />
            <Link
              href={createSupportLink()}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button bg="#C7E8F5" color="#193742" p="1.6vh" w="236px">
                Sign Up
              </Button>
            </Link>
          </Flex>
          <Image
            className={styles.vignetteImg}
            alt="Join with us"
            src={JoinWithUsVignette}
            height={551}
            width={568}
          />
        </Flex>
        {/* Mobile */}
        <Flex display={["flex", "flex", "none", "none"]} direction="column">
          <Image alt="Join with us" src={JoinWithUsVignette} />
          <Flex
            bg="#1287DB"
            color="white"
            pl="24px"
            pt="16px"
            pb="40px"
            direction="column"
          >
            <Heading as="h4" size="xl" fontWeight="600">
              {FOOTER_CARD.title}
            </Heading>
            <Heading as="h2" size="2xl" fontWeight="600">
              {FOOTER_CARD.description}
            </Heading>
            <br />
            <OrderedList spacing="16px">
              {FOOTER_CARD.list.map((text, index) => (
                <ListItem key={index}>{text}</ListItem>
              ))}
            </OrderedList>
            <br />
            <Link
              href={createSupportLink()}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button bg="#C7E8F5" color="#193742" p="1.6vh" w="160px">
                Sign Up
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </MainLayout>
  );
}
