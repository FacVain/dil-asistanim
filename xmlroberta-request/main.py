from flask import Flask, request, Response, jsonify
from flask_cors import CORS

from transformers import AutoTokenizer, AutoModelForSequenceClassification
from scipy.special import softmax

app = Flask(__name__)
CORS(app)

tokenizer = AutoTokenizer.from_pretrained('cardiffnlp/twitter-xlm-roberta-base', use_fast=True)
sentiment_model = AutoModelForSequenceClassification.from_pretrained('./sentiment_model/', num_labels=3)
tone_model = AutoModelForSequenceClassification.from_pretrained('./tone_model/', num_labels=5)

@app.route("/isalive")
def is_alive():
    print("/isalive request")
    status_code = Response(status=200)
    return status_code

@app.route("/predict", methods=["POST"])
def predict():
    print("/predict request")
    req_json = request.get_json()
    encoded_input = tokenizer(req_json["text"], truncation=True, padding='max_length', max_length=256, return_tensors='pt')

    sentiment = sentiment_model(**encoded_input)
    sent_scores = sentiment[0][0].detach().numpy()
    sent_scores = softmax(sent_scores).tolist()
    sent_score = sent_scores.index(max(sent_scores))
    sentiment = ["Pozitif", "Nötr", "Negatif"][sent_score]


    tone = tone_model(**encoded_input)
    tone_scores = tone[0][0].detach().numpy()
    tone_scores = softmax(tone_scores).tolist()
    tone_score = tone_scores.index(max(tone_scores))
    tone = ["Kızgın", "Korku", "Mutlu", "Sürpriz", "Üzgün"][tone_score]

    return jsonify({
        "sentiment": sentiment,
        "tone": tone,
    })

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)