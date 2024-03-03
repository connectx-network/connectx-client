import { MessageItem } from "@/components/messages/MessageItem";
import {
  Avatar,
  Divider,
  Flex,
  Title,
  Text,
  Stack,
  TextInput,
  Space,
} from "@mantine/core";
import { MESSAGES } from "../mock";

const PersonalChatPage = () => {
  return (
    <div>
      <Flex gap={8}>
        <Avatar src={"https://picsum.photos/200"} w={48} h={48} />
        <div>
          <Title order={2} c="dark" fz={24}>
            Tony Stark
          </Title>
          <Text c="dimmed" fz={12}>
            Active 25 minutes ago
          </Text>
        </div>
      </Flex>
      <Divider mb={28} />
      <Stack className="overflow-y-scroll no-scrollbar">
        {MESSAGES.map((message) => (
          <MessageItem key={message.timestamp} message={message} />
        ))}
      </Stack>
      <Space h={28} />
      <TextInput size="lg" radius={16} placeholder="Type something..." />
    </div>
  );
};

export default PersonalChatPage;
