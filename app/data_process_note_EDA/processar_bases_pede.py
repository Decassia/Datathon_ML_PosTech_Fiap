import pandas as pd
import re

# =========================================================
# FUNÇÕES AUXILIARES
# =========================================================

def limpar_nome_coluna(col):
    col = str(col).strip().upper()
    col = col.replace("_", " ")
    col = re.sub(r"\s+", " ", col).strip()

    col = re.sub(r"\b20\d{2}\b", "", col)
    col = re.sub(r"\b(22|23|24)\b", "", col)

    col = re.sub(r"\s+", " ", col).strip()
    return col


def normalizar_colunas(df):
    df = df.copy()
    df.columns = [limpar_nome_coluna(c) for c in df.columns]

    renomear = {
        "NOME ANONIMIZADO": "NOME",
        "NOME DO ALUNO": "NOME",
        "ANO INGRESSO": "ANO_INGRESSO",
        "ANO DE INGRESSO": "ANO_INGRESSO",
    }

    df = df.rename(columns=renomear)
    return df


def to_float_br(serie):
    if serie is None:
        return pd.Series(dtype="float64")

    if isinstance(serie, pd.DataFrame):
        serie = serie.iloc[:, 0]

    serie = serie.astype(str).str.strip()

    serie = serie.replace({
        "#DIV/0!": None,
        "nan": None,
        "None": None,
        "": None,
        "-": None,
        "NAN": None,
    })

    serie = (
        serie
        .str.replace(".", "", regex=False)
        .str.replace(",", ".", regex=False)
    )

    return pd.to_numeric(serie, errors="coerce")


def normalizar_nome(serie):
    if isinstance(serie, pd.DataFrame):
        serie = serie.iloc[:, 0]
    return serie.astype(str).str.strip().str.upper()


def normalizar_texto(serie):
    if serie is None:
        return pd.Series(dtype="object")

    if isinstance(serie, pd.DataFrame):
        serie = serie.iloc[:, 0]

    return (
        serie.astype(str)
        .str.strip()
        .replace({
            "nan": pd.NA,
            "None": pd.NA,
            "": pd.NA
        })
        .str.upper()
    )


def normalizar_fase(valor):
    if pd.isna(valor):
        return None

    valor = str(valor).strip().upper()

    if valor == "ALFA":
        return 0

    nums = re.findall(r"\d+", valor)
    if nums:
        return int(nums[0])

    return None


def encontrar_coluna(df, possiveis_nomes, nome_logico, obrigatoria=True):
    for nome in possiveis_nomes:
        if nome in df.columns:
            return nome

    if obrigatoria:
        raise KeyError(
            f"Não encontrei a coluna lógica '{nome_logico}'. "
            f"Tentei {possiveis_nomes}. "
            f"Colunas disponíveis: {df.columns.tolist()}"
        )
    return None


def obter_serie(df, col_name):
    """
    Retorna sempre uma Series.
    Se houver colunas duplicadas com o mesmo nome, pega a primeira não nula.
    """
    if col_name is None:
        return pd.Series([pd.NA] * len(df), index=df.index)

    obj = df[col_name]

    if isinstance(obj, pd.Series):
        return obj

    if isinstance(obj, pd.DataFrame):
        return obj.bfill(axis=1).iloc[:, 0]

    return pd.Series([pd.NA] * len(df), index=df.index)


# =========================================================
# PREPARAÇÃO DA BASE
# =========================================================

