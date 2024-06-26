"use client";

import { Icons } from "@/components/icons";
import { COUNTRIES, TOKEN_KEY } from "@/constant";
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
import { useEffect, useState } from "react";
import {
  getUserRequest,
  updateUserRequest,
  uploadUserAvatar,
} from "@/api/user";
import {
  getToken,
  showErrorNotification,
  showSuccessNotification,
} from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { UpdateUserBody, User } from "@/types/user";
import { useAuthStore } from "@/store/auth.store";
import NextImage from "next/image";

const INIT_USER_PROFILE = {
  fullName: "",
  nickname: "",
  avatarUrl: "",
  email: "",
  phoneNumber: "",
  gender: "",
  address: "",
  country: "",
  company: "",
};
const GENDER_LIST = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

export default function EditProfilePage() {
  const form = useForm({
    initialValues: INIT_USER_PROFILE,
    validate: {
      email: (value) => (validateEmail(value) ? null : "Invalid email"),
      phoneNumber: (value) =>
        validatePhone(value) ? null : "Invalid phone number",
      fullName: (value) => (value ? null : "Invalid full name"),
    },
  });

  const [loading, setLoading] = useState(false);

  const mutationFetchProfile = useMutation({
    mutationFn: async (userId: string) => await getUserRequest(userId),
    onSuccess: (data: User) => {
      form.setValues({ ...data, gender: capitalizeString(data.gender) });
    },
    onError: (error) => {},
  });
  const mutationEditProfile = useMutation({
    mutationFn: async (body: UpdateUserBody) => {
      setLoading(true);
      return await updateUserRequest(body);
    },
    onSuccess: (data: User) => {
      setLoading(false);
      showSuccessNotification({
        message: "Edit profile successfully",
      });
    },
    onError: (error) => {
      setLoading(false);
      showErrorNotification({
        message: "Edit profile failed",
      });
    },
  });
  const mutationUploadAvatar = useMutation({
    mutationFn: async (form: FormData) => await uploadUserAvatar(form),
    onSuccess: (data: User) => {},
    onError: (error) => {},
  });

  const capitalizeString = (str: string) =>
    `${str?.charAt(0)?.toUpperCase()}${str?.slice(1)}`;

  const { auth } = useAuthStore();

  useEffect(() => {
    const userId = auth.user?.id || "";
    if (userId) mutationFetchProfile.mutateAsync(userId);
  }, [auth]);

  const [avatarUpload, setAvatarUpload] = useState<string | ArrayBuffer | null>(
    null
  );

  const [file, setFile] = useState();

  const handleSubmitForm = () => {
    let body = {
      fullName: form.values.fullName,
      nickname: form.values.nickname,
      phoneNumber: form.values.phoneNumber,
      country: form.values.country,
      address: form.values.address,
      gender: form.values.gender,
      company: form.values.company,
    };
    mutationEditProfile.mutateAsync(body);

    if (file) {
      const formData = new FormData();
      formData.append("file", file as any);
      mutationUploadAvatar.mutateAsync(formData);
    }
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
      setFile(file);
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
              {...form.getInputProps("nickname")}
            />
            <Space h="md" />
            <TextInput
              radius={12}
              size="lg"
              description="Company"
              className="w-full"
              {...form.getInputProps("company")}
            />
            <Space h="md" />
            <TextInput
              type="email"
              radius={12}
              size="lg"
              readOnly
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
                <div className="relative w-9 h-9">
                  <Image
                    component={NextImage}
                    src={"https://twemoji.maxcdn.com/2/svg/1f1fb-1f1f3.svg"}
                    className="mr-1"
                    alt="emoji"
                    fill
                    quality={70}
                  />
                </div>
              }
              {...form.getInputProps("phoneNumber")}
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
              loading={loading}
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
