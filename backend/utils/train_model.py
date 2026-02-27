import pandas as pd
import numpy as np
import joblib
import os

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, confusion_matrix

from xgboost import XGBClassifier


# ---------------- PATHS ----------------

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

DATA_PATH = os.path.join(BASE_DIR, "data", "osteoporosis.csv")

MODEL_PATH = os.path.join(BASE_DIR, "models", "model.pkl")

ENCODER_PATH = os.path.join(BASE_DIR, "models", "encoders.pkl")


# ---------------- LOAD DATA ----------------

data = pd.read_csv(DATA_PATH)

print("Dataset Shape:", data.shape)


# ---------------- CLEAN DATA ----------------

data.drop_duplicates(inplace=True)

data.fillna("NA", inplace=True)


# ---------------- REMOVE ID COLUMN ----------------

if "Id" in data.columns:
    data.drop(columns=["Id"], inplace=True)


# ---------------- KEEP ONLY FORM FEATURES ----------------

features = [

    'Age',
    'Gender',
    'Hormonal Changes',
    'Family History',
    'Race/Ethnicity',
    'Body Weight',
    'Calcium Intake',
    'Vitamin D Intake',
    'Physical Activity',
    'Smoking',
    'Alcohol Consumption',
    'Medical Conditions',
    'Medications',
    'Prior Fractures'

]

target = "Osteoporosis"

data = data[features + [target]]


# ---------------- ENCODING ----------------

encoder_dict = {}

for col in features:

    le = LabelEncoder()

    data[col] = le.fit_transform(data[col])

    encoder_dict[col] = le


# ---------------- FEATURES ----------------

X = data[features]

y = data[target]


# ---------------- TRAIN TEST SPLIT ----------------

X_train, X_test, y_train, y_test = train_test_split(

    X,
    y,
    test_size=0.2,
    random_state=0,
    stratify=y

)


# ---------------- MODEL ----------------

model = XGBClassifier(

    learning_rate=0.3,
    max_depth=3,
    min_child_weight=1,
    reg_alpha=0.1,
    reg_lambda=10,
    n_estimators=300,
    random_state=42,
    use_label_encoder=False,
    eval_metric='logloss'

)


# ---------------- TRAIN ----------------

model.fit(X_train, y_train)


# ---------------- ACCURACY ----------------

print("\nTrain Accuracy:", model.score(X_train, y_train))

print("Test Accuracy:", model.score(X_test, y_test))


# ---------------- EVALUATION ----------------

y_pred = model.predict(X_test)

print("\nClassification Report")

print(classification_report(y_test, y_pred))

print("\nConfusion Matrix")

print(confusion_matrix(y_test, y_pred))


# ---------------- SAVE MODEL ----------------

os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)

joblib.dump(model, MODEL_PATH)

joblib.dump(encoder_dict, ENCODER_PATH)

print("\n✅ Model Saved:", MODEL_PATH)

print("✅ Encoders Saved:", ENCODER_PATH)