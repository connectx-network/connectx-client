"use client";

import { ROUTER } from "@/constant";
import { Stack, NavLink, Text, useComputedColorScheme } from "@mantine/core";
import { IconCalendarEvent, IconHome, IconMapPin } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarList = [
  {
    title: "Home",
    icon: <IconHome color="#74c0fc" />,
    path: ROUTER.HOME,
  },
  {
    title: "Events",
    icon: <IconCalendarEvent color="#74c0fc" />,
    path: ROUTER.EVENT,
  },
  {
    title: "Maps",
    icon: <IconMapPin color="#74c0fc" />,
    path: ROUTER.EVENT,
  },
  // {
  //   title: "Message",
  //   icon: <Icons.messageCircle />,
  //   path: ROUTER.MESSAGE,
  // },
  // {
  //   title: "Calender",
  //   icon: <Icons.calender />,
  //   path: ROUTER.CALENDAR,
  // },
  // {
  //   title: "Bookmark",
  //   icon: <Icons.bookmark />,
  //   path: ROUTER.BOOKMARK,
  // },
  // {
  //   title: "Contact Us",
  //   icon: <Icons.mail />,
  //   path: ROUTER.CONTACT_US,
  // },
  // {
  //   title: "Settings",
  //   icon: <IconSettings color="#74c0fc" />,
  //   path: ROUTER.SETTINGS,
  // },
  // {
  //   title: "Helps & FAQs",
  //   icon: <IconHelpCircle color="#74c0fc" />,
  //   path: ROUTER.HELPS_FAQS,
  // },
];

const Sidebar = () => {
  const pathname = usePathname();
  const computedColorScheme = useComputedColorScheme();

  return (
    <>
      <Stack gap={4}>
        {sidebarList.map((item, index) => (
          <Link href={item.path} key={item.path}>
            <NavLink
              active={pathname === item.path}
              key={index}
              leftSection={item.icon}
              label={
                <Text c={computedColorScheme === "dark" ? "white" : "black"}>
                  {item.title}
                </Text>
              }
            ></NavLink>
          </Link>
        ))}
      </Stack>
    </>
  );
};

export default Sidebar;
