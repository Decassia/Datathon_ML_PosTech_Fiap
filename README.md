::: {align="center"}
# 📊 Datathon MLOps -- Previsão do INDE

### Pipeline de Machine Learning em produção para previsão do **Índice de Desenvolvimento Educacional (INDE)**

### **Pós-Tech FIAP -- Machine Learning Engineering**

![Python](https://img.shields.io/badge/Python-3.11-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-API-green)
![Scikit-Learn](https://img.shields.io/badge/MachineLearning-ScikitLearn-orange)
![Docker](https://img.shields.io/badge/Container-Docker-blue)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![Render](https://img.shields.io/badge/Deploy-Render-purple)
![Pytest](https://img.shields.io/badge/Tests-Pytest-yellow)
:::

------------------------------------------------------------------------

## 🚀 Sobre o Projeto

Este projeto foi desenvolvido no **Datathon da Pós-Tech FIAP -- Machine
Learning Engineering** com o objetivo de construir um fluxo completo de
**MLOps** para prever o **INDE -- Índice de Desenvolvimento
Educacional** de alunos do programa **Passos Mágicos**.

A solução contempla as principais etapas do ciclo de vida de Machine
Learning:

-   análise exploratória de dados
-   engenharia de features
-   treinamento de modelo preditivo
-   API REST com FastAPI
-   dashboard em React
-   monitoramento de data drift
-   containerização com Docker
-   deploy em cloud com Render

------------------------------------------------------------------------

## ✨ Destaques da Solução

-   Modelo de regressão para prever o INDE
-   API pronta para consumo
-   Frontend para interação com o modelo
-   Endpoint de monitoramento
-   Estrutura preparada para evolução de MLOps
-   Deploy online da API e interface

------------------------------------------------------------------------

## 🧠 Arquitetura da Solução

``` mermaid
flowchart LR
A[Usuário] --> B[Dashboard React]
B --> C[API FastAPI]
C --> D[Modelo Random Forest]
D --> E[Predição INDE]
C --> F[Monitoramento]
F --> G[Detecção de Drift]
C --> H[(Dataset tratado)]
```

------------------------------------------------------------------------

## 🗂 Estrutura do Projeto

``` bash
Datathon_ML_PosTech_Fiap
│
├── app
│   ├── api
│   │   ├── main.py
│   │   ├── routes.py
│   │
│   ├── modelo
│   │   └── random_forest_regressor_predict_student_inde.pkl
│
├── data
│   └── df_cleaned.csv
│
├── tests
│
├── Dockerfile
├── requirements.txt
├── README.md
```

------------------------------------------------------------------------

## 📊 Dataset

Dataset com dados educacionais de alunos do programa **Passos Mágicos**.

  Variável      Descrição
  ------------- -----------------------------------------
  IDADE         Idade do aluno
  FASE          Fase educacional
  IAA           Indicador de Aprendizagem
  IAN           Indicador de Notas
  IEG           Indicador de Engajamento
  INGRESSANTE   Indica se o aluno ingressou no programa
  INDE          Índice de Desenvolvimento Educacional

------------------------------------------------------------------------

## 🔎 Análise Exploratória de Dados

Principais análises realizadas:

-   distribuição de idade
-   distribuição do INDE
-   correlação entre indicadores educacionais
-   análise por fase educacional
-   análise temporal
-   análise por categoria PEDRA

------------------------------------------------------------------------

## ⚙️ Engenharia de Features

Transformações aplicadas:

``` python
idade / 30
fase / 7
ian / 10
iaa / 10
ieg / 10
```

------------------------------------------------------------------------

## 🤖 Modelo de Machine Learning

Modelo utilizado:

**Random Forest Regressor**

Biblioteca principal:

    scikit-learn

Parâmetros principais:

  Parâmetro      Valor
  -------------- -------
  n_estimators   50
  max_depth      11
  max_features   sqrt
  random_state   1

Modelo salvo com **joblib**:

    random_forest_regressor_predict_student_inde.pkl

------------------------------------------------------------------------

## 🌐 API de Predição

Endpoint principal:

    POST /predict

Exemplo de requisição:

``` json
{
"idade": 12,
"fase": 3,
"ingressante": 1,
"iaa": 8.5,
"ian": 7.8,
"ieg": 6.9
}
```

Resposta:

``` json
{
"inde": 7.42
}
```

Documentação:

    /docs

------------------------------------------------------------------------

## 📉 Monitoramento do Modelo

Endpoint de monitoramento:

    GET /monitoramento/drift

Exemplo:

``` json
{
"status_modelo": "em_monitoramento",
"media_referencia": 7.0,
"media_atual": 7.27,
"diferenca": 0.27,
"limite_drift": 0.5,
"drift_detectado": false
}
```

------------------------------------------------------------------------

## 💻 Frontend

Dashboard desenvolvido em **React**.

Acesso:

https://datathon-ml-postech-fiap-1.onrender.com/

------------------------------------------------------------------------

## ☁️ Deploy

API disponível em:

https://datathon-ml-postech-fiap.onrender.com/docs

------------------------------------------------------------------------

## 🐳 Executar com Docker

Build:

    docker build -t ml-api .

Run:

    docker run -p 8000:8000 ml-api

------------------------------------------------------------------------

## 🧪 Testes

Executar testes:

    pytest tests

Cobertura:

    pytest --cov=app

------------------------------------------------------------------------

## 🛠 Tecnologias Utilizadas

-   Python
-   FastAPI
-   Pandas
-   NumPy
-   Scikit-learn
-   Docker
-   React
-   Render
-   Pytest

------------------------------------------------------------------------

## 👩‍💻 Grupo 118

**Joanna de Cassia Valadares**\
https://www.linkedin.com/in/joannadecassiavaladares/

**Matheus Pereira de Jesus**\
https://www.linkedin.com/in/matheus-pereira-de-jesus-750589147/

------------------------------------------------------------------------

## 📌 Considerações Finais

Este projeto demonstra a aplicação prática de conceitos de **Machine
Learning Engineering e MLOps**, integrando modelagem preditiva, APIs,
frontend e deploy em cloud em uma solução completa.
