"use client";
import { useEffect, useState } from "react";
import { Icons } from "@/components/icons";
import {
  Button,
  Center,
  PinInput,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import {
  resendOtpCodeRequest,
  verifyOtpAccountRequest,
  verifyOtpResetPasswordRequest,
} from "@/api/auth";
import { VerifyOtpBody } from "@/types/auth";
import { useOTPStore } from "@/store/otp.store";
import { showErrorNotification, showSuccessNotification } from "@/utils";
import { ROUTER } from "@/constant";

const initialTimer = {
  minute: 0,
  second: 30,
};

const VerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(initialTimer);
  const { email, isResetPassword, setOtpCode, resetOtpStore } = useOTPStore();
  const router = useRouter();

  const mutationVerifyOtpAccount = useMutation({
    mutationFn: async (data: VerifyOtpBody) =>
      await verifyOtpAccountRequest(data),
    onSuccess: (data) => {
      showSuccessNotification({
        message: "Account verified successfully",
      });
      resetOtpStore();
      router.push(ROUTER.SIGN_IN);
    },
    onError: (error) => {
      showErrorNotification({
        message: (error as any).response.data.message,
      });
      console.log("😻 ~ SignUpPage ~ error:", error);
    },
  });

  const mutationVerifyOtpResetPassword = useMutation({
    mutationFn: async (data: VerifyOtpBody) =>
      await verifyOtpResetPasswordRequest(data),
    onSuccess: (data) => {
      showSuccessNotification({
        message: "Verified successfully",
      });
      setOtpCode(otp);
      router.push(ROUTER.CHANGE_PASSWORD);
    },
    onError: (error) => {
      showErrorNotification({
        message: (error as any).response.data.message,
      });
      console.log("😻 ~ SignUpPage ~ error:", error);
    },
  });

  const handleResendCode = () => {
    setTimer(initialTimer);
    resendOtpCodeRequest(email);
  };

  const handleVerifyCode = (optCode: string) => {
    const verifyOtpBody: VerifyOtpBody = {
      email,
      verifyCode: optCode,
    };

    if (isResetPassword) {
      const data = mutationVerifyOtpResetPassword.mutateAsync(verifyOtpBody);
      return;
    }

    const data = mutationVerifyOtpAccount.mutateAsync(verifyOtpBody);
    console.log("😻 ~ handleVerifyCode ~ data:", data);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer.second > 0) {
        setTimer({ ...timer, second: timer.second - 1 });
      }

      if (timer.second === 0) {
        timer.minute === 0
          ? clearInterval(interval)
          : setTimer({ minute: timer.minute - 1, second: 59 });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return (
    <Stack p={12}>
      <Title order={2} c="dark" fz={24}>
        Verification
      </Title>
      <Text fw={200}>We’ve send you the verification code on {email}</Text>

      <Center my={30}>
        <PinInput
          oneTimeCode
          autoFocus
          length={6}
          type="number"
          size="lg"
          styles={{
            input: {
              borderRadius: 12,
              fontWeight: 600,
            },
          }}
          value={otp}
          onChange={(value) => setOtp(value)}
          onComplete={(value) => handleVerifyCode(value)}
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
        disabled={otp.length < 6}
        loading={
          mutationVerifyOtpAccount.isPending ||
          mutationVerifyOtpResetPassword.isPending
        }
        onClick={() => handleVerifyCode(otp)}
      >
        CONTINUE
      </Button>
      <Center>
        {timer.minute === 0 && timer.second === 0 ? (
          <UnstyledButton
            fw={200}
            style={{
              textDecoration: "underline",
            }}
            onClick={handleResendCode}
          >
            Re-send code
          </UnstyledButton>
        ) : (
          <Text fw={200} ta="center">
            Re-send code in {timer.minute}:
            {timer.second < 10 ? `0${timer.second}` : timer.second}
          </Text>
        )}
      </Center>
    </Stack>
  );
};

export default VerificationPage;
