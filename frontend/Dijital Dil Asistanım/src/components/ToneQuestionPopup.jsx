import "./popup.css";
import { useState } from "react";
import Button from "./Button";

//images
import happyFace from "../assets/icons/happy-face.png";
import angryFace from "../assets/icons/angry-face.png";
import surprisedFace from "../assets/icons/surprised-face.png";
import fearfulFace from "../assets/icons/fearful-face.png";
import sadFace from "../assets/icons/sad-face.png";

const icons = [
  { image: happyFace, text: "Mutlu" },
  { image: angryFace, text: "Kızgın" },
  { image: surprisedFace, text: "Şaşkın" },
  { image: fearfulFace, text: "Korkmuş" },
  { image: sadFace, text: "Üzgün" },
];

const ToneQuestionPopup = ({ sendTone }) => {
  const [tone, setTone] = useState("");
  const [error, setError] = useState("");

  const handleSelectTone = () => {
    tone !== "" ? sendTone(tone) : setError("Lütfen bir duygu seçiniz!");
  };

  return (
    <div className="popup-blur">
      <div className="popup-wrapper">
        <div className="popup-header">
          <div className="popup-header-text">
            Hangi duygu ile yazmak istersiniz?
          </div>
        </div>
        <div className="popup-icons">
          {icons.map((icon) => (
            <Emoji
              key={icon.text}
              src={icon.image}
              tone={tone}
              setTone={setTone}
              text={icon.text}
            />
          ))}
        </div>
        {error && <div className="popup-error-text">{error}</div>}
        <div style={{ marginLeft: "auto" }}>
          <Button onClick={handleSelectTone} type={"primary"} name={"Onayla"} />
        </div>
      </div>
    </div>
  );
};

const Emoji = ({ src, tone, setTone, text }) => {
  const handleClick = () => {
    setTone(text);
  };

  return (
    <div className={`popup-icon ${tone === text ? "popup-icon-selected" : ""}`}>
      <img
        // className={`${tone === text ? "popup-icon-selected" : "popup-icon"}`}
        onClick={handleClick}
        src={src}
      ></img>
      <p className="emoji-text">{text}</p>
    </div>
  );
};

export default ToneQuestionPopup;
