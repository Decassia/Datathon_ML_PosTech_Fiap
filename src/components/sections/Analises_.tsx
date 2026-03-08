
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import DistribuicaoIdade from "./DistribuicaoIdade";
import IndicadorINDE from "./IndicadorINDE";
import DistribuicaoPedras from "./DistribuicaoPedras";




const enrollmentData = [
  { serie: "Psicologia", desistencia: 28.6 },
  { serie: "Construindo Sonhos", desistencia: 44.4 },
  { serie: "Inglês", desistencia: 22.3 },
  { serie: "Fase 1", desistencia: 15.2 },
  { serie: "Fase 2", desistencia: 14.8 },
  { serie: "Fase 3", desistencia: 12.1 },
  { serie: "Fase 4", desistencia: 11.5 },
  { serie: "Fase 5", desistencia: 10.2 },
  { serie: "Fase 6", desistencia: 8.9 },
  { serie: "Fase 7", desistencia: 6.7 },
  { serie: "Fase 8", desistencia: 4.5 },
];

const periodData = [
  { periodo: "Manhã", matriculas: 2105, desistencia: 16.5 },
  { periodo: "Tarde", matriculas: 3678, desistencia: 15.8 },
  { periodo: "Noite", matriculas: 1890, desistencia: 18.99 },
  { periodo: "Especial", matriculas: 1484, desistencia: 19.27 },
];



const radarSampleData = [
  { indicador: "IEG", valor: 7.5 },
  { indicador: "IAA", valor: 6.8 },
  { indicador: "INDE", valor: 7.2 },
  { indicador: "IAN", valor: 8.1 },
  { indicador: "IPV", valor: 6.5 },
  { indicador: "IPP", valor: 7.0 },
  { indicador: "IDA", valor: 7.8 },
  { indicador: "IPS", valor: 6.9 },
];

const COLORS = {
  quartzo: "#9966CC",
  agata: "#D2691E",
  ametista: "#D3D3D3",
  topazio: "#007FFF",
};

const pedrasColors = ["#9966CC", "#D2691E", "#D3D3D3", "#007FFF"];

const Analises_ = () => {
  const [analysisTab, setAnalysisTab] = useState("matriculas");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="section-title">Análises</h2>
        <div className="section-divider" />
      </div>

      <Tabs value={analysisTab} onValueChange={setAnalysisTab}>
        <TabsList className="bg-muted p-1 rounded-xl flex-wrap h-auto">
          <TabsTrigger value="matriculas" className="rounded-lg text-xs sm:text-sm">Distribuição Por Idade</TabsTrigger>
          <TabsTrigger value="faltas" className="rounded-lg text-xs sm:text-sm">Alunos vs Faltas</TabsTrigger>
          <TabsTrigger value="desempenho" className="rounded-lg text-xs sm:text-sm">Desempenho (INDE)</TabsTrigger>
          <TabsTrigger value="performance" className="rounded-lg text-xs sm:text-sm">Analise de Performance</TabsTrigger>


        </TabsList>

        <TabsContent value="matriculas" className="mt-6 space-y-8">
          <div className="bg-card rounded-xl p-6 shadow-card">
              <DistribuicaoIdade />

          </div>



        </TabsContent>

        <TabsContent value="faltas" className="mt-6 space-y-8">
          <div className="bg-card rounded-xl p-6 shadow-card">
            <h3 className="font-heading font-semibold text-foreground mb-2">Indicadores de Alunos Efetivos vs Faltas</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>• Queda nas faltas: de 25% (2022) para 13% (2023) e 11% (2024).</p>
              <p>• Média de faltas por turno: 18%, com Manhã e Especial em 19%.</p>
              <p>• Disciplina Polivalente com 47% de faltas, impulsionada por 2022 (58%).</p>
              <p>• Professor 10 (Inglês) com média de 27% de faltas — destaque para avaliação.</p>
              <p>• Total de 2.093 alunos efetivamente assistindo às aulas.</p>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card">
            <h3 className="font-heading font-semibold text-foreground mb-2">Dashboard Power BI</h3>
            <div className="flex justify-center">
              <iframe
                src="https://app.powerbi.com/view?r=eyJrIjoiZTBjMzg5NTktNDU5MC00OTc3LWE3YWUtMWE2ODQ1OTM1ZTg2IiwidCI6ImEwNDNmMzhlLTgzYTItNDVhNC1hY2YxLWIwZDNhY2EwYjEwMiJ9&pageName=a0b089a779d2f91bc277"
                width="100%"
                height="500"
                frameBorder={0}
                allowFullScreen
                className="rounded-lg max-w-4xl w-full"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="desempenho" className="mt-6 space-y-8">
          {/* INDE*/}

              <TabsContent value="desempenho" className="mt-6 space-y-8">
                    <IndicadorINDE />
              </TabsContent>

         </TabsContent>
          {/* Pedras Performance */}
          <TabsContent value="performance" className="mt-6 space-y-8">
              <div className="bg-card rounded-xl p-6 shadow-card">
                <h3 className="font-heading font-semibold text-foreground mb-2">As pedras preciosas e a perfomance dos alunos</h3>

                 <TabsContent value="performance" className="mt-6 space-y-8">
                          <DistribuicaoPedras />
                 </TabsContent>
            </div>
              <p className="text-sm text-muted-foreground mb-4">
                  <strong>Pedras e faixas de desempenho (INDE):</strong>
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                  <li>
                    <strong>1ª Quartzo:</strong> é a pedra inicial de todo aluno. Indica que o desempenho geral,
                    baseado no INDE, varia entre <strong>2,4 e 5,5</strong>.
                  </li>

                  <li>
                    <strong>2ª Ágata:</strong> representa alunos cujo desempenho geral no indicador INDE
                    varia entre <strong>5,5 e 6,8</strong>.
                  </li>

                  <li>
                    <strong>3ª Ametista:</strong> indica alunos com desempenho intermediário,
                    com valores do INDE entre <strong>6,8 e 8,2</strong>.
                  </li>

                  <li>
                    <strong>4ª Topázio:</strong> representa os alunos com melhor desempenho,
                    com valores do INDE entre <strong>8,2 e 9,3</strong>.
                  </li>
                </ul>

          </TabsContent>



      </Tabs>
    </div>
  );
};

export default Analises_;
