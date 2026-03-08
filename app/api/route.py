from fastapi import APIRouter
import joblib
import numpy as np
from pathlib import Path
from pydantic import BaseModel
import warnings
from app.api.analise_idade import estatistica_idade_por_ano
from app.api.analise_idade import processar_dist_idade_todos_anos
from app.api.analise_inde import dados_inde_tres_anos, media_inde_por_ano
from app.api.analise_performance import distribuicao_pedras_por_ano
from .drift import calcular_drift

warnings.filterwarnings("ignore")

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR.parent / "modelo" / "random_forest_regressor_predict_student_inde.pkl"

model = joblib.load(MODEL_PATH)


class StudentData(BaseModel):
    idade: int
    fase: int
    ingressante: int
    iaa: float
    ian: float
    ieg: float


@router.get("/analises/distribuicao-idade")
def distribuicao_idade():

    data = processar_dist_idade_todos_anos()

    return data

@router.get("/analises/analise-inde")
def obter_inde():
    return dados_inde_tres_anos()

@router.get("/analises/estatisticas-idade")
def estatisticas_idade():
    return estatistica_idade_por_ano()


@router.get("/analises/media-inde")
def get_media_inde():
    return media_inde_por_ano()

@router.get("/analises/distribuicao-pedras")
def get_distribuicao_pedras():
    return distribuicao_pedras_por_ano()

@router.get("/monitoramento/drift")
def monitorar_drift():
    return calcular_drift()
@router.post("/predict")
def predict(data: StudentData):

    transformed_input = np.array([[
        data.idade / 30.0,
        data.fase / 7.0,
        data.ian / 10.0,
        data.iaa / 10.0,
        data.ieg / 10.0,
        float(data.ingressante)
    ]])

    pred_inde = model.predict(transformed_input)[0] * 10

    return {"inde": float(pred_inde)}