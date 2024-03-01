"use client";

import { Box, Flex, Text, Stack } from "@chakra-ui/react";

import RenderSidebarItem from "./_components/SidebarItem";

import { SIDEBAR_URLS } from "@/constants/links";

export default function Navigation() {
  return (
    <Box
      boxShadow="0px 8px 16px 1px rgba(8, 67, 115, 0.20)"
      h="91vh"
      borderBottomRightRadius="24px"
      pt="24px"
      pr="32px"
      overflowX="auto"
    >
      <Flex direction="column">
        {SIDEBAR_URLS.map((menu, idx) => {
          return (
            <Stack key={idx} gap="24px">
              {!!menu.title && (
                <Text mt="18px" ml="32px" fontWeight={600} fontSize={20}>
                  {menu.title}
                </Text>
              )}
              <Stack gap="12px">
                {menu.sidebarItems.map((item, sIndex) => (
                  <RenderSidebarItem {...item} key={sIndex} />
                ))}
              </Stack>
            </Stack>
          );
        })}
      </Flex>
    </Box>
  );
}
