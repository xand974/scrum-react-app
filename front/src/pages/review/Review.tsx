import "./review.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Layout from "../../components/layout/Layout";
import { useAppSelector } from "../../hook";
import AddReview from "./components/AddReview";
import { createReview, getSprint } from "../../services/sprint-service";
import { SprintModel } from "../../types/index";

export default function Review() {
  const [review, setReview] = useState("");
  const [sprint, setSprint] = useState({} as SprintModel);
  const location = useLocation();
  const { sprints } = useAppSelector((state) => state.sprints);
  const SPRINT_ID = location.pathname.split("/")[2];

  useEffect(() => {
    getSprint(sprints, SPRINT_ID, setSprint);
  }, [SPRINT_ID, sprints]);

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
