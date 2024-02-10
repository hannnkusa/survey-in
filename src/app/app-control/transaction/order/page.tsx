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
  InputLeftAddon,
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

import { ExampleCustomInput } from "@/components/fragments/Datepicker";
import date from "@/components/fragments/Datepicker/_assets/date.svg";
import Image from "next/image";

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
      <Flex justifyContent="space-between" mb="24px" gap="48px">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input
            placeholder="Surveyor"
            onChange={handleSearchChange}
            maxW={350}
          />
        </InputGroup>

        <Flex w={700} gap={4}>
          <InputGroup>
            <InputLeftAddon>Start Date</InputLeftAddon>
            <DatePicker
              customInput={<ExampleCustomInput />}
              showIcon
              icon={<Image src={date} alt="date" />}
              placeholderText="Start Date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon>End Date</InputLeftAddon>
            <DatePicker
              customInput={<ExampleCustomInput />}
              showIcon
              icon={<Image src={date} alt="date" />}
              placeholderText="End Date"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </InputGroup>
        </Flex>

        <Select
          placeholder="Status"
          onChange={(e) => {
            setStatus(e.target.value);
          }}
          maxW={350}
        >
          <option value="draft">Draft</option>
          <option value="on-going">On-going</option>
          <option value="in review">In review</option>
          <option value="cancelled">Cancelled</option>
          <option value="done">Done</option>
        </Select>
      </Flex>
      <TableContainer maxH="65vh" overflowY="auto">
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
