import { Avatar, Flex, Rating, Text } from "@mantine/core";
import dayjs from "dayjs";
export interface ReviewItemProps {
  data: Review;
}
export interface Review {
  image: string;
  name: string;
  rate: number;
  contentReview: string;
  date: string;
}
export const ReviewItem: React.FC<ReviewItemProps> = ({ data }) => {
  return (
    <>
      <Flex gap={16}>
        <Avatar src={data.image} />
        <div className="w-full">
          <Flex justify={"space-between"}>
            <Text fz={18}>{data.name}</Text>
            <Text c="dimmed">{dayjs(data.date).format("DD MMM")}</Text>
          </Flex>
          <Rating value={data.rate} fractions={2} readOnly />
          <Text fz={15}>{data.contentReview}</Text>
        </div>
      </Flex>
    </>
  );
};
