import "./history.css";

// @hooks
import Card from "../../components/Card";
import writings from "./data";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
// import axios from "axios";

const History = () => {
  const navigate = useNavigate();

  const selectWritingHandler = (id) => {
    navigate(`/history/${id}`);
  };

  const getHistory = async () => {
    // axios
    //   .get(`${import.meta.env.VITE_API_URL}/history/freetexts`, {
    //     withCredentials: true,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   });
    await fetch("http://localhost:1453/history/freetexts", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
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
        <Button onClick={getHistory} name="Fetch History" />
      </div>
    </div>
  );
};
export default History;
