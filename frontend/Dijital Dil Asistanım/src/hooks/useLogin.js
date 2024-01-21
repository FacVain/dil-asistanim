import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async ({ username, password }) => {
    console.log("username", username);
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log("data", data);

      if (!response.ok) {
        setError(data.message[0].messages[0].message);
      } else {
        //save token to local storage
        localStorage.setItem("user", JSON.stringify(data));
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

  return { login, error, loading };
};

export default useLogin;
