"use client";

import { Icons } from "@/components/icons";
import { COUNTRIES, ROUTER } from "@/constant";
import {
  Avatar,
  Button,
  ComboboxItem,
  InputBase,
  Select,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { IMaskInput } from "react-imask";

const USER_PROFILE = {
  fullName: "Jonny Deep",
  nickName: "Jonyyy",
  avatarUrl: "",
  email: "test@gmail.com",
  phone: "12312312312",
  gender: "Male",
  address: "ABCASC ASCNKASJ ASCAS",
  country: "Vietnam",
};
const GENDER_LIST = ["Male", "Female"];

export default function EditProfilePage() {
  const [userProfile, setUserProfile] = useState(USER_PROFILE);

  const handleChangeValue = (target: string, value: string | null) => {
    setUserProfile({ ...userProfile, [target]: value });
  };

  return (
    <>
      <Title order={2} c="dark" fz={24}>
        Edit Profile
      </Title>
      <div className="flex justify-center items-center flex-col">
        <div className="w-full mt-11 md:w-3/4 lg:w-1/2">
          <div className="flex items-center justify-center">
            <Avatar
              src={userProfile.avatarUrl}
              color="blue"
              alt="User avatar"
              size={"xl"}
              h={96}
              w={96}
            >
              <Icons.camera />
            </Avatar>
          </div>

          <TextInput
            radius={12}
            size="lg"
            description="Full name"
            className="w-full"
            value={userProfile.fullName}
            onChange={(event) =>
              handleChangeValue("fullName", event.target.value)
            }
          />
          <Space h="md" />
          <TextInput
            radius={12}
            size="lg"
            description="Nick name"
            className="w-full"
            value={userProfile.nickName}
            onChange={(event) =>
              handleChangeValue("nickName", event.target.value)
            }
          />
          <Space h="md" />
          <TextInput
            type="email"
            radius={12}
            size="lg"
            placeholder="abc@email.com"
            description="Email"
            className="w-full"
            value={userProfile.email}
            onChange={(event) => handleChangeValue("email", event.target.value)}
          />
          <Space h="md" />
          <TextInput
            type="number"
            radius={12}
            size="lg"
            placeholder="abc@email.com"
            description="Phone"
            className="w-full"
            value={userProfile.phone}
            onChange={(event) => handleChangeValue("phone", event.target.value)}
          />
          {/* <InputBase
            size="lg"
            type="number"
            radius={12}
            description="Phone number"
            component={<IMaskInput onChange={(event) => handleChangeValue("phone", event.target.)}/>}
            mask="(000) 000-0000"
            
          /> */}
          <Space h="md" />
          <div className="flex gap-4">
            <Select
              radius={12}
              size="lg"
              description="Country"
              data={COUNTRIES.map((e) => e.name)}
              searchable
              className="w-1/2"
              value={userProfile.country}
              onChange={(value: string | null, option: ComboboxItem) =>
                handleChangeValue("country", value)
              }
            />
            <Select
              radius={12}
              size="lg"
              description="Gender"
              data={GENDER_LIST}
              className="w-1/2"
              value={userProfile.gender}
              onChange={(value: string | null, option: ComboboxItem) =>
                handleChangeValue("gender", value)
              }
            />
          </div>
          <Space h="md" />

          <TextInput
            radius={12}
            size="lg"
            description="Address"
            className="w-full"
            value={userProfile.address}
            onChange={(event) =>
              handleChangeValue("address", event.target.value)
            }
          />
          <Space h="md" />
          <Link href={ROUTER.PROFILE}>
            <Button
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
          </Link>
        </div>
      </div>
    </>
  );
}
