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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

import { SearchIcon } from "@chakra-ui/icons";

import { useUserList, putUserUpdateStatus } from "@/services/user";
import { title } from "case";
import { useDebounce } from "use-debounce";

import { useQueryClient } from "@tanstack/react-query";

import { CustomerModalComponent } from "@/components/pages/Admin/User/Customer";

export default function TransactionOrderPage() {
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

  const { isLoading, data } = useUserList({ search: debouncedSearch });

  const handleChangeStatus = async (id: string, disabled: boolean) => {
    try {
      await putUserUpdateStatus({ disabled: !disabled }, id);
      queryClient.invalidateQueries(["user"]);
      toast({
        title: `Success`,
        description: "User Status updated successfully",
        status: "success",
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `Failed`,
        description: "User status failed to update",
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" pt="12px" pl="24px" pr="56px">
      <Heading mb="32px" color="#00ADF0" fontWeight={600} fontSize={40}>
        Users
      </Heading>
      <Flex justifyContent="space-between" mb="24px">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input placeholder="Search" onChange={handleSearchChange} w="500px" />
        </InputGroup>
        <Button
          bg="#B5F3D9"
          color="#3B9E8C"
          fontWeight={400}
          fontSize={16}
          borderRadius={34}
          onClick={onOpen}
        >
          Register
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID User</Th>
              <Th>Nama</Th>
              <Th>Role</Th>
              <Th textAlign="center">Status</Th>
              <Th textAlign="center">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data.map((val, idx) => (
              <Tr key={idx}>
                <Td>{val.uid}</Td>
                <Td>{val.displayName}</Td>
                <Td>{title(val.role)}</Td>
                <Td textAlign="center">
                  <Flex justifyContent="center" alignItems="center" gap="24px">
                    <Text
                      fontSize="md"
                      color={resolveStatusColor(val?.disabled)}
                      textTransform="capitalize"
                      fontWeight={500}
                    >
                      {val?.disabled ? "inactive" : "active"}
                    </Text>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<ChevronDownIcon />}
                        variant="outline"
                      />
                      <MenuList>
                        <MenuItem
                          onClick={() => {
                            handleChangeStatus(val.uid, val.disabled);
                          }}
                        >
                          <Text
                            fontSize="md"
                            color={resolveStatusColor(!val?.disabled)}
                            textTransform="capitalize"
                            fontWeight={500}
                          >
                            {!val?.disabled ? "inactive" : "active"}
                          </Text>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                </Td>
                <Td textAlign="center">
                  <Button
                    bg="#E1F3FA"
                    color="#437284"
                    fontWeight={400}
                    fontSize={16}
                    borderRadius={34}
                    onClick={async () => {
                      await setSelectedData(val);
                      onOpen();
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
      <CustomerModalComponent
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
    </Flex>
  );
}
