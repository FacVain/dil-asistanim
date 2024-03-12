import React from "react";
import { HistoryContext } from "../contexts/HistoryContext";

const useHistoryContext = () => {
  const historyContext = React.useContext(HistoryContext);
  if (historyContext === undefined) {
    throw new Error(
      "useHistoryContext must be used within a HistoryContextProvider",
    );
  }
  return historyContext;
};

export default useHistoryContext;
