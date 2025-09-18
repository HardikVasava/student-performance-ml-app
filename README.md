# 🎓 Student Grade Prediction Dashboard

A full-stack machine learning project that predicts student grades in **Math** and **Portuguese**. It combines real-time predictions via a **Flask API**, an interactive **React** frontend, and powerful **Power BI** visualizations for educational insights.

---

## 📦 Project Structure

```
project-root/
├── model-training/     # Data processing, ML model training, joblib export
├── server/            # Flask API for grade prediction
├── client/            # React app for user interaction
├── power-bi/          # Power BI report files
└── README.md
```

---

## 🤖 Model Training (`model-training/`)

- Merged Math & Portuguese student datasets
- Feature engineering: average grades, pass/fail indicators, categorical encoding
- Trained models: **Random Forest**, **XGBoost**, **LightGBM**, etc.
- Exported best-performing models using `joblib`

---

## 🌐 Flask API (`server/`)

REST API to serve grade predictions.

### Endpoints:
- `POST /predict/math` → Predicts Math final grade
- `POST /predict/portuguese` → Predicts Portuguese final grade

---

## 💻 React App (`client/`)

Interactive frontend built with **React** and styled using **Tailwind CSS**.

### Features:
- Form-based input: age, sex, G1, G2, study time, etc.
- Switch between Math and Portuguese subjects
- Sends input to API and displays real-time predictions

---

## 📊 Power BI Dashboard (`power-bi/`)

Visual dashboard offering insights into student performance.

### Visuals Include:
- 🎯 **Total Students** (Card)
- 🔘 **Slicers**: Address, Sex, Parental Status
- 📉 **Line Charts**: Avg grades vs Pstatus, famsize, studytime
- 📊 **Bar Charts**: Avg grades by Sex
- 🥧 **Pie Chart**: Failure rate by gender

---

## 🧮 Sample DAX Measures

```DAX
Average Math Grade = 
AVERAGEX('StudentData', ([G1_mat] + [G2_mat] + [G3_mat]) / 3)

Average Portuguese Grade = 
AVERAGEX('StudentData', ([G1_por] + [G2_por] + [G3_por]) / 3)

Math Failure Rate = 
CALCULATE(COUNTROWS('StudentData'), [G1_mat] <= 10 || [G2_mat] <= 10 || [G3_mat] <= 10)

Portuguese Failure Rate = 
CALCULATE(COUNTROWS('StudentData'), [G1_por] <= 10 || [G2_por] <= 10 || [G3_por] <= 10)
```

---

## 🚀 Quick Start

### 1. Train ML Models
```bash
cd model-training/
# Run your training script (e.g., train.py)
python train.py
```

### 2. Start Flask API
```bash
cd server/
python app.py
```

### 3. Start React Frontend
```bash
cd client/
npm install
npm start
```

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Flask, Python
- **ML Models**: scikit-learn, XGBoost, LightGBM
- **Visualization**: Power BI

---

## 📚 Data Source

This project uses the UCI Student Performance Data Set:
[Link to dataset](https://archive.ics.uci.edu/ml/datasets/Student+Performance)

---

## 🙌 Contributions

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.