import { Icons } from "@/components/icons";
import { Avatar, Flex, Stack, Title } from "@mantine/core";
import Link from "next/link";

const sidebarList = [
  {
    title: "My Profile",
    icon: <Icons.profile />,
    path: "/",
  },
  {
    title: "Message",
    icon: <Icons.messageCircle />,
    path: "/message",
  },
  {
    title: "Calender",
    icon: <Icons.calender />,
    path: "/calender",
  },
  {
    title: "Bookmark",
    icon: <Icons.bookmark />,
    path: "/bookmark",
  },
  {
    title: "Contact Us",
    icon: <Icons.mail />,
    path: "/contact-us",
  },
  {
    title: "Settings",
    icon: <Icons.setting />,
    path: "/setting",
  },
  {
    title: "Helps & FAQs",
    icon: <Icons.questionMarkCircle />,
    path: "/helps-faqs",
  },
  {
    title: "Sign Out",
    icon: <Icons.signout />,
    path: "/sign-out",
  },
];

const Sidebar = () => {
  return (
    <>
      <Stack>
        <Avatar variant="light" radius="xl" size="lg" color="blue" src="" />
        <Title order={2} c="dark" fz={24}>
          Johny Deep
        </Title>
      </Stack>
      <Stack mt={48} gap={4}>
        {sidebarList.map((item, index) => (
          <Flex
            key={index}
            gap={12}
            p={12}
            className="hover:bg-slate-100 rounded-md hover:cursor-pointer"
          >
            {item.icon}
            <Link className="no-underline text-black" href={item.path}>
              {item.title}
            </Link>
          </Flex>
        ))}
      </Stack>
    </>
  );
};

export default Sidebar;
