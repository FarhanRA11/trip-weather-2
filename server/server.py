from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)


@app.route("/dog", methods=["GET"])
def return_home():
    response = requests.get("https://dog.ceo/api/breeds/image/random")
    return jsonify(response.json())


if __name__ == "__main__":
    app.run(debug=True, port=8080)
