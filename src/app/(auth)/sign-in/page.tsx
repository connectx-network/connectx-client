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
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { AuthToken, SignInBody } from "@/types/auth";
import { signinRequest } from "@/api/auth";
import { setToken, showSuccessNotification } from "@/utils";
import { TOKEN_KEY } from "@/constant";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();
  const signInForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(
          value
        )
          ? null
          : "Password must be at least eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    },
  });
  const mutation = useMutation({
    mutationFn: async (data: SignInBody) => await signinRequest(data),
    onSuccess: (data: AuthToken) => {
      setToken(TOKEN_KEY.ACCESS, data.accessToken);
      setToken(TOKEN_KEY.REFRESH, data.refreshToken);
      setToken(TOKEN_KEY.USER_ID, data.user.id);
      setToken(TOKEN_KEY.FULLNAME, data.user.fullName);
      setToken(TOKEN_KEY.AVATAR_URL, data.user.avatarUrl);
      showSuccessNotification({
        message: "Sign in successfully",
      });
      router.push(ROUTER.HOME);
    },
    onError: (error) => {
      console.log("😻 ~ SignInPage ~ error:", error);
      signInForm.setFieldError("email", (error as any).response.data.message);
      signInForm.setFieldError(
        "password",
        (error as any).response.data.message
      );
    },
  });

  const handleSignin = async (data: SignInBody) => {
    mutation.mutateAsync(data);
  };
  return (
    <>
      <Stack p={12}>
        <Title order={2} c="dark" fz={24}>
          Sign in
        </Title>
        <form onSubmit={signInForm.onSubmit((data) => handleSignin(data))}>
          <Stack>
            <TextInput
              type="email"
              radius={12}
              size="lg"
              leftSectionPointerEvents="none"
              leftSection={<Icons.mail />}
              placeholder="abc@email.com"
              {...signInForm.getInputProps("email")}
            />
            <PasswordInput
              radius={12}
              size="lg"
              leftSectionPointerEvents="none"
              leftSection={<Icons.lock />}
              placeholder="Your password"
              {...signInForm.getInputProps("password")}
            />
            <Flex justify="space-between" align="center">
              <Switch
                size="md"
                color="rgba(86, 105, 255, 1)"
                label={<p className="font-extralight">Remember Me</p>}
              />
              <Link
                href={ROUTER.RESET_PASSWORD}
                className="font-extralight hover:underline"
              >
                Forgot Password?
              </Link>
            </Flex>
            <Button
              type="submit"
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
              loading={mutation.isPending}
            >
              SIGN IN
            </Button>
          </Stack>
        </form>
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
