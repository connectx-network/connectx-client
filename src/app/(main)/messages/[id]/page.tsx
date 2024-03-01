import { Avatar, Divider, Flex, Title, Text, Stack } from "@mantine/core";

const PersonalChatPage = () => {
  return (
    <div>
      <Flex gap={8}>
        <Avatar src={"https://picsum.photos/200"} w={48} h={48} />
        <div>
          <Title order={2} c="dark" fz={24}>
            Chats
          </Title>
          <Text c="dimmed" fz={12}>
            Active 25 minutes ago
          </Text>
        </div>
      </Flex>
      <Divider />
    </div>
  );
};

export default PersonalChatPage;
