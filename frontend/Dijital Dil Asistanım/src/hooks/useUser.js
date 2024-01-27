import useAuthContext from "./useAuthContext";

export const useUser = () => {
  const { user } = useAuthContext();

  return user;
};
