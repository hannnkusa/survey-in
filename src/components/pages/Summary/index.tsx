import MainLayout from "@/components/layouts/MainLayout";

import { Flex } from "@chakra-ui/react";

export default function SummaryComponent() {
  return (
    <MainLayout>
      <Flex
        justifyContent="center"
        alignItems="center"
        paddingTop={26}
        flexDirection="column"
      >
        <Flex>
          <Flex boxShadow="0px 8px 10px 1px rgba(8, 67, 115, 0.15)"></Flex>
          <Flex></Flex>
        </Flex>
      </Flex>
    </MainLayout>
  );
}
