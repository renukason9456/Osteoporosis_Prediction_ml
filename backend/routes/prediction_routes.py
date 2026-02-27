from flask import Blueprint, request, jsonify, send_file
import joblib
import os
import pandas as pd

from utils.preprocessing import preprocess_input
from utils.suggestions import generate_suggestions

prediction_bp = Blueprint("prediction", __name__)

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "models", "model.pkl")

model = joblib.load(MODEL_PATH)


# ==============================
# 1️⃣ Manual Form Prediction
# ==============================
@prediction_bp.route("/api/predict/form", methods=["POST"])
def predict_form():
    try:
        data = request.json

        # --- FIX: Convert numeric intake to categories first ---
        calcium = float(data.get("calciumIntake", 0))
        vitaminD = float(data.get("vitaminDIntake", 0))

        if calcium < 500:
            calcium_level = "Low"
        elif calcium < 900:
            calcium_level = "Medium"
        else:
            calcium_level = "High"

        if vitaminD < 400:
            vitaminD_level = "Low"
        elif vitaminD < 700:
            vitaminD_level = "Medium"
        else:
            vitaminD_level = "High"

        # Model input
        input_data = {
            "Age": data.get("age"),
            "Gender": data.get("gender"),
            "Hormonal Changes": data.get("hormonalChanges"),
            "Family History": data.get("familyHistory"),
            "Race/Ethnicity": data.get("race"),
            "Body Weight": data.get("weight"),
            "Calcium Intake": calcium_level,
            "Vitamin D Intake": vitaminD_level,
            "Physical Activity": data.get("physicalActivity"),
            "Smoking": data.get("smoking"),
            "Alcohol Consumption": data.get("alcohol"),
            "Medical Conditions": data.get("medicalConditions"),
            "Medications": data.get("medications"),
            "Prior Fractures": data.get("priorFractures")
        }

        # Preprocess
        processed = preprocess_input(input_data)

        # Prediction
        pred = int(model.predict(processed)[0])
        prob = float(model.predict_proba(processed)[0][1])

        osteoporosis_prediction = "Yes" if pred == 1 else "No"

        # BMI calculation
        height = float(data.get("height",0))/100
        weight = float(data.get("weight",0))
        bmi = weight/(height*height) if height > 0 else 0

        # Risk behavior
        risk_behavior = 1 if data.get("smoking")=="Yes" and data.get("alcohol")=="Yes" else 0

        # Suggestions
        suggestions = generate_suggestions(
            pred,
            prob,
            bmi,
            int(data.get("age",0)),
            risk_behavior
        )

        return jsonify({
            "name": str(data.get("name","N/A")),
            "age": int(data.get("age",0)),
            "gender": str(data.get("gender","N/A")),
            "status": str(suggestions.get("status","N/A")),
            "tscore": float(suggestions.get("tscore",0)),
            "fractureRisk": str(suggestions.get("fractureRisk","N/A")),
            "severity": str(suggestions.get("severity","N/A")),
            "bmi": float(bmi),
            "Osteoporosis_Prediction": osteoporosis_prediction,
            "diet": str(suggestions.get("diet","N/A")),
            "lifestyle": str(suggestions.get("lifestyle","N/A")),
            "doctor": str(suggestions.get("doctor","N/A")),
            "badge": str(suggestions.get("badge","N/A"))
        })

    except Exception as e:
        print("❌ ERROR:", str(e))
        return jsonify({"error": str(e)}), 500
# 2️⃣ CSV Prediction
# ==============================

@prediction_bp.route("/api/predict/csv", methods=["POST"])
def predict_csv():

    try:

        file = request.files["file"]

        df = pd.read_csv(file)


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

        df = df[features]


        processed_list = []

        for _, row in df.iterrows():

            processed = preprocess_input(row.to_dict())

            processed_list.append(processed)


        processed_df = pd.concat(processed_list)

        predictions = model.predict(processed_df)

        df["Prediction"] = predictions

        df["Result"] = df["Prediction"].apply(

            lambda x: "Osteoporosis Detected" if x==1 else "No Osteoporosis"

        )


        OUTPUT_PATH = os.path.join(BASE_DIR,"prediction_results.csv")

        df.to_csv(OUTPUT_PATH,index=False)


        return send_file(

            OUTPUT_PATH,
            as_attachment=True

        )


    except Exception as e:

        return jsonify({"error": str(e)})