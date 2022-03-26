import React from "react";
import { ChangeEvent } from "react";
import { TaskModel } from "../../../types/index";

type AddTaskType = {
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleClick: () => void;
  task: TaskModel;
};
export default function AddTask({
  handleChange,
  handleSelect,
  handleClick,
  task,
}: AddTaskType) {
  return (
    <form className="add-task-form" onSubmit={(e) => e.preventDefault()}>
      <input
        className="add-task-input"
        type="text"
        placeholder="ex :meeting avec les clients"
        name="name"
        onChange={handleChange}
        value={task.name ?? ""}
      />
      <input
        className="add-task-input"
        type="text"
        placeholder="ex: UX Designer"
        name="job"
        onChange={handleChange}
        value={task.job ?? ""}
      />
      <select
        onChange={handleSelect}
        name="team"
        id=""
        multiple
        className="select"
        value={task.team ?? []}
      >
        <option value="scrumMaster">Scrum Master</option>
        <option value="productOwner">Product Owner</option>
        <option value="rh">RH</option>
        <option value="webdev">Développement de la plateforme</option>
        <option value="digital">Digital management</option>
        <option value="marketing">Marketing</option>
        <option value="communication">Communication</option>
      </select>
      <select
        onChange={handleChange}
        name="state"
        className="select"
        defaultValue="backlog"
        value={task.state ?? ""}
      >
        <option value="backlog">Backlog</option>
        <option value="pending">Pending</option>
        <option value="check">Check</option>
        <option value="fait">Fait</option>
      </select>
      <button className="add-task-btn" onClick={handleClick}>
        Ajouter
      </button>
    </form>
  );
}
