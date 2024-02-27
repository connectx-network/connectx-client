"use client";

import { Icons } from "@/components/icons";
import { COUNTRIES } from "@/constant";
import {
  Avatar,
  Button,
  Flex,
  Image,
  Select,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateEmail, validatePhone } from "@/utils/validate";
import { useState } from "react";

const USER_PROFILE = {
  fullName: "Jonny Deep",
  nickName: "Jonyyy",
  avatarUrl: "",
  email: "test@gmail.com",
  phone: "12312312312",
  gender: "Male",
  address: "Hanoi, Vietnam",
  country: "Vietnam",
};
const GENDER_LIST = ["Male", "Female"];

export default function EditProfilePage() {
  const form = useForm({
    initialValues: USER_PROFILE,
    validate: {
      email: (value) => (validateEmail(value) ? null : "Invalid email"),
      phone: (value) => (validatePhone(value) ? null : "Invalid phone number"),
      fullName: (value) => (value ? null : "Invalid full name"),
    },
  });

  const [avatarUpload, setAvatarUpload] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleSubmitForm = () => {
    console.log(form.values);
  };
  const handleClickAvatar = () => {
    document.getElementById("avatarUpload")?.click();
  };
  const handleChangeFile = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const result = event?.target?.result || null;
        setAvatarUpload(result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Title order={2} c="dark" fz={24}>
        Edit Profile
      </Title>
      <div className="flex justify-center items-center flex-col">
        <div className="w-full mt-11 md:w-3/4 lg:w-1/2">
          <div className="flex items-center justify-center">
            <input
              id="avatarUpload"
              type="file"
              accept="image/png,image/jpeg"
              hidden
              onChange={handleChangeFile}
            ></input>
            <Avatar
              src={avatarUpload?.toString() || form.values.avatarUrl}
              color="blue"
              alt="User avatar"
              size={"xl"}
              h={96}
              w={96}
              className="cursor-pointer"
              onClick={handleClickAvatar}
            >
              <Icons.camera />
            </Avatar>
          </div>
          <form onSubmit={form.onSubmit(handleSubmitForm)}>
            <TextInput
              radius={12}
              size="lg"
              description="Full name"
              className="w-full"
              {...form.getInputProps("fullName")}
            />
            <Space h="md" />
            <TextInput
              radius={12}
              size="lg"
              description="Nick name"
              className="w-full"
              {...form.getInputProps("nickName")}
            />
            <Space h="md" />
            <TextInput
              type="email"
              radius={12}
              size="lg"
              placeholder="abc@email.com"
              description="Email"
              className="w-full"
              {...form.getInputProps("email")}
            />
            <Space h="md" />
            <TextInput
              type="number"
              radius={12}
              size="lg"
              placeholder="123-456-7890"
              description="Phone number"
              className="w-full"
              leftSection={
                <Image
                  src={"https://twemoji.maxcdn.com/2/svg/1f1fb-1f1f3.svg"}
                  className="ml-2 mr-1"
                />
              }
              {...form.getInputProps("phone")}
            />
            <Space h="md" />
            <Flex gap={16}>
              <Select
                radius={12}
                size="lg"
                description="Country"
                data={COUNTRIES.map((e) => e.name)}
                searchable
                className="w-1/2"
                {...form.getInputProps("country", { type: "input" })}
              />
              <Select
                radius={12}
                size="lg"
                description="Gender"
                data={GENDER_LIST}
                className="w-1/2"
                {...form.getInputProps("gender")}
              />
            </Flex>

            <Space h="md" />

            <TextInput
              radius={12}
              size="lg"
              description="Address"
              className="w-full"
              {...form.getInputProps("address")}
            />
            <Space h="lg" />
            <Button
              type="submit"
              h={44}
              radius={12}
              variant="gradient"
              gradient={{
                from: "rgba(86, 105, 255, 1)",
                to: "rgba(191, 86, 255, 1)",
                deg: 180,
              }}
              w="100%"
            >
              Save
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
