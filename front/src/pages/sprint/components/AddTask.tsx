import React from "react";
import { ChangeEvent } from "react";
import { TaskModel } from "../../../types/index";
import { capitalize } from "../../../helpers/string-helper";

type AddTaskType = {
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleClick: () => void;
  task: TaskModel;
  states: string[];
};
export default function AddTask({
  states,
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
        {states.map((state, index) => (
          <option value={state} key={index}>
            {capitalize(state)}
          </option>
        ))}
      </select>
      <button className="add-task-btn" onClick={handleClick}>
        Ajouter
      </button>
    </form>
  );
}
