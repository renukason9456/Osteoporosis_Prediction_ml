from flask import Flask
from flask_cors import CORS

from routes.prediction_routes import prediction_bp
from routes.auth_routes import auth_bp
from routes.message_routes import message_bp

app = Flask(__name__)

# Enable CORS
CORS(app, resources={r"/*": {"origins": "*"}})

# Register Blueprints
app.register_blueprint(prediction_bp, url_prefix="/api/predict")
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(message_bp, url_prefix="/api/message")

# Test route
@app.route("/")
def home():
    return "Backend Running Successfully"

# Run server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)