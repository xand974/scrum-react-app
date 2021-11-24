import Layout from "../../components/layout/Layout";
import { auth } from "../../firebase";
import SprintList from "../../components/sprintList/SprintList";
import "./home.scss";

export default function Home() {
  console.log(auth.currentUser);

  return (
    <Layout>
      <SprintList />
    </Layout>
  );
}
