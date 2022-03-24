import React from "react";
import { SendOutlined } from "@mui/icons-material";

type AddReviewType = {
  handleCreate: () => void;
  setReview: (e: string) => void;
};
export default function AddReview({ setReview, handleCreate }: AddReviewType) {
  return (
    <form className="review-form" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="review" className="review-label">
        Review pour <strong>Product Detailed</strong>
      </label>
      <textarea
        name="review"
        id="review"
        className="review-text-area"
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <button className="review-btn" onClick={handleCreate}>
        <SendOutlined />
      </button>
    </form>
  );
}
