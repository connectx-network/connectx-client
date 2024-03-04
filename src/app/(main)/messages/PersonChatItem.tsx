import { ROUTER } from "@/constant";
import { Flex, Image, Indicator, Text } from "@mantine/core";
import Link from "next/link";

export const PersonChatItem = () => {
  return (
    <Link href={`${ROUTER.MESSAGE}/dass`}>
      <Flex
        my={16}
        gap={16}
        className="cursor-pointer w-full hover:bg-slate-100 rounded-lg p-2"
      >
        <Indicator radius="xl" size={10} color="green" className="z-0">
          <Image
            src={"https://picsum.photos/200"}
            w={64}
            h={64}
            radius={"lg"}
          />
        </Indicator>
        <div className="w-full">
          <Text fw={"bold"}>Tony Stark</Text>
          <Text c="gray" lineClamp={1}>
            Hey! Join Avenger? Call me babe!
          </Text>
        </div>
        <div>
          <Text c="dimmed" fz={12}>
            Today
          </Text>
        </div>
      </Flex>
    </Link>
  );
};
