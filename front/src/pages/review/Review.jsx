import { SendOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import Layout from "../../components/layout/Layout";
import { createReview, getSprint } from "../../context/apiCalls";
import "./review.scss";

export default function Review() {
  const [review, setReview] = useState("");
  const location = useLocation();
  const { sprint } = useSelector((state) => state.sprints);
  const SPRINT_ID = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  useEffect(() => {
    getSprint(dispatch, SPRINT_ID);
  }, [dispatch, SPRINT_ID]);

  const handleCreate = () => {
    createReview(review, SPRINT_ID);
  };

  return (
    <Layout>
      <div className="review">
        {sprint.review ? (
          <div className="review-display">{sprint.review}</div>
        ) : (
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
        )}
      </div>
    </Layout>
  );
}
