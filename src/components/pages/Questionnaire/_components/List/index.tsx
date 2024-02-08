import { FC } from "react";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import { resolveStatusColor } from "@/utils/helper";
import { ListComponentProps } from "./index.types";
import Link from "next/link";

import dayjs from "dayjs";

const List: FC<ListComponentProps> = ({ data }) => {
  const {
    id,
    questionnaire_title,
    created_at,
    respondent_qty,
    questionnaire_filled,
    updated_at,
    status,
  } = data;

  return (
    <Link href={`/questionnaire/${id}`}>
      <Grid
        templateColumns="repeat(12, 1fr)"
        gap={4}
        boxShadow="0px 8px 16px -4px rgba(8, 67, 115, 0.30)"
        borderRadius="16px"
        p="16px"
        w="100%"
        alignContent="center"
        transition="box-shadow 0.3s ease-in-out"
        _hover={{
          boxShadow: "0px 12px 16px -4px rgba(8, 67, 115, 0.50)",
        }}
      >
        <GridItem colSpan={4}>
          <Text fontSize="xl" as="b">
            {questionnaire_title}
          </Text>
          <Text fontSize="md">{dayjs(created_at).format("DD MMM YYYY")}</Text>
        </GridItem>
        <GridItem colSpan={2} alignSelf="center">
          <Text fontSize="xl" fontWeight="300">
            {questionnaire_filled}/{respondent_qty}
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
    </Link>
  );
};

export default List;
