import { useState } from "react";
import useAuthContext from "./useAuthContext";
import axios from "axios";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async ({ username, password }) => {
    console.log("username", username);
    try {
      setLoading(true);
      setError(null);
      await axios
        .post(`${import.meta.env.VITE_API_URL}/auth/login`, {
          username,
          password,
        }, {
          withCredentials: true
        })
        .then((response) => {
          console.log(response);

          dispatch({ type: "LOGIN", payload: response.data.userInfo });
          return response.data;
        })
        .catch((err) => {
          setError(err.response.data.message);
        });

      setLoading(false);
    } catch (err) {
      console.log("error", err);
      setError(err);
      setLoading(false);
    }
  };

  return { login, error, loading };
};

export default useLogin;
