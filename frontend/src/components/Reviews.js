import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { newRequest } from "../utils/newRequest";
import Review from "./Review";
import "./reviews.scss";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();
  const [reviewsData, setReviewsData] = useState({
    desc: "",
    gigId: "",
    star: 1,
  });
  console.log(reviewsData);

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/review/getReviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const handleChange = (e) => {
    setReviewsData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
        gigId: gigId,
      };
    });
  };
  const mutation = useMutation({
    mutationFn: (reviewData) => {
      return newRequest.post("/review/addReview", reviewData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(reviewsData);
  };
  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "loading...."
        : error
        ? "somethong went wrong"
        : data.map((review) => <Review key={review._id} review={review} />)}
      <div className="add">
        <h3>Add a review</h3>
        <form onSubmit={handleSubmit} className="addForm">
          <input
            type="text"
            name="desc"
            placeholder="write a review"
            onChange={handleChange}
          />
          <select name="star" onChange={handleChange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
