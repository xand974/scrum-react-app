import React, { ReactElement } from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

type LayoutProp = {
  children: ReactElement | React.FC | Element;
};
export default function Layout({ children }: LayoutProp) {
  return (
    <div className="layout">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
