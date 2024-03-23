import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import useHistoryContext from "../../hooks/useHistoryContext";
import SuggestionComponent from "../../components/SuggestionComponent";

const HistoryDetailed = () => {
  const navigate = useNavigate();
  const { texts } = useHistoryContext();
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    texts.forEach((text) => {
      if (text._id === window.location.href.split("/")[4]) {
        setCurrentText(text);
      }
    });
  }, [window.location.href, texts]);

  const selectWritingHandler = (_id) => {
    navigate(`/history/${_id}`);
  };

  return (
    <div className="history">
      <Navbar
        title={"Geçmiş Yazılarınız"}
        components={texts.map((text) => {
          return { _id: text._id, userInput: text.userInput };
        })}
        onClick={selectWritingHandler}
      />
      <div className="history-text-wrapper">
        <div className="history-text-title">METİN:</div>
        <div className="history-text">{currentText.userInput}</div>
      </div>
      {<SuggestionComponent suggestion={currentText} />}
    </div>
  );
};

export default HistoryDetailed;
