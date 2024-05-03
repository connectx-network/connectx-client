"use client";
import { Icons } from "@/components/icons";
import { Button, Popover, Text } from "@mantine/core";
import { DatePicker, DatePickerProps, DatesRangeValue } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { useMemo } from "react";

const CXDateRangePicker = (props: DatePickerProps<"range">) => {
  const { value, onChange } = props;
  const [opened, { close, open, toggle }] = useDisclosure(false);
  const handleDateChange = (value: DatesRangeValue) => {
    onChange?.(value);
    if (value.every((v) => v)) close();
  };
  const dateTitle = useMemo(() => {
    if (value?.[0] && value?.[1]) {
      return `${dayjs(value[0]).format("DD/MM/YYYY")} - ${dayjs(
        value[1]
      ).format("DD/MM/YYYY")}`;
    }
    return "Choose date range";
  }, [value]);
  return (
    <Popover position="bottom-start" shadow="md" opened={opened}>
      <Popover.Target>
        <Button
          variant="light"
          color="gray"
          radius={10}
          px={20}
          py={4}
          leftSection={<Icons.calenderGradient />}
          rightSection={<Icons.rightChevronGradient />}
          onClick={toggle}
        >
          <Text fz={14} c="dark">
            {dateTitle}
          </Text>
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <DatePicker type="range" value={value} onChange={handleDateChange} />
      </Popover.Dropdown>
    </Popover>
  );
};

export default CXDateRangePicker;
