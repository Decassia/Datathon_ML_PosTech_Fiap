import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib

df = pd.read_csv("app/data/df_cleaned.csv")

# Engenharia de features
X = df[["IDADE", "FASE", "IAN", "IAA", "IEG", "INGRESSANTE"]].copy()

# mesma transformação usada na predição
X["IDADE"] = X["IDADE"] / 30.0
X["FASE"] = X["FASE"] / 7.0
X["IAN"] = X["IAN"] / 10.0
X["IAA"] = X["IAA"] / 10.0
X["IEG"] = X["IEG"] / 10.0
X["INGRESSANTE"] = X["INGRESSANTE"].astype(float)

# alvo possivelmente escalado
y = df["INDE"] / 10.0

# Separaçao do modelo em train e teste
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=1
)

model = RandomForestRegressor(
    n_estimators=50,
    max_depth=11,
    max_features="sqrt",
    random_state=1,
    criterion="squared_error"
)

model.fit(X_train, y_train)

#Salvando o modelo em pkl
joblib.dump(model, "random_forest_regressor_predict_student_inde.pkl")