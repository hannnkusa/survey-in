"use client";

import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Flex,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

import DatePicker from "react-datepicker";

import { useRouter } from "next/navigation";

import { useQuestionnaireList } from "@/services/questionnaire";
import { currencyFormat, resolveStatusColor } from "@/utils/helper";
import dayjs from "dayjs";
import { useDebounce } from "use-debounce";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

import "./index.module.css";

export default function TransactionOrderPage() {
  const { push } = useRouter();
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [debouncedSearch] = useDebounce(search, 500);

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  };
  const { isLoading, data } = useQuestionnaireList({
    search: debouncedSearch,
    startDate,
    endDate,
    status: status,
  });
  return (
    <Flex direction="column" pt="12px" pl="24px" pr="56px">
      <Heading mb="32px" color="#00ADF0" fontWeight={600} fontSize={40}>
        Transaction
      </Heading>
      <Flex justifyContent="space-between" mb="24px">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input
            placeholder="Surveyor"
            onChange={handleSearchChange}
            // w="500px"
          />
        </InputGroup>

        <Flex>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start Date"
            className="datepicker"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End Date"
          />
        </Flex>

        <Select
          placeholder="Status"
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <option value="draft">Draft</option>
          <option value="on-going">On-going</option>
          <option value="in review">In review</option>
          <option value="cancelled">Cancelled</option>
          <option value="done">Done</option>
        </Select>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Surveyor</Th>
              <Th>Date</Th>
              <Th isNumeric>Amount</Th>
              <Th>Status</Th>
              <Th textAlign="center">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data.map((val, idx) => (
              <Tr key={idx}>
                <Td>{val?.created_by_name}</Td>
                <Td>{dayjs(val?.created_at).format("DD MMM YYYY")}</Td>
                <Td isNumeric>
                  {currencyFormat(val?.questionnaire_total_price)}
                </Td>
                <Td>
                  <Text
                    fontSize="md"
                    color={resolveStatusColor(val?.status)}
                    textTransform="capitalize"
                    fontWeight={500}
                  >
                    {val?.status}
                  </Text>
                </Td>
                <Td textAlign="center">
                  <Button
                    bg="#E1F3FA"
                    color="#437284"
                    fontWeight={400}
                    fontSize={16}
                    borderRadius={34}
                    onClick={() => {
                      push(`/admin/transaction/order/${val.id}`);
                    }}
                  >
                    View
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
