import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_URL =
  import.meta.env.VITE_API_URL || "https://datathon-ml-postech-fiap.onrender.com";

type PredictionResult = {
  inde: number;
};

const Previsoes = () => {
  const [age, setAge] = useState<number>(12);
  const [level, setLevel] = useState<number>(1);
  const [isFirstYear, setIsFirstYear] = useState<boolean>(true);
  const [iaa, setIaa] = useState<number>(7);
  const [ian, setIan] = useState<number>(7);
  const [ieg, setIeg] = useState<number>(7);

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handlePredict = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const payload = {
        idade: Number(age),
        fase: Number(level),
        ingressante: isFirstYear ? 1 : 0,
        iaa: Number(iaa),
        ian: Number(ian),
        ieg: Number(ieg),
      };

      console.log("API URL:", API_URL);
      console.log("Payload enviado:", payload);

      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      console.log("Status:", response.status);
      console.log("Resposta bruta:", responseText);

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${responseText}`);
      }

      const data: PredictionResult = JSON.parse(responseText);
      setResult(data);
    } catch (err) {
      console.error("Erro ao chamar a API:", err);
      setError("Não foi possível realizar a previsão. Verifique a API e os dados informados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Previsão de INDE</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="idade">Idade</Label>
            <Input
              id="idade"
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fase">Fase</Label>
            <Input
              id="fase"
              type="number"
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="iaa">IAA</Label>
            <Input
              id="iaa"
              type="number"
              step="0.1"
              value={iaa}
              onChange={(e) => setIaa(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ian">IAN</Label>
            <Input
              id="ian"
              type="number"
              step="0.1"
              value={ian}
              onChange={(e) => setIan(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ieg">IEG</Label>
            <Input
              id="ieg"
              type="number"
              step="0.1"
              value={ieg}
              onChange={(e) => setIeg(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ingressante">Ingressante</Label>
            <select
              id="ingressante"
              value={isFirstYear ? "sim" : "nao"}
              onChange={(e) => setIsFirstYear(e.target.value === "sim")}
              className="w-full border rounded-md px-3 py-2 bg-background"
            >
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <Button onClick={handlePredict} disabled={loading} className="w-full">
              {loading ? "Calculando..." : "Prever INDE"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="rounded-2xl border-red-300">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Resultado da Previsão</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">
              INDE previsto: {result.inde.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Previsoes;
