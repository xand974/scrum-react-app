import React from "react";
import { Navigate } from "react-router";
import { auth } from "../../firebase";

export default function PrivateRoutes({ children }) {
  const currentUser = auth.currentUser;
  return currentUser ? children : <Navigate replace to="/login" />;
}
