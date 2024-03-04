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
  ActionIcon,
} from "@mantine/core";
import { MESSAGES } from "../mock";
import { Icons } from "@/components/icons";

const PersonalChatPage = () => {
  return (
    <div className="bg-slate-50">
      <Flex gap={8} className="sticky top-[60px] bg-white z-[1] pt-1">
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
      <Stack className="overflow-y-auto no-scrollbar flex-1 pt-4 min-h-[70vh]">
        {MESSAGES.map((message) => (
          <MessageItem key={message.timestamp} message={message} />
        ))}
      </Stack>
      <Space h={28} />
      <Flex
        className="sticky bottom-[16px] w-full"
        justify={"center"}
        align={"center"}
      >
        <TextInput
          size="lg"
          radius={16}
          placeholder="Type something..."
          w={"100%"}
          rightSection={
            <ActionIcon variant="outline" color="white" size={46} radius={16}>
              <Icons.sendMessage />
            </ActionIcon>
          }
        />
      </Flex>
    </div>
  );
};

export default PersonalChatPage;
