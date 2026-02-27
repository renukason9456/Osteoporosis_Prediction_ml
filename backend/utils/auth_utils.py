import json
import os
import hashlib

USERS_FILE = os.path.join("users", "users.json")

def load_users():
    if not os.path.exists(USERS_FILE):
        return []
    with open(USERS_FILE, "r") as f:
        return json.load(f)

def save_users(users):
    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=2)

def hash_password(password):
    """Return SHA256 hash of password"""
    return hashlib.sha256(password.encode()).hexdigest()
