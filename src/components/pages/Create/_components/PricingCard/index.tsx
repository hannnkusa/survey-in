"use client";

import { Grid, GridItem, Center, Text, ScaleFade } from "@chakra-ui/react";

import Button from "@/components/elements/Button";

import { currencyFormat } from "@/utils/helper";

import { PricingCardProps } from "./index.types";

export default function PricingCard({
  price,
  buttonAction,
  buttonTitle,
  isOpen,
  ...restProps
}: PricingCardProps) {
  return (
    <ScaleFade initialScale={0.9} in={isOpen}>
      <Grid
        w="34.2vh"
        boxShadow="0px 8px 16px -4px rgba(8, 67, 115, 0.30)"
        h="13.9vh"
        borderRadius="40px"
        {...restProps}
      >
        <GridItem h="100%" alignItems="center">
          <Center h="100%">
            <Text fontSize={25} textAlign="center">
              Rp. {currencyFormat(price)}
            </Text>
          </Center>
        </GridItem>
        <GridItem h="100%">
          <Button
            primary
            onClick={buttonAction}
            w="100%"
            h="100%"
            borderRadius="0px 0px 40px 40px"
          >
            {buttonTitle}
          </Button>
        </GridItem>
      </Grid>
    </ScaleFade>
  );
}
