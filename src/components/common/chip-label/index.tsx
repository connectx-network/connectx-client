"use client";

import { Chip, ChipProps } from "@mantine/core";
import classes from "./chip.module.css";

const CXChipLabel = (
  props: ChipProps & React.ComponentPropsWithoutRef<"input">
) => {
  return (
    <Chip
      {...props}
      classNames={classes}
      icon={<span />}
      styles={{
        iconWrapper: {
          display: "none",
        },
        checkIcon: {
          display: "none",
        },
        label: {
          padding: "4px 20px",
          borderRadius: "8px",
          boxSizing: "content-box",
        },
      }}
    />
  );
};

export default CXChipLabel;
