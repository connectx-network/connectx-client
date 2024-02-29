"use client";

import { Icons } from "@/components/icons";
import { ROUTER } from "@/constant";
import { Stack, NavLink } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarList = [
  {
    title: "Home",
    icon: <Icons.home />,
    path: ROUTER.HOME,
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
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <Stack gap={4}>
        {sidebarList.map((item, index) => (
          <Link href={item.path} key={item.path}>
            <NavLink
              active={pathname === item.path}
              key={index}
              leftSection={item.icon}
              label={item.title}
            ></NavLink>
          </Link>
        ))}
      </Stack>
    </>
  );
};

export default Sidebar;
