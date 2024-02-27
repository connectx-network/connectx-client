import { Space } from "@mantine/core";
import { Review, ReviewItem } from "./ReviewItem";

export interface ReviewListProps {
  reviews: Review[];
}
export const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <>
      {reviews?.map((review) => (
        <>
          <ReviewItem data={review} />
          <Space h={"lg"} />
        </>
      ))}
    </>
  );
};
