import "./history.css";
import "../../components/components.css";

// @hooks
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

import axios from "axios";
import {
  textTypes,
  textTypesEnum,
  textObjectStructureForQuery,
} from "../../assets/textTypes";
import { Checkbox } from "../../components/CheckBox";
import { useState } from "react";
import LoadingBox from "../../components/LoadingBox";
import useHistoryContext from "../../hooks/useHistoryContext";
import { CustomPie } from "../../components/CustomPie";
import { Chart } from "../../components/Chart";

const History = () => {
  const navigate = useNavigate();
  const { dispatch, texts, generalStats } = useHistoryContext();

  const [checkedType, setCheckedType] = useState("");
  const [isTextFound, setIsTextFound] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStat, setIsLoadingStat] = useState(false);
  const [result, setResult] = useState("");

  const handleSaveHistory = (texts, generalStats) => {
    dispatch({
      type: textTypesEnum[checkedType],
      payload: {
        texts: texts,
        generalStats: generalStats,
      },
    });
  };

  const handleChange = (e) => {
    e.stopPropagation();
    if (checkedType === "") {
      setCheckedType(checkedType === e.target.id ? "" : e.target.id);
      setResult("");
    } else if (checkedType !== e.target.id) {
      dispatch({ type: "CLEAR_HISTORY" });
      setCheckedType(e.target.id);
      setResult("");
    }
  };

  const selectWritingHandler = (id) => {
    navigate(`/history/${id}`);
  };

  const getResultFromStatistics = async () => {
    setIsLoadingStat(true);
    await fetch(import.meta.env.VITE_API_URL + "/api/history", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: textObjectStructureForQuery[checkedType].type,
        mailType: textObjectStructureForQuery[checkedType].mailType,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.gptResponse);
        setResult(data.gptResponse);
        setIsLoadingStat(false);
      });
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
        handleSaveHistory(response.data.userHistory, response.data.stats);
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
      </div>
      <Button onClick={getHistory} name="Geçmişi Göster" />
      {generalStats &&
        generalStats.toneRatios &&
        generalStats.sentimentRatios && (
          <div className="history-stats">
            <div className="history-stats-title">
              Yazılarınızın Genel İstatistikleri
            </div>
            <div className="history-stats-graphs">
              <div className="history-pie">
                <CustomPie
                  pieData={{
                    title: "Ton Oranları (%)",
                    labels: Object.keys(generalStats.toneRatios),
                    data: Object.values(generalStats.toneRatios),
                  }}
                />
              </div>
              <div className="history-chart">
                <Chart
                  chartData={{
                    title: "Duygu Oranları (%)",
                    labels: Object.keys(generalStats.sentimentRatios),
                    data: Object.values(generalStats.sentimentRatios),
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {result || isLoadingStat ? (
                  isLoadingStat ? (
                    <>
                      <p style={{ marginBottom: "60px" }}>
                        İstatistikler Yükleniyor
                      </p>
                      <LoadingBox height="10vh" width="10vw" />
                    </>
                  ) : (
                    <div className="history-stat-text">{result}</div>
                  )
                ) : (
                  <button onClick={getResultFromStatistics} className="button">
                    İstatistiklerden Çıkarım Yap
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
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
