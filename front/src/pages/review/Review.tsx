import "./review.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import Layout from "../../components/layout/Layout";
import { useAppSelector } from "../../hook";
import AddReview from "./components/AddReview";
import { getSprint, createReview } from "../../services/sprint-service";

export default function Review() {
  const [review, setReview] = useState("");
  const location = useLocation();
  const { sprint } = useAppSelector((state) => state.sprints);
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
          <AddReview handleCreate={handleCreate} setReview={setReview} />
        )}
      </div>
    </Layout>
  );
}
