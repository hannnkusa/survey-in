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
  Text,
  Heading,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

import { SearchIcon } from "@chakra-ui/icons";

import { useReligionList } from "@/services/religion";
import { title } from "case";
import { useDebounce } from "use-debounce";

import { useQueryClient } from "@tanstack/react-query";

import { CustomerModalComponent } from "@/components/pages/Admin/User/Customer";

import StarRating from "@/components/fragments/StarRating";

export default function MasterDataReligionPage() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const resolveStatusColor = (disabled: boolean) => {
    return disabled ? "#F62525" : "#3ED556";
  };

  const [selectedData, setSelectedData] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  };

  const { isLoading, data } = useReligionList();

  return (
    <Flex direction="column" pt="12px" pl="24px" pr="56px">
      <Heading mb="32px" color="#00ADF0" fontWeight={600} fontSize={40}>
        Agama
      </Heading>
      {/* <Flex justifyContent="space-between" mb="24px">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input placeholder="Search" onChange={handleSearchChange} w="500px" />
        </InputGroup>
      </Flex> */}
      <TableContainer maxH="65vh" overflowY="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nama</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data.map((val, idx) => (
              <Tr key={idx}>
                <Td>{val.id}</Td>
                <Td>{val.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
