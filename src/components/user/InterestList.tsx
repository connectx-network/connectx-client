import { UserInterest } from "@/types/user";
import { InterestItem } from "./InterestItem";
import { ActionIcon, Button, Flex, Space, TextInput } from "@mantine/core";
import { COLORS } from "@/constant/color";
import { useState } from "react";

export type InterestListProps = {
  interests: UserInterest[];
  isEditMode: boolean;
  updateNameInterest?: (index: number, value: string) => void;
  addNewInterest?: (name: string) => void;
  removeInterest?: (index: number) => void;
};

export const InterestList = ({
  interests,
  isEditMode,
  updateNameInterest,
  addNewInterest,
  removeInterest,
}: InterestListProps) => {
  const handleChangeNameInterest = (index: number, value: string) => {
    if (updateNameInterest) {
      updateNameInterest(index, value);
    }
  };

  const [newInterest, setNewInterest] = useState("");
  const [errorInterest, setErrorInterest] = useState(false);

  const handleClickAddInterest = () => {
    if (!newInterest || newInterest.trim() === "") {
      setErrorInterest(true);
      return;
    }
    addNewInterest?.(newInterest);
    setNewInterest("");
  };

  const handleClickRemoveInterest = (index: number) => {
    return removeInterest?.(index);
  };

  if (!isEditMode)
    return (
      <Flex gap={10} wrap={"wrap"}>
        {interests?.map((interest) => (
          <InterestItem
            key={interest.id}
            interest={interest}
            isEditMode={isEditMode}
          />
        ))}
      </Flex>
    );
  return (
    <Flex direction={"column"} w={"100%"}>
      <Flex gap={8}>
        <TextInput
          w={"90%"}
          radius={"md"}
          placeholder="Name of interest"
          value={newInterest}
          error={errorInterest && "Invalid interest name"}
          onChange={(event) => {
            setErrorInterest(false);
            setNewInterest(event.currentTarget.value);
          }}
        />
        <Button
          color={COLORS.PURPLE}
          w={110}
          radius={"md"}
          onClick={handleClickAddInterest}
        >
          Add
        </Button>
      </Flex>
      <Space h={"sm"} />
      {interests?.map((interest, index) => (
        <div key={index}>
          <Flex align={"center"} gap={8} w={"100%"}>
            <TextInput
              w={"90%"}
              value={interest.name}
              onChange={(event) =>
                handleChangeNameInterest(index, event.currentTarget.value)
              }
            />
            <Button
              color="red"
              w={110}
              radius={"md"}
              onClick={() => handleClickRemoveInterest(index)}
            >
              Delete
            </Button>
          </Flex>
          <Space h={"sm"} />
        </div>
      ))}
    </Flex>
  );
};
