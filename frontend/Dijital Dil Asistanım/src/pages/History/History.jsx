import "./history.css";

// @hooks
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

import axios from "axios";
import { textTypes, textTypesEnum } from "../../assets/textTypes";
import { Checkbox } from "../../components/CheckBox";
import { useState } from "react";
import LoadingBox from "../../components/LoadingBox";
import useHistoryContext from "../../hooks/useHistoryContext";

const History = () => {
  const navigate = useNavigate();
  const { dispatch, texts } = useHistoryContext();

  const [checkedType, setCheckedType] = useState("");
  const [isTextFound, setIsTextFound] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveHistory = (texts) => {
    dispatch({ type: textTypesEnum[checkedType], payload: texts });
  };

  const handleChange = (e) => {
    e.stopPropagation();
    setCheckedType(checkedType === e.target.id ? "" : e.target.id);
  };

  const selectWritingHandler = (id) => {
    navigate(`/history/${id}`);
  };

  const getHistory = async () => {
    if (!checkedType) {
      alert("Lütfen bir yazı türü seçiniz.");
      return;
    }

    setIsTextFound(true);
    setIsLoading(true);

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/history/${textTypesEnum[checkedType]}`,
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        handleSaveHistory(response.data.userHistory);
        response.data.userHistory.length == 0 ? setIsTextFound(false) : null;
        setIsLoading(false);
      });
  };

  return (
    <div className="history">
      <div className="page-title">Geçmiş Yazılarım</div>
      <div className="select-type">
        {textTypes.map((type) => (
          <Checkbox
            key={type}
            label={type}
            value={checkedType === type}
            onChange={handleChange}
          />
        ))}
        <Button onClick={getHistory} name="Fetch History" />
      </div>
      <Button onClick={getHistory} name="Geçmişi Göster" />
      <div className="card-wrapper">
        {texts.length !== 0 ? (
          texts.map((text) => (
            <Card
              key={text._id}
              title={text.userInput.substring(0, 50) + "..."}
              onClick={() => selectWritingHandler(text._id)}
              createdTime={text.createdAt.substring(0, 10)}
            />
          ))
        ) : isLoading ? (
          <div className="loading-box-wrapper">
            <div className="loading-text">Geçmiş Kayıtlar Aranıyor</div>
            <LoadingBox height="10vh" width="10vw" />
          </div>
        ) : isTextFound ? (
          <div className="warning-message">Henüz hiç yazı türü seçmediniz.</div>
        ) : (
          <div className="danger-message">
            Seçilen yazı türünde herhangi bir kayıt bulunamadı!
          </div>
        )}
      </div>
    </div>
  );
};
export default History;
