import "./modal.scss";
import { Cancel } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setOpenModal } from "../../context/modalSlice";
import { ChangeEvent, useState } from "react";
import { useLocation } from "react-router";
import { useAppSelector } from "../../hook";
import { TaskModel } from "../../types/index";
import { updateTask, deleteTask } from "../../services/task-service";
export default function Modal() {
  const dispatch = useDispatch();
  const { modalData, openModal }: { modalData: TaskModel; openModal: boolean } =
    useAppSelector((state) => state.modal);
  const [updatedTask, setUpdatedTask] = useState({} as TaskModel);
  const location = useLocation();
  const SPRINT_ID = location.pathname.split("/")[2];

  if (modalData.state) {
    updatedTask.state = modalData.state;
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
            defaultValue={modalData.state ? modalData.state : "backlog"}
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
            onClick={() => updateTask(SPRINT_ID, updatedTask, dispatch)}
          >
            Mettre à jour
          </button>
          <button
            className="modal-form_btn red"
            onClick={() => deleteTask(SPRINT_ID, modalData.id!!, dispatch)}
          >
            Supprimer
          </button>
        </form>
      </div>
    </div>
  );
}
