import { Navigate } from "react-router";
import { auth } from "../../firebase";

type PrivateRoutesType = {
  children: JSX.Element;
};
export default function PrivateRoutes({
  children,
}: PrivateRoutesType): JSX.Element {
  const currentUser = auth.currentUser;
  return currentUser ? children : <Navigate replace to="/login" />;
}
