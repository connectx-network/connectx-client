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
} from "@mantine/core";
import { useDisclosure, useResizeObserver } from "@mantine/hooks";
import NextImage from "next/image";

import ConnectXLogo from "@images/logo/logo.png";
import { Sidebar } from "@/components/layout";
import { useRouter } from "next/navigation";
import { ROUTER } from "@/constant";
import { SearchSpotlight } from "@/components/common";
import { useAuthStore } from "@/store/auth.store";
import { Icons } from "@/components/icons";
import UserMenu from "@/components/common/user-menu";
import { eventSearchSpotlight } from "@/components/common/search-spotlight";
import Notification from "@/components/notification";
import { useEffect, useRef } from "react";
import { getUserInfoRequest } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constant/query-key";
import { useAppShellMainStore } from "@/store/app-shell-main.store";
import { showErrorNotification, showSuccessNotification } from "@/utils";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure();
  const { auth, setAuth } = useAuthStore();
  const [ref, rect] = useResizeObserver();
  const { size, setSize } = useAppShellMainStore();

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
  }, [ref, rect, setSize]);
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
                  <Text>Connect X</Text>
                  <Button
                    onClick={() =>
                      showSuccessNotification({
                        message: "asdh adhud w8if",
                        title: "dasbndu 332n 38h",
                      })
                    }
                  >
                    show
                  </Button>
                  <Button
                    onClick={() =>
                      showErrorNotification({
                        message: "asdh adhud w8if",
                        title: "dasbndu 332n 38h",
                      })
                    }
                  >
                    show err
                  </Button>
                </Group>
              </Group>
              <SearchSpotlight />

              <Flex gap={4} align="center" px={16}>
                <ActionIcon
                  variant="subtle"
                  c="gray"
                  size="lg"
                  radius={50}
                  onClick={eventSearchSpotlight.open}
                  hiddenFrom="sm"
                >
                  <Icons.search className="w-5 h-5" />
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
            <Sidebar />
          </AppShell.Navbar>

          <AppShell.Main
            ref={ref}
            style={{
              position: "relative",
              maxWidth: !auth.isAuthenticated ? "960px" : "none",
              margin: !auth.isAuthenticated ? "0 auto" : "0",
            }}
          >
            {children}
          </AppShell.Main>
        </AppShell>
      )}
    </>
  );
}
