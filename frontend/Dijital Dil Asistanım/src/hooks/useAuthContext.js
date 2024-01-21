import React from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuthContext = () => {
  const authContext = React.useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return authContext;
};

export default useAuthContext;
