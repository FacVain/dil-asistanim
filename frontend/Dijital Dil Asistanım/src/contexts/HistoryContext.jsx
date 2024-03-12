import { createContext, useReducer } from "react";

export const HistoryContext = createContext();

export const historyReducer = (state, action) => {
  return {
    texts: action.payload,
    textType: action.type,
  };
};

export const HistoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(historyReducer, {
    texts: [],
    textType: "",
  });
  return (
    <HistoryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HistoryContext.Provider>
  );
};
