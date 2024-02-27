"use client";
import { useState } from "react";
import { Button, Stack, Text, TextInput, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Icons } from "@/components/icons";
import { resetPasswordRequest } from "@/api/auth";
import { useOTPStore } from "@/store/otp.store";
import { showErrorNotification } from "@/utils";
import { ROUTER } from "@/constant";

const VerificationPage = () => {
  const router = useRouter();
  const [emailResetPassword, setEmailResetPassword] = useState("");
  const { setEmail, setIsResetPassword } = useOTPStore();
  const mutation = useMutation({
    mutationFn: async (data: string) => await resetPasswordRequest(data),
    onSuccess: (data) => {
      setEmail(emailResetPassword);
      setIsResetPassword(true);
    },
    onError: (error) => {
      showErrorNotification({
        message: (error as any).response.data.message,
      });
    },
  });

  const handleSendOtpResetPassword = async () => {
    mutation.mutateAsync(emailResetPassword);
  };

  const handleGotoVerification = () => {
    router.push(ROUTER.VERIFICATION);
  };

  return (
    <Stack p={12}>
      <Title order={2} c="dark" fz={24}>
        Resset Password
      </Title>
      <Text fw={200}>
        {mutation.isSuccess
          ? "Please check your e-mail account for the verification code we just send you"
          : "Please enter your email address to request a password reset"}
      </Text>

      {mutation.isSuccess ? (
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
          onClick={handleGotoVerification}
        >
          VERIFY
        </Button>
      ) : (
        <>
          <TextInput
            type="email"
            radius={12}
            size="lg"
            leftSectionPointerEvents="none"
            leftSection={<Icons.mail />}
            placeholder="abc@email.com"
            value={emailResetPassword}
            onChange={(e) => setEmailResetPassword(e.currentTarget.value)}
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
            disabled={!emailResetPassword}
            loading={mutation.isPending}
            onClick={handleSendOtpResetPassword}
          >
            SEND
          </Button>
        </>
      )}
    </Stack>
  );
};

export default VerificationPage;
