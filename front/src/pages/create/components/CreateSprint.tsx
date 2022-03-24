import React from "react";
import { ChangeEvent } from "react";

type CreateSprintType = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCreate: () => void;
};
export default function CreateSprint({
  handleChange,
  handleCreate,
}: CreateSprintType) {
  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="name">Nom du sprint</label>
      <input
        onChange={handleChange}
        type="text"
        placeholder="Ex: Design du produit"
        name="name"
      />
      <label htmlFor="name">Du</label>
      <input onChange={handleChange} type="date" placeholder="du" name="from" />
      <label htmlFor="name">Au</label>
      <input onChange={handleChange} type="date" placeholder="au" name="to" />
      <button onClick={handleCreate}>créer</button>
    </form>
  );
}
