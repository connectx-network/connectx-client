"use client";
import {
  Button,
  Divider,
  Flex,
  PasswordInput,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import Link from "next/link";

import { Icons } from "@/components/icons";
import { ROUTER } from "@/constant/router";

const SignInPage = () => {
  return (
    <>
      <Stack p={12}>
        <Title order={2} c="dark" fz={24}>
          Sign in
        </Title>
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
        <Flex justify="space-between" align="center">
          <Switch
            size="md"
            color="rgba(86, 105, 255, 1)"
            label={<p className="font-extralight">Remember Me</p>}
          />
          <Link href={ROUTER.FORGET_PASSWORD} className="font-extralight">
            Forgot Password?
          </Link>
        </Flex>
        <Button
          h={58}
          radius={12}
          variant="gradient"
          gradient={{
            from: "rgba(86, 105, 255, 1)",
            to: "rgba(191, 86, 255, 1)",
            deg: 180,
          }}
          justify="space-between"
          leftSection={<span />}
          rightSection={<Icons.rightArrow />}
        >
          SIGN IN
        </Button>
        <Divider my="xs" label="Or" labelPosition="center" />

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
        <Flex gap={4} justify="center" align="center">
          <Text>Don’t have an account?</Text>
          <Link
            href={ROUTER.SIGN_UP}
            className="font-extralight text-transparent bg-clip-text bg-gradient-to-t from-blue-800 to-fuchsia-600 hover:underline"
          >
            Sign up
          </Link>
        </Flex>
      </Stack>
    </>
  );
};

export default SignInPage;
