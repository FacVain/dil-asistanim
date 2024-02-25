import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import writings from "./data";
import { useEffect, useState } from "react";

const HistoryDetailed = () => {
  const navigate = useNavigate();
  const [currentWriting, setCurrentWriting] = useState("");

  useEffect(() => {
    writings.forEach((writing) => {
      if (writing.id === parseInt(window.location.pathname.split("/")[2])) {
        setCurrentWriting(writing);
      }
    });
  }, [window.location.href]);

  const selectWritingHandler = (writingTitle) => {
    const id = writings.find((writing) => writing.title === writingTitle).id;
    navigate(`/history/${id}`);
  };

  return (
    <div className="history">
      <Sidebar
        header="Geçmiş Yazılarım"
        components={writings.map((writing) => writing.title)}
        width="300px"
        height="100vh"
        buttonType="sidebar"
        onClick={selectWritingHandler}
        expandedData={writings.map(
          (writing) => writing.content.substring(0, 70) + "...",
        )}
      />
      <div className="history-writing-wrapper">{currentWriting.content}</div>
    </div>
  );
};

export default HistoryDetailed;
