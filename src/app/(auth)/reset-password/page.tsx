import { Icons } from "@/components/icons";
import { Button, Stack, Text, TextInput, Title } from "@mantine/core";

const VerificationPage = () => {
  return (
    <Stack p={12}>
      <Title order={2} c="dark" fz={24}>
        Resset Password
      </Title>
      <Text fw={200}>
        Please enter your email address to request a password reset
      </Text>

      <TextInput
        type="email"
        radius={12}
        size="lg"
        leftSectionPointerEvents="none"
        leftSection={<Icons.mail />}
        placeholder="abc@email.com"
      />
      <Button
        h={58}
        radius={12}
        mt={12}
        variant="gradient"
        gradient={{
          from: "rgba(86, 105, 255, 1)",
          to: "rgba(191, 86, 255, 1)",
          deg: 180,
        }}
        justify="space-between"
        leftSection={<span />}
        rightSection={<Icons.rightArrow />}
        styles={{
          label: {
            fontSize: "16px",
          },
        }}
      >
        SEND
      </Button>
    </Stack>
  );
};

export default VerificationPage;
