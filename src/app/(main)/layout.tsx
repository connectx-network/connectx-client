"use client";
import { AppShell, Burger, Flex, Group, Image, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NextImage from "next/image";

import ConnectXLogo from "@images/logo/logo.png";
import { Sidebar } from "@/components/layout";
import { useRouter } from "next/navigation";
import { ROUTER } from "@/constant";
import { SearchSpotlight } from "@/components/common";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Flex h="100%" justify="space-between" align="center">
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Group
              className="hover:cursor-pointer"
              onClick={() => router.push(ROUTER.HOME)}
            >
              <Image
                component={NextImage}
                src={ConnectXLogo}
                alt="Connect X Logo"
                w={48}
                h={48}
                priority
              />
              <Text>Connect X</Text>
            </Group>
          </Group>
          <SearchSpotlight />
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
