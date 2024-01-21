import useAuthContext from "./useAuthContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    //remove user from local storage
    localStorage.removeItem("user");

    //update auth state
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};

export default useLogout;
