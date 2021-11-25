import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import SprintCategory from "../../components/sprintCat/SprintCategory";
import { useDispatch, useSelector } from "react-redux";
import "./sprint.scss";
import { createTask, getSprint } from "../../context/apiCalls";
import Modal from "../../components/modal/Modal";

export default function Sprint() {
  const [openAddTask, setOpenAddTask] = useState(false);
  const [task, setTask] = useState({});
  const dispatch = useDispatch();
  const location = useLocation();
  const SPRINT_ID = location.pathname.split("/")[2];
  const { sprint } = useSelector((state) => state.sprints);
  const handleChange = (e) => {
    setTask((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSelect = (e) => {
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
  }, [dispatch, SPRINT_ID, task]);

  const handleClick = () => {
    createTask(task, SPRINT_ID);
  };

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
                <form
                  className="add-task-form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    className="add-task-input"
                    type="text"
                    placeholder="ex :meeting avec les clients"
                    name="task"
                    onChange={handleChange}
                  />
                  <input
                    className="add-task-input"
                    type="text"
                    placeholder="ex: UX Designer"
                    name="job"
                    onChange={handleChange}
                  />
                  <select
                    onChange={handleSelect}
                    name="team"
                    id=""
                    multiple
                    className="select"
                  >
                    <option value="scrumMaster">Scrum Master</option>
                    <option value="productOwner">Product Owner</option>
                    <option value="rh">RH</option>
                    <option value="webdev">
                      Développement de la plateforme
                    </option>
                    <option value="digital">Digital management</option>
                    <option value="marketing">Marketing</option>
                    <option value="communication">Communication</option>
                  </select>
                  <select
                    onChange={handleChange}
                    name="state"
                    id=""
                    className="select"
                  >
                    <option value="">selectionner</option>
                    <option value="backlog">Backlog</option>
                    <option value="pending">Pending</option>
                    <option value="check">Check</option>
                    <option value="fait">Fait</option>
                  </select>
                  <button className="add-task-btn" onClick={handleClick}>
                    Ajouter
                  </button>
                </form>
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
