"use client";
import {
  ActionIcon,
  AppShell,
  Burger,
  Button,
  Flex,
  Group,
  Image,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure, useResizeObserver, useOs } from "@mantine/hooks";
import NextImage from "next/image";

import ConnectXLogo from "@images/logo/logo.png";
import { Sidebar } from "@/components/layout";
import { usePathname, useRouter } from "next/navigation";
import { ROUTER } from "@/constant";
import { SearchSpotlight } from "@/components/common";
import { useAuthStore } from "@/store/auth.store";
import UserMenu from "@/components/common/user-menu";
import { eventSearchSpotlight } from "@/components/common/search-spotlight";
import Notification from "@/components/notification";
import { useEffect, useMemo, useRef } from "react";
import { getUserInfoRequest } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constant/query-key";
import { useAppShellMainStore } from "@/store/app-shell-main.store";
import { IconMoon, IconSearch, IconSun } from "@tabler/icons-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure();
  const { auth, setAuth } = useAuthStore();
  const [ref, rect] = useResizeObserver();
  const { size, setSize } = useAppShellMainStore();
  const { setColorScheme } = useMantineColorScheme();
  const os = useOs();
  // const isMobile = os === "ios" || os === "android";
  // const isEventMapPath = pathname === ROUTER.MAP;
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const {
    data: userInfoData,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEY.GET_USER_INFO],
    queryFn: getUserInfoRequest,
    retry: 0,
    enabled: !auth.isAuthenticated,
  });

  useEffect(() => {
    if (isSuccess) {
      setAuth({ isAuthenticated: true, user: userInfoData });
    }
  }, [isSuccess, setAuth, userInfoData]);

  useEffect(() => {
    setSize({
      width: rect.width,
      height: rect.height,
    });
  }, [ref, rect, setSize, pathname]);
  return (
    <>
      {!isLoading && (
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: "sm",
            collapsed: {
              desktop: !auth.isAuthenticated,
              mobile: !opened,
            },
          }}
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
                  <Text className="hidden md:block">Connect X - Network</Text>
                </Group>
              </Group>
              <SearchSpotlight />

              <Flex gap={4} align="center" px={16}>
                <ActionIcon
                  onClick={() =>
                    setColorScheme(
                      computedColorScheme === "light" ? "dark" : "light"
                    )
                  }
                  variant="subtle"
                  c="gray"
                  size="lg"
                  radius={50}
                  aria-label="Toggle color scheme"
                >
                  {computedColorScheme !== "light" ? (
                    <IconSun stroke={1.5} color="white" />
                  ) : (
                    <IconMoon stroke={1.5} color="black" />
                  )}
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  c="gray"
                  size="lg"
                  radius={50}
                  onClick={eventSearchSpotlight.open}
                  hiddenFrom="sm"
                >
                  <IconSearch
                    className="w-5 h-5"
                    stroke={1.5}
                    color={
                      computedColorScheme === "light" ? "black" : "#ffffff"
                    }
                  />
                </ActionIcon>
                {auth.isAuthenticated && auth.user ? (
                  <Flex gap={4} align="center">
                    <Notification />
                    <UserMenu
                      user={{
                        name: auth.user?.fullName,
                        avatar: auth.user?.avatarUrl,
                      }}
                    />
                  </Flex>
                ) : (
                  <Flex gap={8}>
                    <Button
                      variant="gradient"
                      gradient={{
                        from: "rgba(86, 105, 255, 1)",
                        to: "rgba(191, 86, 255, 1)",
                        deg: 180,
                      }}
                      radius="xl"
                      onClick={() => router.push(ROUTER.SIGN_IN)}
                    >
                      Sign-in
                    </Button>
                    <Button
                      variant="outline"
                      color="rgba(86, 105, 255, 1)"
                      radius="xl"
                      onClick={() => router.push(ROUTER.SIGN_UP)}
                      visibleFrom="sm"
                    >
                      Sign-up
                    </Button>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </AppShell.Header>

          <AppShell.Navbar p="md">
            <Sidebar onClose={close} />
          </AppShell.Navbar>

          <AppShell.Main
            ref={ref}
            style={{
              position: "relative",
              maxWidth: !auth.isAuthenticated ? "960px" : "none",
              margin: !auth.isAuthenticated ? "0 auto" : "0",
              // padding: isMobile && isEventMapPath ? "60px 0 0" : "none",
            }}
          >
            {children}
          </AppShell.Main>
        </AppShell>
      )}
    </>
  );
}
