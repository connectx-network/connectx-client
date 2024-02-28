import { Icons } from "@/components/icons";
import { Flex, Group, Image, Stack, Text, Title } from "@mantine/core";

const CardEventHorizontal = () => {
  return (
    <Group
      wrap="nowrap"
      style={{
        maxWidth: "400px",
        padding: "12px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        background: "white",
      }}
    >
      <Image
        src="https://www.animesenpai.net/wp-content/uploads/2024/02/kpodka-1024x577.jpg.webp"
        alt="card"
        w={100}
        h={120}
        radius={8}
      />
      <Flex
        direction="column"
        justify="space-between"
        align="flex-start"
        gap={20}
      >
        <Stack gap={4}>
          <Text>hh/dd/mm/yy</Text>
          <Title order={5}>Name of Event</Title>
        </Stack>
        <Flex gap={8} align="center">
          <Icons.location />
          <Text c="gray">Location</Text>
        </Flex>
      </Flex>
    </Group>
  );
};

export default CardEventHorizontal;
