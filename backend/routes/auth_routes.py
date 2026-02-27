# routes/auth_routes.py
from flask import Blueprint, request, jsonify
from utils.auth_utils import load_users, save_users, hash_password

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

    users = load_users()

    # Check if email already exists
    if any(user["email"] == email for user in users):
        return jsonify({"success": False, "message": "Email already registered"}), 400

    # Create new user
    new_user = {
        "name": name,
        "email": email,
        "password": hash_password(password)  # store hashed password
    }

    # Save user
    users.append(new_user)
    save_users(users)

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

    users = load_users()
    hashed = hash_password(password)

    # Authenticate
    user = next((u for u in users if u["email"] == email and u["password"] == hashed), None)

    if user:
        return jsonify({"success": True, "message": "Login successful!", "name": user["name"]}), 200
    else:
        return jsonify({"success": False, "message": "Invalid email or password"}), 401