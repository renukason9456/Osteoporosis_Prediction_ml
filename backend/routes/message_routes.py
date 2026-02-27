# backend/routes/message_routes.py
from flask import Blueprint, request, jsonify
import json
import os

# Create blueprint
message_bp = Blueprint("messages", __name__)

# Path to store messages
MESSAGE_FILE = os.path.join("users", "message.json")
os.makedirs(os.path.dirname(MESSAGE_FILE), exist_ok=True)

# ------------------ SAVE MESSAGE ------------------
@message_bp.route("/messages", methods=["POST"])
def save_message():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not name or not email or not message:
        return jsonify({"success": False, "message": "All fields are required"}), 400

    # Load existing messages
    if os.path.exists(MESSAGE_FILE):
        with open(MESSAGE_FILE, "r") as f:
            try:
                messages = json.load(f)
            except json.JSONDecodeError:
                messages = []
    else:
        messages = []

    # Add new message with auto-increment ID
    messages.append({
        "id": len(messages) + 1,
        "name": name,
        "email": email,
        "message": message
    })

    # Save back to JSON file
    with open(MESSAGE_FILE, "w") as f:
        json.dump(messages, f, indent=4)

    return jsonify({"success": True, "message": "Message saved successfully!"})