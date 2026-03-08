import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "data" / "df_cleaned.csv"


def carregar_dados():
    df = pd.read_csv(DATA_PATH)

    df.columns = [c.upper() for c in df.columns]

    return df


def estatistica_idade_por_ano():

    df = carregar_dados()

    estatisticas = {}

    for ano in [2022, 2023, 2024]:

        dados = df[df["ANO"] == ano]["IDADE"]

        estatisticas[ano] = {
            "count": int(dados.count()),
            "mean": round(dados.mean(), 4),
            "std": round(dados.std(), 4),
            "min": int(dados.min()),
            "25%": int(dados.quantile(0.25)),
            "50%": int(dados.quantile(0.5)),
            "75%": int(dados.quantile(0.75)),
            "max": int(dados.max())
        }

    return estatisticas

def processar_dist_idade_todos_anos():

    df = carregar_dados()

    tabela = (
        df.groupby(["IDADE", "ANO"])
        .size()
        .reset_index(name="TOTAL")
        .pivot(index="IDADE", columns="ANO", values="TOTAL")
        .fillna(0)
        .reset_index()
    )

    tabela["TOTAL"] = tabela[2022] + tabela[2023] + tabela[2024]

    tabela = tabela.rename(columns={
        2022: "ano2022",
        2023: "ano2023",
        2024: "ano2024",
        "IDADE": "idade"
    })

    tabela = tabela.sort_values("idade")

    return tabela.to_dict(orient="records")