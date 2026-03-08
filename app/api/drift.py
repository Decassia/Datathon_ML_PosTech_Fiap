from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "data" / "df_cleaned.csv"


def calcular_drift():
    df = pd.read_csv(DATA_PATH)
    df.columns = [c.upper() for c in df.columns]

    if "INDE" not in df.columns:
        return {
            "status_modelo": "erro",
            "mensagem": "Coluna INDE não encontrada no dataset.",
            "media_referencia": None,
            "media_atual": None,
            "diferenca": None,
            "limite_drift": 0.5,
            "drift_detectado": None,
        }

    serie_inde = pd.to_numeric(df["INDE"], errors="coerce").dropna()

    if serie_inde.empty:
        return {
            "status_modelo": "erro",
            "mensagem": "A coluna INDE não possui valores numéricos válidos.",
            "media_referencia": None,
            "media_atual": None,
            "diferenca": None,
            "limite_drift": 0.5,
            "drift_detectado": None,
        }

    media_referencia = 7.0
    media_atual = float(serie_inde.mean())
    diferenca = abs(media_atual - media_referencia)
    limite_drift = 0.5
    drift_detectado = diferenca > limite_drift

    return {
        "status_modelo": "Monitoramento ativo",
        "mensagem": "Monitoramento executado com sucesso.",
        "media_referencia": round(media_referencia, 4),
        "media_atual": round(media_atual, 4),
        "diferenca": round(diferenca, 4),
        "limite_drift": limite_drift,
        "drift_detectado": drift_detectado,
    }