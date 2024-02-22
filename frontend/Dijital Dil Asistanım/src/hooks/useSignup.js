import { useState } from "react";
import useAuthContext from "./useAuthContext";
import axios from "axios";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async ({ username, password }) => {
    try {
      setLoading(true);
      setError(null);
      await axios
        .post(`${import.meta.env.VITE_API_URL}/auth/register`, {
          username,
          password,
        })
        .then((response) => {
          console.log(response);
          dispatch({ type: "LOGIN", payload: response.data });
          return response.data;
        })
        .catch((err) => {
          if (err.response.data.errors) {
            let errors = "";
            err.response.data.errors.forEach((error) => {
              errors += error.msg + " ";
            });
            setError(errors);
          } else {
            setError(err.response.data.message);
          }
        });
    } catch (err) {
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return { signup, error, loading };
};

export default useSignup;
