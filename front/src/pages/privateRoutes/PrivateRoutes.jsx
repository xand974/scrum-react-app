import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function PrivateRoutes({ children }) {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? children : <Navigate replace to="/login" />;
}
