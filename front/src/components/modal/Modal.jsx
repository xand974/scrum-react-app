import { Cancel } from "@mui/icons-material";
import "./modal.scss";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from "../../context/sprintSlice";
import { deleteTask, updateTask } from "../../context/apiCalls";
import { useState } from "react";
import { useLocation } from "react-router";
export default function Modal() {
  const dispatch = useDispatch();
  const { modalData, openModal } = useSelector((state) => state.sprints);
  const [updatedTask, setUpdatedTask] = useState({});
  const location = useLocation();
  const SPRINT_ID = location.pathname.split("/")[2];

  console.log(SPRINT_ID);

  const handleChange = (e) => {
    setUpdatedTask((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className={`modal ${openModal ? "active" : ""}`}>
      <div className="modal-header">
        <h1>{modalData?.task}</h1>
        <button
          className="modal-croix"
          onClick={() => dispatch(setOpenModal(false))}
        >
          <Cancel className="cancel-icon" />
        </button>
      </div>

      <div className="modal-body">
        <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
          <div className="modal-form-container">
            <label htmlFor="name" className="modal-label">
              Task Name
            </label>
            <input
              type="text"
              className="modal-input"
              placeholder={modalData?.task}
              name="task"
              onChange={handleChange}
            />
          </div>
          <div className="modal-form-container">
            <label htmlFor="name" className="modal-label">
              Dev
            </label>
            <input
              type="text"
              className="modal-input"
              placeholder={modalData?.job}
              name="job"
              onChange={handleChange}
            />
          </div>
          <span className="current-state-text">
            current state : <strong>{modalData?.state}</strong>
          </span>
          <select
            name="state"
            id="state"
            onChange={handleChange}
            className="modal-select"
          >
            <option value="backlog">Backlog</option>
            <option value="pending">Pending</option>
            <option value="check">Check</option>
            <option value="fait">Fait</option>
          </select>
          <button
            className="modal-form_btn"
            onClick={() => updateTask(SPRINT_ID, updatedTask, modalData.id)}
          >
            Mettre à jour
          </button>
          <button
            className="modal-form_btn red"
            onClick={() => deleteTask(SPRINT_ID, modalData.id)}
          >
            Supprimer
          </button>
        </form>
      </div>
    </div>
  );
}
