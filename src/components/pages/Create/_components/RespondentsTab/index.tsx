import {
  Flex,
  Grid,
  GridItem,
  RadioGroup,
  Radio,
  Stack,
  ButtonGroup,
  Heading,
  Text,
  Box,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import Button from "@/components/elements/Button";

import Counter from "@/components/fragments/Counter";

import { RespondentsTabProps } from "./index.types";
import { RespondentDetail } from "../RespondentDetail";
import RadioButtonGroup from "@/components/elements/RadioCard";

export default function RespondentsTab({
  respondentSegment,
  setRespondentSegment,
  respondentsCounter,
  setRespondentsCounter,
  respondentDetail,
  setRespondentDetail,
  respondentType,
  setRespondentType,
  isOpen,
  onOpen,
  onClose,
}: RespondentsTabProps) {
  return (
    <Flex
      w="100%"
      boxShadow="0px 8px 16px 1px rgba(8, 67, 115, 0.20);"
      direction="column"
      borderRadius="60px"
      overflow="hidden"
    >
      <Box background="#00ADF0" pl="60px" paddingY="21px">
        <Heading color="#FFF" as="h4" size="md">
          Respondent Segment
        </Heading>
      </Box>
      <Stack paddingX="60px" paddingTop="37px" paddingBottom="31px" gap={6}>
        <Flex>
          <RadioGroup onChange={setRespondentSegment} value={respondentSegment} gap={3}>
            <Stack>
              <Radio value="random" size="lg">
                Random
              </Radio>
              <Radio value="segmented" size="lg">
                Segmented
              </Radio>
            </Stack>
          </RadioGroup>
        </Flex>
        {respondentSegment === "segmented" && (
          <Stack gap={6}>
            <Divider h="2px" background="#E3E3E3" />
            <Flex w="100%" justifyContent="center" gap={4}>
              <RadioButtonGroup
                name={"respondent-type"}
                defaultValue={""}
                onChange={setRespondentType}
                options={["basic", "advanced", "request-segment"]}
              />
            </Flex>
            {!!respondentDetail && (
              <Flex direction="column" gap={2}>
                <Grid templateColumns="repeat(12, 1fr)">
                  <GridItem colSpan={6}>
                    <Text>Gender</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text>: </Text>
                  </GridItem>
                  <GridItem colSpan={5}>
                    <Text textAlign="right">Male</Text>
                  </GridItem>
                </Grid>
                <Grid templateColumns="repeat(12, 1fr)">
                  <GridItem colSpan={6}>
                    <Text>Age</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text>: </Text>
                  </GridItem>
                  <GridItem colSpan={5}>
                    <Text textAlign="right">19 - 25</Text>
                  </GridItem>
                </Grid>
                <Grid templateColumns="repeat(12, 1fr)">
                  <GridItem colSpan={6}>
                    <Text>Relationship Status</Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text>: </Text>
                  </GridItem>
                  <GridItem colSpan={5}>
                    <Text textAlign="right">Single; Divorced</Text>
                  </GridItem>
                </Grid>
              </Flex>
            )}
          </Stack>
        )}
        <GridItem>
          <Counter
            value={respondentsCounter}
            setValue={setRespondentsCounter}
          />
        </GridItem>
      </Stack>
      <RespondentDetail
        isOpen={isOpen ?? false}
        onClose={onClose as () => void}
        onOpen={onOpen as () => void}
        onToggle={function (): void {
          throw new Error("Function not implemented.");
        }}
        isControlled={false}
        getButtonProps={function (props?: any) {
          throw new Error("Function not implemented.");
        }}
        getDisclosureProps={function (props?: any) {
          throw new Error("Function not implemented.");
        }}
        respondentType={respondentType}
      />
    </Flex>
  );
}
