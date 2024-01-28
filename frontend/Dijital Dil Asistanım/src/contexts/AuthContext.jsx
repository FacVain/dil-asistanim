import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  console.log("authReducer action: ", action);
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/login/success`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new Error("Authentication has been failed!");
      })
      .then((resObject) => {
        dispatch({ type: "LOGIN", payload: resObject.user });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
