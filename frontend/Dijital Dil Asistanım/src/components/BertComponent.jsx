import PdfComponent from "./PdfComponent";
import "./components.css";

const BertComponent = ({ bertanalysis }) => {
  if (!bertanalysis) {
    return (
      <div className="bert-container">
        <h2>No Suggestion Found</h2>
      </div>
    );
  }

  return (
    <div className="bert-container">
      <div className="bert-content">
        <h3>
          <strong>XMLRoBERTa Yapay Zeka Analiz ve Önerileri:</strong>
        </h3>
        <p>Duygu analizi: {bertanalysis.sentiment}</p>
        <p>Ton Analizi: {bertanalysis.tone}</p>
      </div>
    </div>
  );
};

export default BertComponent;
