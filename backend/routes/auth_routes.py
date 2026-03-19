from flask import Blueprint, request, jsonify
from utils.auth_utils import hash_password
from database.db import users_collection   # MongoDB collection

# Create blueprint
auth_bp = Blueprint("auth", __name__)

# ------------------ SIGNUP ------------------
@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Validation
    if not name or not email or not password:
        return jsonify({"success": False, "message": "All fields are required"}), 400

    # Check if email already exists in MongoDB
    existing_user = users_collection.find_one({"email": email})

    if existing_user:
        return jsonify({"success": False, "message": "Email already registered"}), 400

    # Create new user
    new_user = {
        "name": name,
        "email": email,
        "password": hash_password(password)
    }

    # Insert into MongoDB
    users_collection.insert_one(new_user)

    return jsonify({"success": True, "message": "Signup successful!"}), 201


# ------------------ LOGIN ------------------
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    # Validation
    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required"}), 400

    hashed = hash_password(password)

    # Find user in MongoDB
    user = users_collection.find_one({"email": email, "password": hashed})

    if user:
        return jsonify({
            "success": True,
            "message": "Login successful!",
            "name": user["name"]
        }), 200
    else:
        return jsonify({"success": False, "message": "Invalid email or password"}), 401