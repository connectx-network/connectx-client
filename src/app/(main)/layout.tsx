"use client";
import {
  ActionIcon,
  AppShell,
  Burger,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NextImage from "next/image";

import ConnectXLogo from "@images/logo/logo.png";
import { Sidebar } from "@/components/layout";
import { Icons } from "@/components/icons";
import { Spotlight, spotlight } from "@mantine/spotlight";
import { useRouter } from "next/navigation";
import { ROUTER } from "@/constant";

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
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
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
          <ActionIcon
            variant="subtle"
            c="gray"
            size="lg"
            radius={50}
            onClick={spotlight.open}
          >
            <Icons.search />
          </ActionIcon>
          <Spotlight
            actions={[]}
            nothingFound="Nothing found..."
            highlightQuery
            searchProps={{
              placeholder: "Search...",
            }}
          />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
