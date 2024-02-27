"use client";
import { useMemo, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Drawer,
  Button,
  Title,
  Chip,
  Flex,
  RangeSlider,
  Text,
  Space,
} from "@mantine/core";

import { Icons } from "@/components/icons";
import { CXChipLabel, CXDateRangePicker } from "@/components/common";

const EventFilter = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [priceRange, setPriceRange] = useState<[number, number]>([120, 550]);
  const priceRangeLabel = useMemo(
    () => priceRange.map((value) => `$${value}`).join(" - "),
    [priceRange]
  );
  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        withCloseButton={false}
        styles={{
          body: {
            height: "100%",
          },
        }}
      >
        <Flex
          className="relative h-full"
          direction="column"
          justify="space-between"
        >
          <div>
            <Text fz={24}>Filter</Text>
            <Space h="lg" />
            <Text fz={16}>Time & Date</Text>
            <Flex gap={8} my={8} wrap="wrap">
              <Chip.Group>
                <CXChipLabel value="Today">Today</CXChipLabel>
                <CXChipLabel value="Tomorrow">Tomorrow</CXChipLabel>
                <CXChipLabel value="This Week">This Week</CXChipLabel>
              </Chip.Group>
              <CXDateRangePicker value={value} onChange={setValue} />
            </Flex>
            <Space h="lg" />
            <Flex justify="space-between" mb={16}>
              <Text fz={16}>Select price range</Text>
              <Text c="rgba(63, 56, 221, 1)">{priceRangeLabel}</Text>
            </Flex>
            <RangeSlider
              minRange={20}
              min={0}
              max={1000}
              step={1}
              value={priceRange}
              onChange={setPriceRange}
              styles={{
                bar: {
                  backgroundColor: "#5669ff",
                },
                thumb: {
                  borderWidth: 0,
                  padding: 0,
                  height: "35px",
                  width: "35px",
                },
              }}
              thumbChildren={[
                <Icons.thumbSliderRange />,
                <Icons.thumbSliderRange />,
              ]}
            />
          </div>
          <Flex justify="space-between">
            <Button
              size="lg"
              variant="light"
              color="gray"
              radius={10}
              px={40}
              onClick={close}
            >
              <Text fz={14} c="dark">
                Reset
              </Text>
            </Button>
            <Button
              size="lg"
              variant="gradient"
              gradient={{
                from: "rgba(86, 105, 255, 1)",
                to: "rgba(191, 86, 255, 1)",
                deg: 180,
              }}
              px={40}
              radius={10}
              onClick={close}
            >
              <Text fz={14} c="rbga(255, 255, 255, 1)">
                Apply
              </Text>
            </Button>
          </Flex>
        </Flex>
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
