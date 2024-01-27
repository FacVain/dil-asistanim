import { useState } from "react";
import useAuthContext from "./useAuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async ({ username, password, authToken }) => {
    if (authToken) {
      return loginGoogle(authToken);
    }

    setLoading(true);

    await axios
      .post("https://dummyjson.com/auth/login", { username, password })
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(username));
        dispatch({ type: "LOGIN", payload: username });
      })
      .catch((error) => {
        setError(error);
      });

    setLoading(false);
  };

  const loginGoogle = (authToken) => {
    setLoading(true);
    const decoded = jwtDecode(authToken);
    const user = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };
    dispatch({ type: "LOGIN", payload: user });
    setLoading(false);
    return;
  };

  return { login, error, loading };
};

export default useLogin;
