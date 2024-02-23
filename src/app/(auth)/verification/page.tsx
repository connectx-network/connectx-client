import { Icons } from "@/components/icons";
import {
  Button,
  Center,
  Group,
  PinInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";

const VerificationPage = () => {
  return (
    <Stack p={12}>
      <Title order={2} c="dark" fz={24}>
        Verification
      </Title>
      <Text fw={200}>
        We’ve send you the verification code on +1 2620 0323 7631
      </Text>

      <Center my={30}>
        <PinInput
          oneTimeCode
          type="number"
          size="lg"
          styles={{
            input: {
              borderRadius: 12,
              fontWeight: 600,
            },
          }}
        />
      </Center>
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
        CONTINUE
      </Button>
      <Text fw={200} ta="center">
        Re-send code in 0:20
      </Text>
    </Stack>
  );
};

export default VerificationPage;
