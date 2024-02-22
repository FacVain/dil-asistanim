import "./history.css";

// @hooks
import Card from "../../components/Card";
import writings from "./data";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();

  const selectWritingHandler = (id) => {
    navigate(`/history/${id}`);
  };

  return (
    <div className="history">
      {/* <div className="history-writing-wrapper">{currentWriting.content}</div> */}
      <div className="card-wrapper">
        {writings.map((writing) => (
          <Card
            key={writing.title}
            title={writing.title}
            // content={writing.content.substring(0, 160)}
            onClick={() => selectWritingHandler(writing.id)}
          />
        ))}
      </div>
    </div>
  );
};
export default History;
