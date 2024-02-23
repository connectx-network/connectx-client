"use client";
import {
  Button,
  Divider,
  Flex,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import Link from "next/link";

import { Icons } from "@/components/icons";
import { ROUTER } from "@/constant/router";

const SignUpPage = () => {
  return (
    <>
      <Stack p={12}>
        <Title order={2} c="dark" fz={24}>
          Sign up
        </Title>
        <TextInput
          radius={12}
          size="lg"
          leftSectionPointerEvents="none"
          leftSection={<Icons.profile />}
          placeholder="Full name"
        />
        <TextInput
          type="email"
          radius={12}
          size="lg"
          leftSectionPointerEvents="none"
          leftSection={<Icons.mail />}
          placeholder="abc@email.com"
        />
        <PasswordInput
          radius={12}
          size="lg"
          leftSectionPointerEvents="none"
          leftSection={<Icons.lock />}
          placeholder="Your password"
        />
        <PasswordInput
          radius={12}
          size="lg"
          leftSectionPointerEvents="none"
          leftSection={<Icons.lock />}
          placeholder="Confirm password"
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
          SIGN UP
        </Button>
        <Divider my="xs" label="OR" labelPosition="center" />

        <Button
          h={58}
          radius={12}
          autoContrast
          variant="transparent"
          leftSection={<Icons.google />}
        >
          <Text c="dark">Login with Google</Text>
        </Button>
        <Button
          h={58}
          radius={12}
          autoContrast
          variant="transparent"
          leftSection={<Icons.facebook />}
        >
          <Text c="dark">Login with Facebook</Text>
        </Button>
        <Flex gap={8} justify="center" align="center">
          <Text>Already have an account?</Text>
          <Link
            href={ROUTER.SIGN_IN}
            className="font-extralight text-transparent bg-clip-text bg-gradient-to-t from-blue-800 to-fuchsia-600 hover:underline"
          >
            Sign in
          </Link>
        </Flex>
      </Stack>
    </>
  );
};

export default SignUpPage;
