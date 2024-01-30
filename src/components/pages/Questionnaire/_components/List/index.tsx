import { FC } from "react";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import { resolveStatusColor } from "../../index.utils";
import { ListComponentProps } from "./index.types";

import dayjs from "dayjs";

const List: FC<ListComponentProps> = ({ data }) => {
  const {
    questionnaire_title,
    created_at,
    respondent_qty_target,
    questionnaire_filled,
    updated_at,
    status,
  } = data;

  console.log({ data });
  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      gap={4}
      boxShadow="0px 8px 16px -4px rgba(8, 67, 115, 0.30)"
      borderRadius="16px"
      p="16px"
      w="100%"
      alignContent="center"
    >
      <GridItem colSpan={4}>
        <Text fontSize="xl" as="b">
          {questionnaire_title}
        </Text>
        <Text fontSize="md">{dayjs(created_at).format("DD MMM YYYY")}</Text>
      </GridItem>
      <GridItem colSpan={2} alignSelf="center">
        <Text fontSize="xl" fontWeight="300">
          {respondent_qty_target}/{questionnaire_filled}
        </Text>
      </GridItem>
      <GridItem colSpan={2} alignSelf="center">
        <Text fontSize="xl" fontWeight="300">
          {dayjs(updated_at).format("DD MMM YYYY")}
        </Text>
      </GridItem>
      <GridItem colSpan={4} alignSelf="center">
        <Text
          fontSize="xl"
          color={resolveStatusColor(status)}
          textTransform="capitalize"
        >
          {status}
        </Text>
      </GridItem>
    </Grid>
  );
};

export default List;
