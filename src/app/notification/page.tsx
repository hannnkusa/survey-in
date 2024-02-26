"use client";

import {
  Stack,
  Text,
  Heading,
  Alert,
  AlertIcon,
  StackDivider,
} from "@chakra-ui/react";

import MainLayout from "@/components/layouts/MainLayout";

import { useNotificationList } from "@/services/notification";
import List from "./_components/List";
import LoaderOverlay from "@/components/elements/LoaderOverlay";
import { useAuthStore } from "@/stores/auth";

export default function NotificationComponent() {
  const { currentUser } = useAuthStore();
  const { data, isLoading } = useNotificationList(
    (currentUser?.userDetail?.role === "super-admin"
      ? "super-admin"
      : currentUser?.uid) ?? ""
  );

  return (
    <MainLayout>
      <LoaderOverlay isLoading={isLoading} />
      <Heading
        color="#00ADF0"
        fontWeight={600}
        fontSize={24}
        textAlign="center"
        mb="32px"
      >
        Notification
      </Heading>
      <Stack divider={<StackDivider />} spacing="4" px="24px">
        {data?.data && data?.data.length > 0 ? (
          data?.data?.map((val, index) => <List data={val} key={index} />)
        ) : !isLoading ? (
          <Alert status="info">
            <AlertIcon />
            No notification found
          </Alert>
        ) : null}
      </Stack>
    </MainLayout>
  );
}
