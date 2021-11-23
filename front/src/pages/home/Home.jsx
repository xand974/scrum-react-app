import Layout from "../../components/layout/Layout";
import { auth } from "../../firebase";
import "./home.scss";

export default function Home() {
  console.log(auth.currentUser);

  return <Layout></Layout>;
}
