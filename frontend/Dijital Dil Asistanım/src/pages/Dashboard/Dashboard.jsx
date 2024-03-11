import { useLayoutEffect, useRef, useState } from "react";
// styling
import "./Dashboard.css";
import Button from "../../components/Button";
import LoadingBox from "../../components/LoadingBox";
import {
  textObjectStructureForQuery,
  textTypes,
  toneEnums,
} from "../../assets/textTypes";
import { Checkbox } from "../../components/CheckBox";
import ToneQuestionPopup from "../../components/ToneQuestionPopup";

const Dashboard = () => {
  const [checkedType, setCheckedType] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [gptResponse, setGptResponse] = useState("");
  const [toneForFreeText, setToneForFreeText] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const boxRef = useRef(null);

  const handleChange = (e) => {
    e.stopPropagation();
    setCheckedType(checkedType === e.target.id ? "" : e.target.id);
    if (e.target.id === "Serbest Metin") {
      checkedType === e.target.id ? null : setIsPopupOpen(true);
    }
  };

  const checkSelectedType = () => {
    if (!checkedType) {
      alert("Lütfen bir yazı türü seçiniz.");
    }
  };

  const handleSelectTone = (tone) => {
    setIsPopupOpen(false);
    setToneForFreeText(tone);
  };

  useLayoutEffect(() => {
    setSize(() => ({
      width: boxRef.current.offsetWidth,
      height: boxRef.current.offsetHeigth,
    }));
  }, []);

  const sendWriting = async () => {
    setIsLoading(true);
    const queryObject = await checkTone();
    console.log(queryObject);

    await fetch("http://localhost:1453/api/query", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryObject),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setGptResponse(data);
      });
  };

  const checkTone = async () => {
    const queryObject = textObjectStructureForQuery[checkedType];
    queryObject.userInput = userInput;

    "tone" in queryObject
      ? toneForFreeText
        ? (queryObject.tone = toneEnums[toneForFreeText])
        : setIsPopupOpen(true)
      : null;

    "tone" in queryObject
      ? (queryObject.tone = toneEnums[toneForFreeText])
      : null;

    return queryObject;
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
            setUserInput(event.currentTarget.textContent);
          }}
          ref={boxRef}
        />
        {isLoading && (
          <LoadingBox width={size.width + "px"} height={size.height + "px"} />
        )}
        {isPopupOpen && <ToneQuestionPopup sendTone={handleSelectTone} />}
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
