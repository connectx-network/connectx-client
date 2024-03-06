import { UserInterest } from "@/types/user";
import { getColorByName } from "@/utils/color";
import { Button } from "@mantine/core";

export type InterestItemProps = {
  interest: UserInterest;
  isEditMode: boolean;
};
export const InterestItem = ({ interest, isEditMode }: InterestItemProps) => {
  return (
    <Button
      key={interest.id}
      variant="filled"
      color={getColorByName(interest.name)}
      radius={"xl"}
      size="sm"
      w={"auto"}
      //   leftSection={isEditMode && <Icons.mail />}
    >
      {interest.name}
    </Button>
  );
};
