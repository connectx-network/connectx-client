"use client";

import { Icons } from "@/components/icons";
import { ROUTER, TOKEN_KEY } from "@/constant";
import { useAuthStore } from "@/store/auth.store";
import { getToken } from "@/utils";
import { Avatar, NavLink, Stack, Title } from "@mantine/core";
import { usePathname } from "next/navigation";

const sidebarList = [
  {
    title: "My Profile",
    icon: <Icons.profile />,
    path: ROUTER.PROFILE,
  },
  {
    title: "Message",
    icon: <Icons.messageCircle />,
    path: ROUTER.MESSAGE,
  },
  {
    title: "Calender",
    icon: <Icons.calender />,
    path: ROUTER.CALENDAR,
  },
  {
    title: "Bookmark",
    icon: <Icons.bookmark />,
    path: ROUTER.BOOKMARK,
  },
  {
    title: "Contact Us",
    icon: <Icons.mail />,
    path: ROUTER.CONTACT_US,
  },
  {
    title: "Settings",
    icon: <Icons.setting />,
    path: ROUTER.SETTINGS,
  },
  {
    title: "Helps & FAQs",
    icon: <Icons.questionMarkCircle />,
    path: ROUTER.HELPS_FAQS,
  },
  {
    title: "Sign Out",
    icon: <Icons.signout />,
    path: "#",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { auth } = useAuthStore();

  return (
    <>
      <Stack>
        <Avatar
          variant="light"
          radius="xl"
          size="lg"
          color="blue"
          src={auth.user?.avatarUrl}
        />
        <Title order={2} c="dark" fz={24}>
          {auth.user?.fullName}
        </Title>
      </Stack>
      <Stack mt={48} gap={4}>
        {sidebarList.map((item, index) => (
          <NavLink
            active={pathname === item.path}
            key={index}
            href={item.path}
            leftSection={item.icon}
            label={item.title}
          ></NavLink>
        ))}
      </Stack>
    </>
  );
};

export default Sidebar;
