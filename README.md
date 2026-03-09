

# 📊 Datathon MLOps – Previsão do INDE  
**Pós-Tech FIAP – Machine Learning Engineering**

## 📌 Descrição do Projeto

Este projeto foi desenvolvido como parte do **Datathon da Pós-Tech FIAP** e tem como objetivo criar um pipeline completo de **Machine Learning em produção (MLOps)** para prever o **INDE – Índice de Desenvolvimento Educacional** de alunos do programa **Passos Mágicos**.

O projeto inclui todas as etapas do ciclo de vida de um modelo de Machine Learning:

- Análise exploratória de dados (EDA)
- Engenharia de features
- Treinamento de modelo
- API para predição
- Monitoramento de modelo
- Containerização com Docker
- Deploy em ambiente cloud

---

# 🧠 Arquitetura da Solução

Usuário / Dashboard React  
        ↓  
API FastAPI  
        ↓  
Modelo RandomForest (.pkl)  
        ↓  
Monitoramento do Modelo  
        ↓  
Deploy Cloud (Render)

---

# 📂 Estrutura do Projeto

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

---

# 📊 Dataset

O dataset contém dados educacionais dos alunos do programa Passos Mágicos.

Principais variáveis utilizadas:

| Variável | Descrição |
|--------|--------|
| IDADE | Idade do aluno |
| FASE | Fase educacional |
| IAA | Indicador de Aprendizagem |
| IAN | Indicador de Notas |
| IEG | Indicador de Engajamento |
| INGRESSANTE | Indica se o aluno entrou no programa naquele ano |
| INDE | Índice de Desenvolvimento Educacional (variável alvo) |

---

# 🔎 Análise Exploratória de Dados (EDA)

Foram realizadas diversas análises exploratórias para entender o comportamento das variáveis, incluindo:

- distribuição de idade
- distribuição do INDE
- correlação entre indicadores educacionais
- análise por fase educacional
- análise temporal por ano
- análise por categoria PEDRA

---

# ⚙️ Engenharia de Features

Foram aplicadas diversas transformações nos dados:

- normalização das variáveis
- tratamento de valores ausentes
- padronização de colunas
- estimativa de idade a partir do histórico do aluno

Exemplo de transformação aplicada no modelo:

idade / 30  
fase / 7  
ian / 10  
iaa / 10  
ieg / 10  

---

# 🤖 Modelo de Machine Learning

Modelo utilizado:

**Random Forest Regressor**

Biblioteca:

scikit-learn

Parâmetros principais:

| Parâmetro | Valor |
|----------|------|
| n_estimators | 50 |
| max_depth | 11 |
| max_features | sqrt |
| random_state | 1 |

Modelo salvo utilizando **joblib**:

random_forest_regressor_predict_student_inde.pkl

---

# 🌐 API de Predição

API construída com **FastAPI**.

Endpoint principal:

POST /predict

Exemplo de entrada:

{
  "idade": 12,
  "fase": 3,
  "ingressante": 1,
  "iaa": 8.5,
  "ian": 7.8,
  "ieg": 6.9
}

Resposta:

{
  "inde": 7.42
}

Documentação automática:

/docs

---

# 📈 Monitoramento do Modelo

Foi implementado um endpoint simples de monitoramento para detectar **data drift**.

Endpoint:
<img width="1472" height="55" alt="image" src="https://github.com/user-attachments/assets/7e7ed022-8ec0-43b8-ba17-7c08f695dfb6" />


---

# 🐳 Containerização com Docker

Dockerfile utilizado:

FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["sh", "-c", "uvicorn app.api.main:app --host 0.0.0.0 --port ${PORT:-10000}"]

---

# ☁️ Deploy

Deploy realizado na plataforma **Render**.
url: https://datathon-ml-postech-fiap.onrender.com/docs#/

Endpoints disponíveis:

<img width="1472" height="826" alt="image" src="https://github.com/user-attachments/assets/bbb21cb4-71d8-403a-a2a1-dd2668d367f2" />


---

# 💻 Executando Localmente

Clonar o projeto:

git clone https://github.com/SEU_REPO/Datathon_ML_PosTech_Fiap.git

Instalar dependências:

pip install -r requirements.txt

Rodar API:

uvicorn app.api.main:app --reload

Abrir no navegador:

https://datathon-ml-postech-fiap.onrender.com/docs

---

# 🐳 Executar com Docker

Build:

docker build -t ml-api .

Run:

docker run -p 8000:8000 ml-api

---

# 🛠 Tecnologias Utilizadas

- Python
- FastAPI
- Pandas
- NumPy
- Scikit-learn
- Docker
- Render
- React

---

# 👩‍💻 Grupo 118
Joanna de Cassia Valadares
LinkedIn  
https://www.linkedin.com/in/joannadecassiavaladares/

Matheus Pereira de Jesus
LinkedIn  
 https://www.linkedin.com/in/matheus-pereira-de-jesus-750589147/

