"use client";
import { showSuccessNotification } from "@/utils";
import {
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  Flex,
  Title,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAt, IconBrandTelegram } from "@tabler/icons-react";

const ContactUs = () => {
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      message: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      name: (value) => (value.length > 0 ? null : "Name is required"),
      message: (value) => (value.length > 0 ? null : "Message is required"),
    },
  });

  const handleSubmitForm = () => {
    form.reset();
    showSuccessNotification({
      title: "Success",
      message: "Your message has been sent",
    });
  };
  return (
    <div className="h-full">
      <Center>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
          <div>
            <Title>Contact us</Title>
            <Text mt="sm" mb={30}>
              Leave your email and we will get back to you within 24 hours
            </Text>
            <Flex align="center" gap="sm" mb="sm">
              <IconAt />
              <Text fz={14}>support@connectx.network</Text>
            </Flex>
            <Flex align="center" gap="sm" mb="sm">
              <IconBrandTelegram />
              <Text
                className="hover:underlink hover:text-blue-600 hover:cursor-pointer"
                fz={14}
                onClick={() =>
                  window.open("https://t.me/+cKLv7SBAfRAzNzc1", "_blank")
                }
              >
                ConnectX Network
              </Text>
            </Flex>
          </div>
          <form onSubmit={form.onSubmit((values) => handleSubmitForm())}>
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Name"
              placeholder="Your name"
              mt="md"
              {...form.getInputProps("name")}
            />
            <Textarea
              required
              label="Your message"
              placeholder="Enter your message here"
              minRows={4}
              mt="md"
              {...form.getInputProps("message")}
            />

            <Group justify="flex-end" mt="md">
              <Button
                type="submit"
                variant="gradient"
                gradient={{
                  from: "rgba(86, 105, 255, 1)",
                  to: "rgba(191, 86, 255, 1)",
                  deg: 180,
                }}
              >
                Send message
              </Button>
            </Group>
          </form>
        </SimpleGrid>
      </Center>
    </div>
  );
};

export default ContactUs;