def preparar_base(df, ano):
    df = normalizar_colunas(df)

    print(f"\nColunas padronizadas da base {ano}:")
    print(df.columns.tolist())

    duplicadas = df.columns[df.columns.duplicated()].tolist()
    if duplicadas:
        print(f"\nColunas duplicadas detectadas na base {ano}: {duplicadas}")

    col_nome = encontrar_coluna(df, ["NOME"], "NOME")
    col_fase = encontrar_coluna(df, ["FASE"], "FASE")
    col_iaa = encontrar_coluna(df, ["IAA"], "IAA")
    col_ian = encontrar_coluna(df, ["IAN"], "IAN")
    col_ida = encontrar_coluna(df, ["IDA"], "IDA")
    col_ieg = encontrar_coluna(df, ["IEG"], "IEG")
    col_inde = encontrar_coluna(df, ["INDE", "INDE FINAL"], "INDE")
    col_ips = encontrar_coluna(df, ["IPS"], "IPS")
    col_ipv = encontrar_coluna(df, ["IPV"], "IPV")

    col_idade = encontrar_coluna(df, ["IDADE"], "IDADE", obrigatoria=False)
    col_ipp = encontrar_coluna(df, ["IPP"], "IPP", obrigatoria=False)
    col_ano_ingresso = encontrar_coluna(df, ["ANO_INGRESSO"], "ANO_INGRESSO", obrigatoria=False)

    # NOVO: coluna PEDRA
    col_pedra = encontrar_coluna(df, ["PEDRA"], "PEDRA", obrigatoria=False)

    serie_nome = obter_serie(df, col_nome)
    serie_fase = obter_serie(df, col_fase)
    serie_iaa = obter_serie(df, col_iaa)
    serie_ian = obter_serie(df, col_ian)
    serie_ida = obter_serie(df, col_ida)
    serie_idade = obter_serie(df, col_idade)
    serie_ieg = obter_serie(df, col_ieg)
    serie_inde = obter_serie(df, col_inde)
    serie_ipp = obter_serie(df, col_ipp)
    serie_ips = obter_serie(df, col_ips)
    serie_ipv = obter_serie(df, col_ipv)
    serie_ano_ingresso = obter_serie(df, col_ano_ingresso)
    serie_pedra = obter_serie(df, col_pedra)

    base = pd.DataFrame({
        "NOME": normalizar_nome(serie_nome),
        "ANO": ano,
        "FASE": serie_fase.apply(normalizar_fase),
        "IAA": to_float_br(serie_iaa),
        "IAN": to_float_br(serie_ian),
        "IDA": to_float_br(serie_ida),
        "IDADE": pd.to_numeric(serie_idade, errors="coerce"),
        "IEG": to_float_br(serie_ieg),
        "INDE": to_float_br(serie_inde),
        "INGRESSANTE": pd.NA,
        "IPP": to_float_br(serie_ipp),
        "IPS": to_float_br(serie_ips),
        "IPV": to_float_br(serie_ipv),
        "PEDRA": normalizar_texto(serie_pedra),
    })

    if col_ano_ingresso is not None:
        base["INGRESSANTE"] = (
            pd.to_numeric(serie_ano_ingresso, errors="coerce") == ano
        ).astype("Int64")

    base = base[
        [
            "NOME", "ANO", "FASE", "IAA", "IAN", "IDA",
            "IDADE", "IEG", "INDE", "INGRESSANTE",
            "IPP", "IPS", "IPV", "PEDRA"
        ]
    ]

    return base


# =========================================================
# PREENCHER IDADES PELO HISTÓRICO
# =========================================================

def preencher_idade_por_historico(df):
    df = df.copy()

    df["NOME"] = normalizar_nome(df["NOME"])
    df["ANO"] = pd.to_numeric(df["ANO"], errors="coerce")
    df["IDADE"] = pd.to_numeric(df["IDADE"], errors="coerce")

    mapa_idades = (
        df.dropna(subset=["IDADE"])
        .sort_values(["NOME", "ANO"])
        .groupby("NOME")
        .apply(lambda g: list(zip(g["ANO"], g["IDADE"])))
        .to_dict()
    )

    def estimar_idade(row):
        if pd.notna(row["IDADE"]):
            return row["IDADE"]

        nome = row["NOME"]
        ano_atual = row["ANO"]

        if nome not in mapa_idades:
            return pd.NA

        referencias = mapa_idades[nome]

        ano_ref, idade_ref = min(
            referencias,
            key=lambda x: abs(x[0] - ano_atual)
        )

        idade_estimada = idade_ref + (ano_atual - ano_ref)

        if idade_estimada < 0:
            return pd.NA

        return idade_estimada

    df["IDADE"] = df.apply(estimar_idade, axis=1)
    return df


# =========================================================
# GERAR TABELA DE IDADES
# =========================================================

def gerar_tabela_idades(df):
    tabela = (
        df.dropna(subset=["IDADE"])
        .assign(IDADE=lambda x: x["IDADE"].astype(int))
        .groupby(["IDADE", "ANO"])
        .size()
        .unstack(fill_value=0)
        .reset_index()
    )

    for ano in [2022, 2023, 2024]:
        if ano not in tabela.columns:
            tabela[ano] = 0

    tabela = tabela[["IDADE", 2022, 2023, 2024]]
    tabela["TOTAL"] = tabela[[2022, 2023, 2024]].sum(axis=1)

    return tabela


# =========================================================
# GERAR TABELA DE PEDRAS POR ANO
# =========================================================

