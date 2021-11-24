import Layout from "../../components/layout/Layout";
import SprintCategory from "../../components/sprintCat/SprintCategory";
import { data } from "../../helpers/data";
import "./sprint.scss";

export default function Sprint() {
  return (
    <Layout>
      <div className="sprint">
        <div className="top">
          <div className="wrapper">
            <div className="sprint-infos">
              <p className="sprint-infos_updated">
                Updated <strong>10 minutes ago</strong>{" "}
              </p>
              <h1 className="sprint-infos_title">Product Design</h1>
            </div>
            <div className="sprint-action">
              <p className="sprint-infos_created">
                Created On <strong>October 20,2021</strong>
              </p>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="list">
            {data.map((data, key) => (
              <SprintCategory type={data.cat} key={key} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
