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
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Icons } from "@/components/icons";
import { ROUTER } from "@/constant/router";
import { resendOtpCodeRequest, signupRequest } from "@/api/auth";
import { SignUpBody } from "@/types/auth";
import { setToken, showErrorNotification } from "@/utils";
import { ROLE, TOKEN_KEY } from "@/constant";
import { useOTPStore } from "@/store/otp.store";

type SignUpFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpPage = () => {
  const router = useRouter();
  const { setEmail } = useOTPStore();
  const signUpForm = useForm({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      fullName: (value) =>
        value.length >= 6 ? null : "Fullname must be at least 6 charaters",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(
          value
        )
          ? null
          : "Password must be at least eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords did not match",
    },
  });

  const handleResendOtp = async () => {
    try {
      await resendOtpCodeRequest(signUpForm.values.email);
      setEmail(signUpForm.values.email);
      router.push(ROUTER.VERIFICATION);
    } catch (error) {
      showErrorNotification({
        message: (error as any).response.data.message,
      });
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: SignUpBody) => await signupRequest(data),
    onSuccess: (data) => {
      setEmail(data.email);
      router.push(ROUTER.VERIFICATION);
    },
    onError: (error) => {
      if (
        (error as any).response.data.statusCode === 406 &&
        (error as any).response.data.message === "User has not activated yet!"
      ) {
        signUpForm.setFieldError(
          "email",
          <p>
            {(error as any).response.data.message}{" "}
            <span
              className="text-black underline hover:cursor-pointer"
              onClick={handleResendOtp}
            >
              Go to verify
            </span>
          </p>
        );
        return;
      }
      console.log("😻 ~ SignUpPage ~ error:", error);
      signUpForm.setFieldError(
        "fullName",
        (error as any).response.data.message
      );
    },
  });

  const handleRegister = async (data: SignUpFormData) => {
    const signUpBody: SignUpBody = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      userRole: ROLE.USER,
    };
    mutation.mutateAsync(signUpBody);
  };

  return (
    <>
      <Stack p={12}>
        <Title order={2} c="dark" fz={24}>
          Sign up
        </Title>
        <form onSubmit={signUpForm.onSubmit((data) => handleRegister(data))}>
          <Stack>
            <TextInput
              radius={12}
              size="lg"
              leftSectionPointerEvents="none"
              leftSection={<Icons.profile />}
              placeholder="Full name"
              {...signUpForm.getInputProps("fullName")}
            />
            <TextInput
              type="email"
              radius={12}
              size="lg"
              leftSectionPointerEvents="none"
              leftSection={<Icons.mail />}
              placeholder="abc@email.com"
              {...signUpForm.getInputProps("email")}
            />
            <PasswordInput
              radius={12}
              size="lg"
              leftSectionPointerEvents="none"
              leftSection={<Icons.lock />}
              placeholder="Your password"
              {...signUpForm.getInputProps("password")}
            />
            <PasswordInput
              radius={12}
              size="lg"
              leftSectionPointerEvents="none"
              leftSection={<Icons.lock />}
              placeholder="Confirm password"
              {...signUpForm.getInputProps("confirmPassword")}
            />

            <Button
              type="submit"
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
