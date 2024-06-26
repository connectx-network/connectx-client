"use client";
import { Icons } from "@/components/icons";
import { ROUTER, TOKEN_KEY } from "@/constant";
import { useAuthStore } from "@/store/auth.store";
import { clearToken } from "@/utils";
import { Avatar, Group, Menu } from "@mantine/core";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

type UserMenuProps = {
  user: {
    name: string;
    avatar: string;
  };
};

const UserMenu = (props: UserMenuProps) => {
  const { user } = props;
  const router = useRouter();
  const { auth, setAuth } = useAuthStore();

  const handleSignOut = () => {
    clearToken(TOKEN_KEY.ACCESS);
    clearToken(TOKEN_KEY.REFRESH);
    setAuth({ isAuthenticated: false, user: null });
    router.push(ROUTER.HOME);
  };
  return (
    <Menu
      position="bottom-end"
      shadow="md"
      width={150}
      trigger="hover"
      openDelay={100}
      closeDelay={400}
    >
      <Menu.Target>
        <Group gap={7} className="hover:cursor-pointer">
          <Avatar
            src={user.avatar}
            alt={user.name}
            radius="xl"
            size={32}
            variant="transparent"
          >
            <IconUser className="w-7 h-7" color="#74c0fc" />
          </Avatar>
        </Group>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Setting</Menu.Label>
        <Menu.Item
          leftSection={<IconUser color="#74c0fc" />}
          onClick={() => router.push(ROUTER.PROFILE)}
        >
          My Profile
        </Menu.Item>
        <Menu.Item
          leftSection={<IconLogout color="#74c0fc" />}
          onClick={() => handleSignOut()}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;
