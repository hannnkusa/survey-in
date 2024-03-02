"use client";

import { useState } from "react";
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  SimpleGrid,
  Box,
  Heading,
  Text,
  Skeleton,
} from "@chakra-ui/react";

import { useRatingList, useRatingSummary } from "@/services/rating";

import LoaderOverlay from "@/components/elements/LoaderOverlay";
import StarRating from "@/components/fragments/StarRating";

export default function UserCustomerPage() {
  const [rating, setRating] = useState<number>(0);

  const { isLoading, data } = useRatingList({ rating });
  const { isLoading: isLoadingRatingSummary, data: dataRatingSummary } =
    useRatingSummary();

  return (
    <Flex direction="column" pt="12px" pl="24px" pr="56px">
      <Heading mb="32px" color="#00ADF0" fontWeight={600} fontSize={40}>
        Ratings
      </Heading>
      <Skeleton isLoaded={!isLoadingRatingSummary} borderRadius="30px">
        <SimpleGrid columns={6} spacing="40px">
          <Flex
            cursor="pointer"
            direction="column"
            justifyContent="center"
            alignItems="center"
            gap={2}
            transition="box-shadow 0.3s ease-in-out"
            boxShadow="0px 8px 10px 1px rgba(8, 67, 115, 0.15)"
            _hover={{
              boxShadow: "0px 12px 16px -4px rgba(8, 67, 115, 0.50)",
            }}
            borderRadius="30px"
            bg={rating === 0 ? "#E1F3FA" : "#FFFFFF"}
            p="12px"
            onClick={() => setRating(0)}
          >
            <Text>Semua</Text>
            <Text>({dataRatingSummary?.data?.rating_picked_total})</Text>
          </Flex>
          {dataRatingSummary?.data?.rating_summary.map((val, index) => (
            <Flex
              cursor="pointer"
              direction="column"
              justifyContent="center"
              alignItems="center"
              key={index}
              gap={2}
              transition="box-shadow 0.3s ease-in-out"
              boxShadow="0px 8px 10px 1px rgba(8, 67, 115, 0.15)"
              _hover={{
                boxShadow: "0px 12px 16px -4px rgba(8, 67, 115, 0.50)",
              }}
              borderRadius="30px"
              bg={rating === val?.rating_value ? "#E1F3FA" : "#FFFFFF"}
              p="12px"
              onClick={() => setRating(val?.rating_value)}
            >
              <StarRating rating={val?.rating_value} size={4} isDisabled />
              <Text>({val?.rating_picked})</Text>
            </Flex>
          ))}
        </SimpleGrid>
      </Skeleton>
      <TableContainer maxH="65vh" overflowY="auto" mt={8}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nama</Th>
              <Th>Email</Th>
              <Th>Rating</Th>
              <Th>Feedback</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data && data?.data.length > 0
              ? data?.data.map((val, idx) => (
                  <Tr key={idx}>
                    <Td>{val.created_by_name}</Td>
                    <Td>{val.created_by_email}</Td>
                    <Td>
                      <StarRating rating={val?.rating} size={5} />
                    </Td>
                    <Td>
                      <Text textColor={val.feedback ? "" : "gray.400"}>
                        {val.feedback || "No feedback given"}
                      </Text>
                    </Td>
                  </Tr>
                ))
              : !isLoading && (
                  <Tr>
                    <Td colSpan={4}>
                      <Text textAlign="center" textColor="gray.400">
                        No Data Found
                      </Text>
                    </Td>
                  </Tr>
                )}
          </Tbody>
        </Table>
      </TableContainer>
      <LoaderOverlay isLoading={isLoading || isLoadingRatingSummary} />
    </Flex>
  );
}
