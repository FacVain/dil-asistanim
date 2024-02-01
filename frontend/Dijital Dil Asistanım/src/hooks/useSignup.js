import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async ({ email, username, password }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "http://localhost:1337/auth/local/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        },
      );
      const data = await response.json();
      console.log("data", data);

      if (!response.ok) {
        setError(data.error);
      } else {
        //save token to local storage

        //update auth state
        dispatch({ type: "LOGIN", payload: data });
      }
      setLoading(false);
      return data;
    } catch (err) {
      console.log("error", err);
      setError(err);
      setLoading(false);
    }
  };

  return { signup, error, loading };
};

export default useSignup;
