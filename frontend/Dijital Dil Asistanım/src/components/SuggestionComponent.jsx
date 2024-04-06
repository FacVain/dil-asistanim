import PdfComponent from "./PdfComponent";
import "./components.css";

const SuggestionComponent = ({ suggestion }) => {
  console.log(suggestion);

  if (!suggestion) {
    return (
      <div className="suggestion-container">
        <h2>No Suggestion Found</h2>
      </div>
    );
  }

  const textToDisplay = suggestion.rewrittenTextFromUserText
    ? suggestion.rewrittenTextFromUserText
    : suggestion.improvedMailFromUserText
      ? suggestion.improvedMailFromUserText
      : suggestion.improvedPetitionFromUserText;

  console.log("suggestion", suggestion);

  return (
    <div className="suggestion-container">
      <div className="suggestion-text">
        <h3>
          <strong>Yapay Zeka ile Düzeltilmiş Hali:</strong>
        </h3>
        <p>{textToDisplay}</p>
      </div>
      <div className="suggestion-content">
        <h3>
          <strong>Yapay Zeka Analiz ve Önerileri:</strong>
        </h3>
        <p>Metin Türü: {suggestion.type}</p>
        <p>Duygu Analizi: {suggestion.sentimentAnalysis}</p>
        <p>Metin Tonu: {suggestion.toneAnalysis.join(", ")}</p>
        {!suggestion.missingInformationsInUserText ||
        suggestion.missingInformationsInUserText.length === 0 ? (
          ""
        ) : (
          <p>
            <strong>Metindeki Eksikler:</strong>{" "}
            {suggestion.missingInformationsInUserText.join(", ")}
          </p>
        )}
        <br />
        <p>
          <h4>
            <strong>Metin için Genel Öneri:</strong>
          </h4>
          {suggestion.suggestionForUserText.includes("1.") ? (
            suggestion.suggestionForUserText
              .split(/\d+\./)
              .map((suggestion, index) => {
                return (
                  <p key={index}>
                    {index === 0 ? "" : `${index}.`}
                    {suggestion}
                  </p>
                );
              })
          ) : (
            <p>{suggestion.suggestionForUserText}</p>
          )}
        </p>
        {suggestion.createdAt && (
          <p className="date">{suggestion.createdAt.substring(0, 10)}</p>
        )}
      </div>
      <div style={{ backgroundColor: "white" }}>
        <PdfComponent text={textToDisplay} fileName={suggestion.type} />
      </div>
    </div>
  );
};

export default SuggestionComponent;
