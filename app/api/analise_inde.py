import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "data" / "df_cleaned.csv"


def carregar_dados():
    df = pd.read_csv(DATA_PATH)

    df.columns = [c.upper() for c in df.columns]

    return df


def dados_inde_tres_anos():
    df = carregar_dados()

    resultado = {}

    for ano in [2022, 2023, 2024]:
        valores = df[df["ANO"] == ano]["INDE"].dropna().tolist()
        resultado[str(ano)] = valores

    return resultado

def media_inde_por_ano():
    df = carregar_dados()

    df["ANO"] = pd.to_numeric(df["ANO"], errors="coerce")
    df["INDE"] = pd.to_numeric(df["INDE"], errors="coerce")

    tabela = (
        df[df["ANO"].isin([2022, 2023, 2024])]
        .groupby("ANO")["INDE"]
        .mean()
        .reset_index()
        .sort_values("ANO")
    )

    tabela["INDE"] = tabela["INDE"].round(2)

    return [
        {"ano": str(int(row["ANO"])), "media": float(row["INDE"])}
        for _, row in tabela.iterrows()
    ]