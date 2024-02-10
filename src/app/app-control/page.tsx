"use client";

import { Box, Heading } from "@chakra-ui/react";
import { useAuthStore } from "@/stores/auth";

export default function AdminSide() {
  const { currentUser } = useAuthStore();
  return (
    <Box>
      <Heading>Welcome, {currentUser?.displayName}</Heading>
    </Box>
  );
}
