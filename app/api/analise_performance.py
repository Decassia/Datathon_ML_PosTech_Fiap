import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "data" / "tabela_pedras_por_ano.csv"


def carregar_dados_pedras():
    df = pd.read_csv(DATA_PATH)
    df.columns = [c.upper() for c in df.columns]
    return df


def distribuicao_pedras_por_ano():
    df = carregar_dados_pedras()

    # Padronizar nomes das pedras
    df["PEDRA"] = (
        df["PEDRA"]
        .astype(str)
        .str.strip()
        .str.upper()
        .replace({
            "AGATA": "ÁGATA",
            "ÁGATA": "ÁGATA",
            "AMETISTA": "AMETISTA",
            "QUARTZO": "QUARTZO",
            "TOPAZIO": "TOPÁZIO",
            "TOPÁZIO": "TOPÁZIO",
        })
    )

    # Garantir que as colunas numéricas estejam corretas
    for col in ["2022", "2023", "2024", "TOTAL"]:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0)

    # Agrupar novamente para juntar AGATA + ÁGATA
    df = (
        df.groupby("PEDRA", as_index=False)[["2022", "2023", "2024", "TOTAL"]]
        .sum()
    )

    # Ordem fixa para o gráfico
    ordem = ["QUARTZO", "ÁGATA", "AMETISTA", "TOPÁZIO"]
    df["PEDRA"] = pd.Categorical(df["PEDRA"], categories=ordem, ordered=True)
    df = df.sort_values("PEDRA")

    resultado = []

    for _, row in df.iterrows():
        for ano in ["2022", "2023", "2024"]:
            resultado.append({
                "ano": ano,
                "pedra": row["PEDRA"],
                "count": int(row[ano])
            })

    return resultado