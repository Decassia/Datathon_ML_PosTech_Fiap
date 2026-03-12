<div align="center">

# 📊 Datathon MLOps – Previsão do INDE

### Pipeline de Machine Learning em produção para previsão do **Índice de Desenvolvimento Educacional (INDE)**  
### **Pós-Tech FIAP – Machine Learning Engineering**

![Python](https://img.shields.io/badge/Python-3.11-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-API-green)
![Scikit-Learn](https://img.shields.io/badge/MachineLearning-ScikitLearn-orange)
![Docker](https://img.shields.io/badge/Container-Docker-blue)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![Render](https://img.shields.io/badge/Deploy-Render-purple)
![Pytest](https://img.shields.io/badge/Tests-Pytest-yellow)

</div>

---

## 🚀 Sobre o Projeto

Este projeto foi desenvolvido no **Datathon da Pós-Tech FIAP – Machine Learning Engineering** com o objetivo de construir um fluxo completo de **MLOps** para prever o **INDE – Índice de Desenvolvimento Educacional** de alunos do programa **Passos Mágicos**.

A solução contempla as principais etapas do ciclo de vida de Machine Learning, desde a preparação dos dados até a disponibilização do modelo em produção, com monitoramento e interface para consumo.

### O projeto inclui:

- análise exploratória de dados
- engenharia de features
- treinamento de modelo preditivo
- disponibilização via **API REST com FastAPI**
- dashboard em **React**
- monitoramento simples de **data drift**
- containerização com **Docker**
- deploy em cloud com **Render**

---

## ✨ Destaques da Solução

- Modelo de regressão para prever o **INDE**
- API pronta para consumo por aplicações externas
- Frontend para interação com o modelo
- Endpoint de monitoramento para acompanhar drift
- Estrutura organizada para evolução do projeto
- Deploy online da API e da interface

---

## 🧠 Arquitetura da Solução

```mermaid
flowchart LR
    A[Usuário] --> B[Dashboard React]
    B --> C[API FastAPI]
    C --> D[Modelo Random Forest]
    D --> E[Predição do INDE]
    C --> F[Monitoramento]
    F --> G[Detecção de Drift]
    C --> H[(Dataset tratado)]
