import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line, Legend,
} from "recharts";

const indeData2020 = [
  { range: "2-3", count: 5 }, { range: "3-4", count: 12 }, { range: "4-5", count: 28 },
  { range: "5-6", count: 65 }, { range: "6-7", count: 120 }, { range: "7-8", count: 185 },
  { range: "8-9", count: 95 }, { range: "9-10", count: 35 },
];

const indeData2021 = [
  { range: "2-3", count: 8 }, { range: "3-4", count: 18 }, { range: "4-5", count: 42 },
  { range: "5-6", count: 85 }, { range: "6-7", count: 155 }, { range: "7-8", count: 140 },
  { range: "8-9", count: 72 }, { range: "9-10", count: 25 },
];

const indeData2022 = [
  { range: "2-3", count: 6 }, { range: "3-4", count: 15 }, { range: "4-5", count: 35 },
  { range: "5-6", count: 78 }, { range: "6-7", count: 165 }, { range: "7-8", count: 195 },
  { range: "8-9", count: 88 }, { range: "9-10", count: 30 },
];

const idadeData = [
  { idade: 7, "2020": 15, "2021": 8, "2022": 5 },
  { idade: 8, "2020": 35, "2021": 22, "2022": 12 },
  { idade: 9, "2020": 55, "2021": 40, "2022": 28 },
  { idade: 10, "2020": 85, "2021": 65, "2022": 52 },
  { idade: 11, "2020": 110, "2021": 95, "2022": 78 },
  { idade: 12, "2020": 130, "2021": 120, "2022": 110 },
  { idade: 13, "2020": 115, "2021": 125, "2022": 135 },
  { idade: 14, "2020": 85, "2021": 98, "2022": 115 },
  { idade: 15, "2020": 48, "2021": 62, "2022": 85 },
  { idade: 16, "2020": 25, "2021": 30, "2022": 55 },
  { idade: 17, "2020": 12, "2021": 12, "2022": 25 },
  { idade: 18, "2020": 5, "2021": 5, "2022": 12 },
];

const pedrasData = [
  { year: "2020", Quartzo: 120, Ágata: 185, Ametista: 280, Topázio: 95 },
  { year: "2021", Quartzo: 135, Ágata: 170, Ametista: 245, Topázio: 88 },
  { year: "2022", Quartzo: 110, Ágata: 195, Ametista: 295, Topázio: 105 },
];

const radarSample = [
  { subject: "IEG", value: 7.2 }, { subject: "IAA", value: 6.8 },
  { subject: "INDE", value: 7.3 }, { subject: "IAN", value: 8.1 },
  { subject: "IPV", value: 6.5 }, { subject: "IPP", value: 7.0 },
  { subject: "IDA", value: 7.8 }, { subject: "IPS", value: 6.9 },
];

export default function Analises() {
  const [selectedYear, setSelectedYear] = useState<"2020" | "2021" | "2022">("2020");
  const indeDataMap = { "2020": indeData2020, "2021": indeData2021, "2022": indeData2022 };

  return (
    <div className="page-container">
      <h1 className="section-title">Análises</h1>
      <p className="section-subtitle">
        Análise de desempenho dos alunos com base no INDE e distribuição etária.
      </p>

      <Tabs defaultValue="inde" className="w-full">
        <TabsList className="mb-6 bg-muted">
          <TabsTrigger value="idade">Distribuição por Idade</TabsTrigger>
          <TabsTrigger value="inde">Indicador INDE</TabsTrigger>
          <TabsTrigger value="pedras">Performance (Pedras)</TabsTrigger>
          <TabsTrigger value="radar">Performance Acadêmica</TabsTrigger>
        </TabsList>

        <TabsContent value="idade">
          <div className="stat-card p-6">
            <h3 className="text-xl font-bold font-display mb-4 text-card-foreground">
              Distribuição Etária dos Alunos (2020–2022)
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              A idade dos alunos varia entre 7 e 18 anos, com maior concentração entre 12 e 13 anos.
              A idade média subiu gradualmente de 12 anos em 2020 para 13,1 anos em 2022.
            </p>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={idadeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="idade" label={{ value: "Idade", position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: "Alunos", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="2020" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="2021" stroke="hsl(var(--secondary))" strokeWidth={2} />
                <Line type="monotone" dataKey="2022" stroke="hsl(var(--accent))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="inde">
          <div className="stat-card p-6">
            <h3 className="text-xl font-bold font-display mb-4 text-card-foreground">
              Distribuição do INDE por Ano
            </h3>
            <div className="flex gap-2 mb-6">
              {(["2020", "2021", "2022"] as const).map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    selectedYear === y
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {selectedYear === "2020" && "Em 2020, a maior concentração está entre 7 e 8, com média de 7,3."}
              {selectedYear === "2021" && "Em 2021, a concentração está entre 6 e 7, com média de 6,9."}
              {selectedYear === "2022" && "Em 2022, os valores variam entre 6 e 8, com média em torno de 7."}
            </p>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={indeDataMap[selectedYear]}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="pedras">
          <div className="stat-card p-6">
            <h3 className="text-xl font-bold font-display mb-4 text-card-foreground">
              Distribuição de Pedras Preciosas
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              As pedras representam níveis de desempenho: Quartzo (2,4–5,5), Ágata (5,5–6,8),
              Ametista (6,8–8,2) e Topázio (8,2–9,3).
            </p>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={pedrasData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Quartzo" fill="hsl(var(--gem-quartzo))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Ágata" fill="hsl(var(--gem-agata))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Ametista" fill="hsl(var(--gem-ametista))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Topázio" fill="hsl(var(--gem-topazio))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="radar">
          <div className="stat-card p-6">
            <h3 className="text-xl font-bold font-display mb-4 text-card-foreground">
              Performance Acadêmica — Gráfico de Radar
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Exemplo de performance de um aluno com base nos indicadores: IEG, IAA, INDE, IAN, IPV, IPP, IDA, IPS.
            </p>
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={450}>
                <RadarChart data={radarSample} cx="50%" cy="50%" outerRadius="75%">
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 13 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <Radar
                    dataKey="value"
                    stroke="hsl(var(--secondary))"
                    fill="hsl(var(--secondary))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <span className="gem-badge bg-gem-ametista/20 text-accent">Ametista</span>
              <span className="ml-2 text-sm text-muted-foreground">INDE: 7.3</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
