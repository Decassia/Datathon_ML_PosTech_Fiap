import joblib
from pathlib import Path

def test_model_load():
    model_path = Path("app/modelo/random_forest_regressor_predict_student_inde.pkl")
    model = joblib.load(model_path)
    assert model is not None