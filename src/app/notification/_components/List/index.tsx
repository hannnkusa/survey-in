import { FC } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Badge,
} from "@chakra-ui/react";
import { ListComponentProps } from "./index.types";
import { useAuthStore } from "@/stores/auth";
import Link from "next/link";

import { putNotificationReadedCondition } from "@/services/notification";

import dayjs from "dayjs";

const List: FC<ListComponentProps> = ({ data }) => {
  const { currentUser } = useAuthStore();
  const { id, url, title, description, created_at, readed } = data;

  const handleChangeReadedCondition = async (id: string) => {
    await putNotificationReadedCondition({ readed: true }, id);
  };

  return (
    <Link
      href={
        currentUser?.userDetail?.role === "super-admin"
          ? `/app-control${url}`
          : ""
      }
    >
      <Card
        gap={4}
        boxShadow="0px 8px 16px -4px rgba(8, 67, 115, 0.30)"
        borderRadius="16px"
        p="16px"
        alignContent="center"
        transition="box-shadow 0.3s ease-in-out"
        _hover={{
          boxShadow: "0px 12px 16px -4px rgba(8, 67, 115, 0.50)",
        }}
        variant="unstyled"
        size="sm"
        onClick={() => {
          handleChangeReadedCondition(id);
        }}
      >
        <CardHeader>
          <Heading size="md">
            {title}
            {!readed && (
              <Badge ml="3" fontSize="0.8em" colorScheme="green">
                New
              </Badge>
            )}
          </Heading>
        </CardHeader>
        <CardBody>
          <Text pt="2" fontSize="sm">
            {description}
          </Text>
          <Text pt="2" fontSize="sm">
            {dayjs(created_at).format("dddd[,] D MMMM YYYY")}
          </Text>
        </CardBody>
      </Card>
    </Link>
  );
};

export default List;
