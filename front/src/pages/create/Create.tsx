import "./create.scss";
import Layout from "../../components/layout/Layout";
import { useState, ChangeEvent } from "react";
import { createSprint } from "../../services/sprint-service";
import { useNavigate } from "react-router";
import { SprintModel } from "../../types/index";
import CreateSprint from "./components/CreateSprint";

export default function Create() {
  const sprintInit = {
    name: "",
    from: "",
    to: "",
    createdAt: new Date(Date.now()).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    tasks: [],
    states: ["backlog", "fait", "pending", "check"],
  } as SprintModel;

  const [sprint, setSprint] = useState<SprintModel>(sprintInit);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSprint((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleCreate = () => {
    createSprint(sprint, navigate);
  };

  return (
    <Layout>
      <div className="create">
        <div className="wrapper">
          <h2 className="create-title">Créer un sprint</h2>
          <CreateSprint
            handleChange={handleChange}
            handleCreate={handleCreate}
          />
        </div>
      </div>
    </Layout>
  );
}
