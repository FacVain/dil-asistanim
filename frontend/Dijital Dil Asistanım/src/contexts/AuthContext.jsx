import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  console.log("authReducer action: ", action);
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case "LOGOUT":
      localStorage.removeItem("user");
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
        console.log("RESOBJECT", resObject);
      })
      .catch((error) => {
        console.log("Unauthorized", error);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
