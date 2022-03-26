import React, { ReactElement } from "react";
import Footer from "../footer/Footer";
import { Loading } from "../loading/Loading";
import Navbar from "../navbar/Navbar";

type LayoutProp = {
  children: ReactElement | React.FC | Element;
  loading?: boolean;
};
export default function Layout({ children, loading }: LayoutProp) {
  return (
    <div className="layout">
      <Loading loading={loading} />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
