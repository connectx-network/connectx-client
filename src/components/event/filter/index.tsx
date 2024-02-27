"use client";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { DateInput, DatePicker } from "@mantine/dates";
import { Drawer, Button, Title, Chip, Flex, Popover } from "@mantine/core";

import { Icons } from "@/components/icons";

const EventFilter = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState<Date | null>(null);
  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        withCloseButton={false}
      >
        <Title order={2}>Filter</Title>
        <Title order={4}>Time & Date</Title>
        <Flex gap={8} mt={4}>
          <Chip value="Today">Today</Chip>
          <Chip value="Tomorrow">Tomorrow</Chip>
          <Chip value="This Week">This Week</Chip>
        </Flex>
        <DateInput
          w={200}
          leftSection={<Icons.calender />}
          value={value}
          onChange={setValue}
          placeholder="Choose from calendar"
          clearable
        />
      </Drawer>

      <Button
        onClick={open}
        leftSection={<Icons.filterCircle />}
        bg="rgba(13, 9, 96, 1)"
        radius={50}
      >
        Filters
      </Button>
    </>
  );
};

export default EventFilter;
