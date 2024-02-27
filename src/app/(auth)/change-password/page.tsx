"use client";
import { useState } from "react";
import { Button, PasswordInput, Stack, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Icons } from "@/components/icons";
import { changePasswordRequest } from "@/api/auth";
import { ResetPasswordBody } from "@/types/auth";
import { useOTPStore } from "@/store/otp.store";
import { showErrorNotification, showSuccessNotification } from "@/utils";
import { ROUTER } from "@/constant";

type ChangePasswordFormData = {
  password: string;
  confirmPassword: string;
};

const VerificationPage = () => {
  const router = useRouter();
  const { email, otpCode, resetOtpStore } = useOTPStore();
  const changePasswordForm = useForm<ChangePasswordFormData>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validate: {
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
  const mutation = useMutation({
    mutationFn: async (data: ResetPasswordBody) =>
      await changePasswordRequest(data),
    onSuccess: (data) => {
      resetOtpStore();
      showSuccessNotification({
        message: "Password changed successfully",
      });
      router.push(ROUTER.SIGN_IN);
    },
    onError: (error) => {
      showErrorNotification({
        message: (error as any).response.data.message,
      });
    },
  });

  const handleChangePassword = async (data: ChangePasswordFormData) => {
    const resetPasswordBody: ResetPasswordBody = {
      email,
      password: data.password,
      otp: otpCode,
    };
    mutation.mutateAsync(resetPasswordBody);
  };

  return (
    <form
      onSubmit={changePasswordForm.onSubmit((data) =>
        handleChangePassword(data)
      )}
    >
      <Stack p={12}>
        <Title order={2} c="dark" fz={24}>
          Resset Password
        </Title>
        <Text fw={200}>Enter your new password</Text>
        <Stack>
          <PasswordInput
            radius={12}
            size="lg"
            leftSectionPointerEvents="none"
            leftSection={<Icons.lock />}
            placeholder="New password"
            {...changePasswordForm.getInputProps("password")}
          />
          <PasswordInput
            radius={12}
            size="lg"
            leftSectionPointerEvents="none"
            leftSection={<Icons.lock />}
            placeholder="Confirm new password"
            {...changePasswordForm.getInputProps("confirmPassword")}
          />
        </Stack>

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
          disabled={!changePasswordForm.isValid()}
        >
          CHANGE PASSWORD
        </Button>
      </Stack>
    </form>
  );
};

export default VerificationPage;
