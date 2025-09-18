from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib

app = Flask(__name__)
CORS(app)


model_math = joblib.load('../model-training/models/best_model_student_math.joblib')
model_por = joblib.load('../model-training/models/best_model_student_portuguese.joblib')


features_math = ['age', 'studytime_mat', 'failures_mat', 'absences_mat', 'goout_mat', 'health_mat', 'G1_mat', 'G2_mat', 'sex_M']
features_por = ['age', 'studytime_por', 'failures_por', 'absences_por', 'goout_por', 'health_por', 'G1_por', 'G2_por', 'sex_M']

@app.route('/predict/math', methods=['POST'])
def predict_math():
    try:
        data = request.get_json()
        df = pd.DataFrame([data])
        for col in features_math:
            if col not in df.columns:
                df[col] = 0
        df = df[features_math]
        prediction = model_math.predict(df)[0]
        return jsonify({'prediction': round(float(prediction), 2)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict/portuguese', methods=['POST'])
def predict_portuguese():
    try:
        data = request.get_json()
        df = pd.DataFrame([data])
        for col in features_por:
            if col not in df.columns:
                df[col] = 0
        df = df[features_por]
        prediction = model_por.predict(df)[0]
        return jsonify({'prediction': round(float(prediction), 2)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
