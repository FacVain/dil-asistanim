import useAuthContext from "../hooks/useAuthContext";

import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const context = useAuthContext();
  console.log("Protected route state", context);

  // eslint-disable-next-line no-extra-boolean-cast
  if (!!context.state) return children;
  else return <Navigate to="/login" />;
};

export default ProtectedRoute;
