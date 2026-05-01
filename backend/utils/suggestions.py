def generate_suggestions(prediction, probability, bmi=None, age=None, risk_behavior=None):
    """
    Generate health suggestions based on prediction.
    """

    # Convert safely
    prediction = int(prediction)
    probability = float(probability)

    # Status
    status = "Osteoporosis" if prediction == 1 else "No Osteoporosis"

    # ✅ Improved T-score Mapping (Realistic Range: -3 to +1)
    tscore = round(1 - (probability * 4), 2)

    # ✅ T-score Category (Medical Standard)
    if tscore >= -1:
        bone_status = "Normal"
    elif -2.5 < tscore < -1:
        bone_status = "Osteopenia (Low Bone Density)"
    else:
        bone_status = "Osteoporosis"

    # Fracture Risk
    if prediction == 1 and probability > 0.8:
        fracture_risk = "High"
    elif prediction == 1 and probability > 0.5:
        fracture_risk = "Moderate"
    elif prediction == 1:
        fracture_risk = "Low"
    else:
        fracture_risk = "Minimal"

    # Severity
    if prediction == 1:
        severity = "Severe" if probability > 0.8 else "Mild"
    else:
        severity = "None"

    # Diet
    if prediction == 1:
        diet = "Increase calcium & vitamin D intake, include leafy greens and dairy"
    else:
        diet = "Maintain balanced diet with calcium & vitamin D"

    # Lifestyle
    if prediction == 1:
        lifestyle = "Regular weight-bearing exercise, avoid smoking & alcohol, prevent falls"
    else:
        lifestyle = "Maintain active lifestyle"

    # Doctor Advice
    if prediction == 1:
        doctor = "Consult orthopedic/bone specialist and consider DEXA scan"
    else:
        doctor = "Routine checkup recommended"

    # Badge
    badge = "⚠️ At Risk" if prediction == 1 else "✅ Healthy"

    # Extra Notes
    bmi_note = ""
    if bmi is not None:
        bmi = float(bmi)
        if bmi < 18.5:
            bmi_note = "Underweight increases bone loss risk"
        elif bmi > 30:
            bmi_note = "Obesity may affect bone health"

    age_note = ""
    if age is not None:
        age = int(age)
        if age > 60:
            age_note = "Higher age increases osteoporosis risk; regular bone scans advised"

    risk_note = ""
    if risk_behavior == 1:
        risk_note = "Smoking and alcohol increase bone damage risk"

    return {
        "status": status,
        "tscore": tscore,
        "bone_status": bone_status,   # ✅ added
        "fractureRisk": fracture_risk,
        "severity": severity,
        "diet": diet,
        "lifestyle": lifestyle,
        "doctor": doctor,
        "badge": badge,
        "bmi_note": bmi_note,
        "age_note": age_note,
        "risk_note": risk_note,
        "note": "This is an AI-estimated T-score, not a clinical DEXA result"
    }