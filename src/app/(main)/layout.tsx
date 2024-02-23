"use client";
import { AppShell, Burger, Group, Skeleton, Image, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NextImage from "next/image";

import ConnectXLogo from "@images/logo/logo.png";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group>
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
      </AppShell.Header>
      <AppShell.Navbar p="md">
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}