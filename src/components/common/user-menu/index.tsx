"use client";
import { Icons } from "@/components/icons";
import { Avatar, Group, Text } from "@mantine/core";

type UserMenuProps = {
  user: {
    name: string;
    avatar: string;
  };
};

const UserMenu = (props: UserMenuProps) => {
  const { user } = props;
  return (
    <Group gap={7} className="hover:cursor-pointer">
      <Avatar
        src={user.avatar}
        alt={user.name}
        radius="xl"
        size={32}
        variant="transparent"
      >
        <Icons.user className="w-7 h-7" />
      </Avatar>
    </Group>
  );
};

export default UserMenu;
