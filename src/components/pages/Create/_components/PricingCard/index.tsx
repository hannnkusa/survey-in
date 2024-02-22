"use client";

import {
  Flex,
  Grid,
  GridItem,
  Center,
  Text,
  ScaleFade,
} from "@chakra-ui/react";

import Button from "@/components/elements/Button";

import { currencyFormat } from "@/utils/helper";

import { PricingCardProps } from "./index.types";

export default function PricingCard({
  price,
  buttonAction,
  buttonTitle,
  isOpen,
  tabIndex,
  disabledCheckoutButton,
  ...restProps
}: PricingCardProps) {
  return (
    <ScaleFade initialScale={0} in={isOpen}>
      {/* Desktop */}
      <Grid
        w="34.2vh"
        boxShadow="0px 8px 16px -4px rgba(8, 67, 115, 0.30)"
        borderRadius="40px"
        display={["none", "none", "grid", "grid"]}
        {...restProps}
      >
        {tabIndex > 0 && (
          <GridItem h="61px" alignItems="center">
            <Center h="100%">
              <Text fontSize={25} textAlign="center">
                Rp. {currencyFormat(price)}
              </Text>
            </Center>
          </GridItem>
        )}
        <GridItem h="61px">
          <Button
            primary
            onClick={buttonAction}
            w="100%"
            h="100%"
            borderRadius={tabIndex > 0 ? "0px 0px 40px 40px" : "40px"}
            fontWeight={600}
            fontSize={[16, 16, 24, 24]}
            isDisabled={disabledCheckoutButton}
          >
            {buttonTitle}
          </Button>
        </GridItem>
      </Grid>
      {/* Mobile */}
      <Flex
        display={["flex", "flex", "none", "none"]}
        w="100vw"
        px="24px"
        {...restProps}
      >
        <Flex
          w="100%"
          h="56px"
          py="8.5px"
          px="10px"
          justifyContent="center"
          alignItems="center"
          borderRadius="24px"
          boxShadow={
            tabIndex > 0 ? "0px 8px 16px 1px rgba(8, 67, 115, 0.2)" : ""
          }
        >
          {tabIndex > 0 && (
            <Flex h="61px" alignItems="center" w="100%">
              <Center h="100%" w="100%">
                <Text fontSize={16} textAlign="center">
                  Rp. {currencyFormat(price)}
                </Text>
              </Center>
            </Flex>
          )}
          <Flex h="40px" w="100%">
            <Button
              primary
              onClick={buttonAction}
              w="100%"
              h="100%"
              borderRadius="20px"
              fontWeight={600}
              fontSize={[16, 16, 24, 24]}
              isDisabled={disabledCheckoutButton}
            >
              {buttonTitle}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </ScaleFade>
  );
}
