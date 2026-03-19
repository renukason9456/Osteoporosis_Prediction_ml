from flask import Blueprint, request, jsonify
from database.db import messages_collection   # MongoDB collection

# Create blueprint
message_bp = Blueprint("messages", __name__)

# ------------------ SAVE MESSAGE ------------------
@message_bp.route("/messages", methods=["POST"])
def save_message():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    # Validation
    if not name or not email or not message:
        return jsonify({"success": False, "message": "All fields are required"}), 400

    # Create message document
    new_message = {
        "name": name,
        "email": email,
        "message": message
    }

    # Insert into MongoDB
    messages_collection.insert_one(new_message)

    return jsonify({"success": True, "message": "Message saved successfully!"})