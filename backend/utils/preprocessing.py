import joblib
import os
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

ENCODER_PATH = os.path.join(BASE_DIR, "models", "encoders.pkl")

encoders = joblib.load(ENCODER_PATH)


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


def preprocess_input(data_dict):

    df = pd.DataFrame([data_dict])

    for col in features:

        le = encoders[col]

        try:
            df[col] = le.transform(df[col].astype(str))
        except:
            df[col] = 0

    return df