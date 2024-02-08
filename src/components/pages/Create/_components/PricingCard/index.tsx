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
  tabIndex,
  disabledCheckoutButton,
  ...restProps
}: PricingCardProps) {
  return (
    <ScaleFade initialScale={0} in={isOpen}>
      <Grid
        w="34.2vh"
        boxShadow="0px 8px 16px -4px rgba(8, 67, 115, 0.30)"
        borderRadius="40px"
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
            fontSize={24}
            isDisabled={disabledCheckoutButton}
          >
            {buttonTitle}
          </Button>
        </GridItem>
      </Grid>
    </ScaleFade>
  );
}
