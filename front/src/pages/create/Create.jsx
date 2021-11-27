import "./create.scss";
import Layout from "../../components/layout/Layout";
import { useState } from "react";
import { createSprint } from "../../context/apiCalls";
import { useNavigate } from "react-router";

export default function Create() {
  const [sprint, setSprint] = useState({
    name: "",
    from: "",
    to: "",
    createdAt: new Date(Date.now()).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
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
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="name">Nom du sprint</label>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Ex: Design du produit"
              name="name"
            />
            <label htmlFor="name">Du</label>
            <input
              onChange={handleChange}
              type="date"
              placeholder="du"
              name="from"
            />
            <label htmlFor="name">Au</label>
            <input
              onChange={handleChange}
              type="date"
              placeholder="au"
              name="to"
            />
            <button onClick={handleCreate}>créer</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