def gerar_tabela_pedras_por_ano(df):
    tabela = (
        df.dropna(subset=["PEDRA"])
        .groupby(["PEDRA", "ANO"])
        .size()
        .unstack(fill_value=0)
        .reset_index()
    )

    for ano in [2022, 2023, 2024]:
        if ano not in tabela.columns:
            tabela[ano] = 0

    tabela = tabela[["PEDRA", 2022, 2023, 2024]]
    tabela["TOTAL"] = tabela[[2022, 2023, 2024]].sum(axis=1)

    return tabela.sort_values("PEDRA").reset_index(drop=True)


# =========================================================
# GERAR PEDRA POR ALUNO E ANO
# =========================================================

def gerar_pedra_por_aluno(df):
    tabela = (
        df[["NOME", "ANO", "PEDRA"]]
        .drop_duplicates()
        .pivot_table(
            index="NOME",
            columns="ANO",
            values="PEDRA",
            aggfunc="first"
        )
        .reset_index()
    )

    tabela.columns.name = None

    for ano in [2022, 2023, 2024]:
        if ano not in tabela.columns:
            tabela[ano] = pd.NA

    tabela = tabela[["NOME", 2022, 2023, 2024]]
    tabela = tabela.rename(columns={
        2022: "PEDRA_2022",
        2023: "PEDRA_2023",
        2024: "PEDRA_2024",
    })

    return tabela.sort_values("NOME").reset_index(drop=True)


# =========================================================
# EXECUÇÃO
# =========================================================

def main():
    df22 = pd.read_csv("BASE DE DADOS PEDE 2022.csv")
    df23 = pd.read_csv("BASE DE DADOS PEDE 2023.csv")
    df24 = pd.read_csv("BASE DE DADOS PEDE 2024.csv")

    print("Colunas originais 2022:")
    print(df22.columns.tolist())

    print("\nColunas originais 2023:")
    print(df23.columns.tolist())

    print("\nColunas originais 2024:")
    print(df24.columns.tolist())

    df22_clean = preparar_base(df22, 2022)
    df23_clean = preparar_base(df23, 2023)
    df24_clean = preparar_base(df24, 2024)

    print("\nShapes limpos:")
    print("2022:", df22_clean.shape)
    print("2023:", df23_clean.shape)
    print("2024:", df24_clean.shape)

    df_geral_novo = pd.concat([df22_clean, df23_clean, df24_clean], ignore_index=True)

    print("\nShape concatenado:", df_geral_novo.shape)

    df_geral_novo = df_geral_novo.dropna(subset=["INDE"]).reset_index(drop=True)

    df_geral_novo = preencher_idade_por_historico(df_geral_novo)

    df_geral_novo["IDADE"] = pd.to_numeric(df_geral_novo["IDADE"], errors="coerce")
    df_geral_novo.loc[
        (df_geral_novo["IDADE"] < 6) | (df_geral_novo["IDADE"] > 25),
        "IDADE"
    ] = pd.NA

    print("\nShape final:", df_geral_novo.shape)
    print("\nQuantidade por ano:")
    print(df_geral_novo["ANO"].value_counts(dropna=False))

    print("\nQtd de idades nulas por ano:")
    print(df_geral_novo.groupby("ANO")["IDADE"].apply(lambda x: x.isna().sum()))

    df_geral_novo.to_csv("df_geral_novo.csv", index=False)
    print("\nArquivo salvo: df_geral_novo.csv")

    tabela_idades = gerar_tabela_idades(df_geral_novo)

    print("\nTabela de distribuição de idades:")
    print(tabela_idades)

    tabela_idades.to_csv("tabela_idades.csv", index=False)
    print("\nArquivo salvo: tabela_idades.csv")

    tabela_pedras_ano = gerar_tabela_pedras_por_ano(df_geral_novo)

    print("\nTabela de distribuição de pedras por ano:")
    print(tabela_pedras_ano)

    tabela_pedras_ano.to_csv("tabela_pedras_por_ano.csv", index=False)
    print("\nArquivo salvo: tabela_pedras_por_ano.csv")

    tabela_pedra_aluno = gerar_pedra_por_aluno(df_geral_novo)

    print("\nTabela de pedra por aluno:")
    print(tabela_pedra_aluno.head())

    tabela_pedra_aluno.to_csv("tabela_pedra_por_aluno.csv", index=False)
    print("\nArquivo salvo: tabela_pedra_por_aluno.csv")


if __name__ == "__main__":
    main()
