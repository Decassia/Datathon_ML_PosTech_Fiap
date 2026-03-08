from app.api.drift import calcular_drift

def test_calcular_drift():
    result = calcular_drift()

    assert "status_modelo" in result
    assert "mensagem" in result
    assert "media_referencia" in result
    assert "media_atual" in result
    assert "diferenca" in result
    assert "limite_drift" in result
    assert "drift_detectado" in result