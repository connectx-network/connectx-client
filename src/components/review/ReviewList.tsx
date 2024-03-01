import { Space } from "@mantine/core";
import { Review, ReviewItem } from "./ReviewItem";

export interface ReviewListProps {
  reviews: Review[];
}
export const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <>
      {reviews?.map((review, index) => (
        <div key={index}>
          <ReviewItem data={review} />
          <Space h={"lg"} />
        </div>
      ))}
    </>
  );
};
