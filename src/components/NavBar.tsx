import { ROUTER, TOKEN_KEY } from "@/constant";
import { getToken } from "@/utils";
import { Avatar, Flex, Group, NavLink, Space, Text } from "@mantine/core";
import { Icons } from "./icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const avatarUrl = getToken(TOKEN_KEY.AVATAR_URL);
  const fullName = getToken(TOKEN_KEY.FULLNAME);
  const NAVBAR_ITEMS = [
    { title: "My Profile", icon: <Icons.user />, href: ROUTER.PROFILE },
    { title: "Messages", icon: <Icons.messageCircle />, href: ROUTER.MESSAGE },
    { title: "Calendar", icon: <Icons.calendar />, href: ROUTER.CALENDAR },
    { title: "Bookmark", icon: <Icons.bookmark />, href: ROUTER.BOOKMARK },
    { title: "Contact us", icon: <Icons.mail />, href: ROUTER.CONTACT_US },
    { title: "Settings", icon: <Icons.setting />, href: ROUTER.SETTINGS },
    {
      title: "Helps & FAQs",
      icon: <Icons.helpCircle />,
      href: ROUTER.HELPS_FAQS,
    },
  ];
  const pathname = usePathname();

  return (
    <div>
      <Avatar src={avatarUrl} alt="User avatar" w={60} h={60} />
      <Text fz={19} fw={500}>
        {fullName}
      </Text>
      <Space h={"lg"} />
      <Space h={"xl"} />
      {NAVBAR_ITEMS.map((link) => (
        <>
          <NavLink
            href={link.href}
            label={link.title}
            leftSection={link.icon}
            active={pathname === link.href}
          ></NavLink>
          <Space h={"md"} />
        </>
      ))}
      <NavLink
        href="#"
        label="Sign Out"
        leftSection={<Icons.loginOutline />}
      ></NavLink>
    </div>
  );
};
