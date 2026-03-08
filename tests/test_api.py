from fastapi.testclient import TestClient
from app.api.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_predict():
    payload = {
        "idade": 14,
        "fase": 3,
        "ingressante": 1,
        "iaa": 7.5,
        "ian": 7.2,
        "ieg": 8.1
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    assert "inde" in response.json()

def test_distribuicao_idade():
    response = client.get("/analises/distribuicao-idade")
    assert response.status_code == 200

def test_estatisticas_idade():
    response = client.get("/analises/estatisticas-idade")
    assert response.status_code == 200

def test_analise_inde():
    response = client.get("/analises/analise-inde")
    assert response.status_code == 200

def test_media_inde():
    response = client.get("/analises/media-inde")
    assert response.status_code == 200

def test_distribuicao_pedras():
    response = client.get("/analises/distribuicao-pedras")
    assert response.status_code == 200