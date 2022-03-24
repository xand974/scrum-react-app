import "./sprint.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import SprintCategory from "../../components/sprintCat/SprintCategory";
import { useDispatch } from "react-redux";
import Modal from "../../components/modal/Modal";
import { useAppSelector } from "../../hook";
import { TaskModel } from "../../types/index";
import AddTask from "./components/AddTask";
import { getSprint } from "../../services/sprint-service";
import { createTask } from "../../services/task-service";
import Loading from "../../components/loading/Loading";

export default function Sprint() {
  const [openAddTask, setOpenAddTask] = useState(false);
  const [task, setTask] = useState({
    id: new Date().getTime().toString(),
  } as TaskModel);
  const dispatch = useDispatch();
  const location = useLocation();
  const SPRINT_ID = location.pathname.split("/")[2];
  const { sprint, loading } = useAppSelector((state) => state.sprints);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTask((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    let value = Array.from(
      e.target.selectedOptions,
      (options) => options.value
    );

    setTask((prev) => {
      return {
        ...prev,
        [e.target.name]: value,
      };
    });
  };

  useEffect(() => {
    getSprint(dispatch, SPRINT_ID);
  }, [dispatch, SPRINT_ID]);

  const handleClick = () => {
    if (!task.state) {
      task.state = "backlog";
    }
    createTask(sprint, task, SPRINT_ID, dispatch);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="sprint">
        <Modal />
        <div className="top">
          <div className="wrapper">
            <div className="sprint-infos">
              <p className="sprint-infos_updated">
                Updated <strong>10 minutes ago</strong>{" "}
              </p>
              <h1 className="sprint-infos_title">{sprint.name}</h1>
              {openAddTask ? (
                <AddTask
                  handleChange={handleChange}
                  handleClick={handleClick}
                  handleSelect={handleSelect}
                />
              ) : (
                <button
                  className="add-btn"
                  onClick={() => setOpenAddTask(true)}
                >
                  Ajouter Une Tâche
                </button>
              )}
            </div>
            <div className="sprint-action">
              <p className="sprint-infos_created">
                Crée le <strong>{sprint.createdAt}</strong>
              </p>
              <Link to={`/review/${SPRINT_ID}`} className="sprint-action-link">
                <p className="sprint-action-text">
                  rédiger le <strong>Scrum Review</strong>
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="list">
            <SprintCategory type="backlog" />
            <SprintCategory type="pending" />
            <SprintCategory type="check" />
            <SprintCategory type="fait" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
