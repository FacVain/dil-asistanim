import { createContext, useReducer } from "react";

export const HistoryContext = createContext();

export const historyReducer = (state, action) => {
  if (action.type === "CLEAR_HISTORY")
    return { texts: [], textType: "", generalStats: {} };

  return {
    texts: action.payload.texts,
    textType: action.type,
    generalStats: action.payload.generalStats,
  };
};

export const HistoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(historyReducer, {
    generalStats: {},
    texts: [],
    textType: "",
  });
  return (
    <HistoryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HistoryContext.Provider>
  );
};
