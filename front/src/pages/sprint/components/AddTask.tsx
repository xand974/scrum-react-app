import React from "react";
import { ChangeEvent } from "react";

type AddTaskType = {
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleClick: () => void;
};
export default function AddTask({
  handleChange,
  handleSelect,
  handleClick,
}: AddTaskType) {
  return (
    <form className="add-task-form" onSubmit={(e) => e.preventDefault()}>
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
        <option value="webdev">Développement de la plateforme</option>
        <option value="digital">Digital management</option>
        <option value="marketing">Marketing</option>
        <option value="communication">Communication</option>
      </select>
      <select
        onChange={handleChange}
        name="state"
        id=""
        className="select"
        defaultValue="backlog"
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
  );
}
