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

  console.log("AuthProvider state: ", state);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch({
        type: "LOGIN",
        payload: JSON.parse(localStorage.getItem("user")),
      });
      return;
    }
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
