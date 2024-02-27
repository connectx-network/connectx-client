"use client";
import { useState } from "react";
import { Button, Stack, Text, TextInput, Title } from "@mantine/core";
import { Icons } from "@/components/icons";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordRequest } from "@/api/auth";

const VerificationPage = () => {
  const [email, setEmail] = useState("");
  const mutation = useMutation({
    mutationFn: async (data: string) => await resetPasswordRequest(data),
    onSuccess: (data) => {
      console.log("😻 ~ VerificationPage ~ data:", data);
    },
    onError: (error) => {
      console.log("😻 ~ SignInPage ~ error:", error);
    },
  });

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
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
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
        disabled={!email}
      >
        SEND
      </Button>
    </Stack>
  );
};

export default VerificationPage;
