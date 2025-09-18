import React, { useState } from 'react';
import axios from 'axios';

const initialForm = {
  age: 17,
  studytime: 2,
  failures: 0,
  absences: 4,
  goout: 3,
  health: 4,
  G1: 10,
  G2: 11,
  sex: 'M',
};

const FIELD_LABELS = {
  age: 'Age',
  studytime: 'Study Time (1-4)',
  failures: 'Past Failures',
  absences: 'Absences',
  goout: 'Going Out (1-5)',
  health: 'Health (1-5)',
  G1: 'Grade Period 1',
  G2: 'Grade Period 2',
};

export default function Form() {
  const [form, setForm] = useState(initialForm);
  const [subject, setSubject] = useState('math');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
    setPrediction(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    setError('');

    const payload = {
      age: Number(form.age),
      [`studytime_${subject}`]: Number(form.studytime),
      [`failures_${subject}`]: Number(form.failures),
      [`absences_${subject}`]: Number(form.absences),
      [`goout_${subject}`]: Number(form.goout),
      [`health_${subject}`]: Number(form.health),
      [`G1_${subject}`]: Number(form.G1),
      [`G2_${subject}`]: Number(form.G2),
      sex_M: form.sex === 'M' ? 1 : 0,
    };

    try {
      const response = await axios.post(`http://localhost:5000/predict/${subject}`, payload);
      setPrediction(response.data.prediction);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        🎓 Predict Final Student Grade
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {Object.keys(FIELD_LABELS).map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {FIELD_LABELS[field]}
              </label>
              <input
                type="number"
                name={field}
                value={form[field]}
                onChange={handleChange}
                min={0}
                max={field === 'studytime' ? 4 : field === 'goout' || field === 'health' ? 5 : 100}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Sex</label>
            <select
              name="sex"
              value={form.sex}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Subject</label>
            <select
              value={subject}
              onChange={handleSubjectChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="math">Math</option>
              <option value="portuguese">Portuguese</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Predicting...' : 'Predict'}
            </button>
          </div>
        </div>
      </form>

      {prediction !== null && (
        <div className="mt-8 text-center text-xl font-semibold text-green-600">
          ✅ Predicted Final Grade: {prediction.toFixed(2)}
        </div>
      )}

      {error && (
        <div className="mt-4 text-center text-red-500 font-medium">
          ❌ {error}
        </div>
      )}
    </div>
  );
}
