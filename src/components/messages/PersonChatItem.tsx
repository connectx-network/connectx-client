import { ROUTER } from "@/constant";
import { Flex, Image, Indicator, Text, Title } from "@mantine/core";
import Link from "next/link";
import cx from "clsx";

export type PersonChatItemProps = {
  isDarkMode?: boolean;
};
export const PersonChatItem = ({ isDarkMode }: PersonChatItemProps) => {
  return (
    <Link href={`${ROUTER.MESSAGE}/dass`}>
      <Flex
        my={16}
        gap={16}
        className={cx([
          "cursor-pointer w-ful rounded-lg p-2",
          isDarkMode ? "hover:bg-[#2e2e2e]" : "hover:bg-[#f8f9fa]",
        ])}
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
          <Title order={5} c={isDarkMode ? "white" : "black"}>
            Tony Stark
          </Title>
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
