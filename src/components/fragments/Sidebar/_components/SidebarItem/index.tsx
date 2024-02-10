import { Button } from "@chakra-ui/react";

import Link from "next/link";

import { SidebarItems } from "./index.types";

import { usePathname } from "next/navigation";

export default function RenderSidebarItem({ title, link }: SidebarItems) {
  const pathname = usePathname();
  return (
    <Link href={`/app-control/${link}`}>
      <Button
        variant="unstyled"
        borderRightRadius="20px"
        w="100%"
        h="55px"
        textAlign="left"
        paddingLeft="32px"
        background="#F5F5F5"
        transition="box-shadow 0.3s ease-in-out"
        _hover={{
          boxShadow: "0px 12px 16px -4px rgba(8, 67, 115, 0.50)",
        }}
        boxShadow={
          pathname === `/app-control/${link}`
            ? "0px 8px 16px -4px rgba(8, 67, 115, 0.30)"
            : ""
        }
      >
        {title}
      </Button>
    </Link>
  );
}
