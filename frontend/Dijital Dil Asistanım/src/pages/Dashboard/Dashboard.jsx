import { useLayoutEffect, useRef, useState } from "react";
// styling
import "./Dashboard.css";
import Button from "../../components/Button";
import LoadingBox from "../../components/LoadingBox";
import { textTypes } from "../../assets/textTypes";
import { Checkbox } from "../../components/CheckBox";

const Dashboard = () => {
  const [checkedType, setCheckedType] = useState("");
  const [writing, setWriting] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [gptResponse, setGptResponse] = useState("");

  const boxRef = useRef(null);

  const handleChange = (e) => {
    e.stopPropagation();
    setCheckedType(checkedType === e.target.id ? "" : e.target.id);
  };

  const checkSelectedType = () => {
    if (!checkedType) {
      alert("Lütfen bir yazı türü seçiniz.");
    }
  };

  useLayoutEffect(() => {
    setSize(() => ({
      width: boxRef.current.offsetWidth,
      height: boxRef.current.offsetHeigth,
    }));
  }, []);

  const sendWriting = async () => {
    setIsLoading(true);

    fetch("http://localhost:1453/api/query", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userInput: writing,
        type: "dilekce",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setGptResponse(data);
      });
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-title">Dijital Dil Asistanım</div>
      <div className="select-type">
        {textTypes.map((type) => (
          <Checkbox
            key={type}
            label={type}
            value={checkedType === type}
            onChange={handleChange}
          />
        ))}
      </div>
      <div className="writing-input">
        <div className="writing-title">Sizin Metniniz</div>
        <span
          className="textarea"
          role="textbox"
          contentEditable
          onClick={checkSelectedType}
          onInput={(event) => {
            setWriting(event.currentTarget.textContent);
          }}
          ref={boxRef}
        />
        {isLoading && (
          <LoadingBox width={size.width + "px"} height={size.height + "px"} />
        )}
        {gptResponse && (
          <>
            <div className="writing-title">Yapay Zeka Çıktısı</div>
            <div className="gpt-output">{JSON.stringify(gptResponse)}</div>
          </>
        )}
      </div>
      <Button
        onClick={sendWriting}
        type={"primary"}
        name={gptResponse ? "Edit" : "Gönder"}
      />
    </div>
  );
};

export default Dashboard;
