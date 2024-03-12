"use client";

import { ROUTER } from "@/constant";
import {
  Stack,
  NavLink,
  Text,
  useComputedColorScheme,
  Flex,
  Title,
} from "@mantine/core";
import {
  IconCalendarEvent,
  IconHome,
  IconMapPin,
  IconMail,
} from "@tabler/icons-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

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
    path: ROUTER.MAP,
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
  {
    title: "Contact Us",
    icon: <IconMail color="#74c0fc" />,
    path: ROUTER.CONTACT_US,
  },
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

type SidebarProps = {
  onClose: () => void;
};

const Sidebar = (props: SidebarProps) => {
  const { onClose } = props;
  const pathname = usePathname();
  const computedColorScheme = useComputedColorScheme();
  const router = useRouter();

  const redirectPage = (target: string) => {
    router.push(target);
    onClose();
  };
  return (
    <Stack justify="space-between" className="h-screen">
      <Stack gap={4}>
        {sidebarList.map((item, index) => (
          <NavLink
            onClick={() => redirectPage(item.path)}
            active={pathname === item.path}
            key={index}
            leftSection={item.icon}
            label={
              <Text c={computedColorScheme === "dark" ? "white" : "black"}>
                {item.title}
              </Text>
            }
          ></NavLink>
        ))}
      </Stack>
      <div className="block md:hidden">
        <Flex gap={2}>
          <Title order={4} w={"50%"} className="flex-1">
            ConnectX App is available now
          </Title>
          <div className="flex-1">
            <a href="https://play.google.com/store/apps/details?id=com.twendee.connectx&pcampaignid=web_share">
              <Image
                alt="Download ConnectX from Google Play Store"
                width={200}
                height={50}
                src={"/images/download-google.png"}
                className="object-cover rounded-xl cursor-pointer"
              />
            </a>
            <a href="https://apps.apple.com/vn/app/connectx-network/id6478659561?l=vi">
              <Image
                alt="Download ConnectX from AppStore"
                width={200}
                height={50}
                src={"/images/download-apple.png"}
                className="object-cover rounded-xl cursor-pointer"
              />
            </a>
          </div>
        </Flex>
      </div>
    </Stack>
  );
};

export default Sidebar;
