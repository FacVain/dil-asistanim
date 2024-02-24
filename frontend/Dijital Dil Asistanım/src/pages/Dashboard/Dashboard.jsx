// styling
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./Dashboard.css";
import Button from "../../components/Button";
import LoadingBox from "../../components/LoadingBox";

const writingTypes = [
  "Serbest Metin",
  "Dilekçe",
  "E-Posta (İş)",
  "E-Posta (Akademik)",
];

const Dashboard = () => {
  const [checkedType, setCheckedType] = useState("");
  const [writing, setWriting] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });

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

  useEffect(() => {
    console.log(size);
  }, [size]);

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
      });
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-title">Dijital Dil Asistanım</div>
      <div className="select-type">
        {writingTypes.map((type) => (
          <Checkbox
            key={type}
            label={type}
            value={checkedType === type}
            onChange={handleChange}
          />
        ))}
      </div>
      <div className="writing-input">
        <div className="writing-title">Yazı Örneği</div>
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
      </div>
      <Button onClick={sendWriting} type={"primary"} name="Gönder" />
    </div>
  );
};

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label className="checkbox-label">
      <input
        className="checkbox-input"
        type="checkbox"
        checked={value}
        onChange={onChange}
        id={label}
      />
      {label}
    </label>
  );
};

export default Dashboard;
