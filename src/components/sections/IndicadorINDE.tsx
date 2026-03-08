import { useEffect, useState } from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,} from "recharts";

type IndeAno = {
  ano: string;
  media: number;
};

const IndicadorINDE = () => {
  const [indeYearData, setIndeYearData] = useState<IndeAno[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetch("https://datathon-ml-postech-fiap.onrender.com/analises/media-inde")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        console.log("Dados do INDE:", json);
        setIndeYearData(json);
      })
      .catch((error) => {
        console.error("Erro ao carregar gráfico de INDE:", error);
        setErro("Não foi possível carregar os dados do INDE.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-muted-foreground">Carregando dados do INDE...</p>;
  }

  if (erro) {
    return <p className="text-red-500">{erro}</p>;
  }

  if (!indeYearData.length) {
    return <p className="text-muted-foreground">Nenhum dado de INDE encontrado.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-foreground mb-2 text-2xl">
          Análise de INDE
        </h3>

        <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-2">
          <li>
           Índice do Desenvolvimento Educacional (INDE): Métrica de Processo Avaliativo Geral do Aluno, esta faz a ponderação dos indicadores IAN, IDA, IEG, IAA, IPS, IPP e IPV. - Veremos a media das notas por ano

          </li>
          <li>
            Para o ano de 2022 o INDE(Índice do Desenvolvimento Educacional) a média é de 7.04  como indica o grafico com a média, logo abaixo.
          </li>
          <li>
              Já para o ano de 2023 no que se refere ao INDE(Índice do Desenvolvimento Educacional)
              há uma diferença comparada com o ano anterior indicando que a média deu uma leve subida saindo de 7.04 para 7.34.</li>
          <li>
           Para o ano de 2024, o INDE (Índice de Desenvolvimento Educacional) apresentou uma média de 7,4, mantendo-se em um patamar semelhante ao observado nos anos anteriores. Esse resultado indica a continuidade de uma tendência estável no desempenho educacional.
              Além disso, a distribuição das médias apresenta simetria em torno do valor 7, sugerindo que a maior parte dos alunos se concentra próxima a esse nível de desempenho.
          </li>
        </ul>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-card">
        <h4 className="font-heading font-semibold text-foreground mb-4">
          Comparativo INDE por Ano
        </h4>

        <p className="text-sm text-muted-foreground mb-6">
          Média do Índice de Desenvolvimento Educacional por ano.
        </p>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={indeYearData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="ano"
                tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
              />
              <YAxis
                domain={[0, 10]}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <Tooltip contentStyle={{ borderRadius: 8 }} />
              <Legend />
              <Bar
                dataKey="media"
                fill="hsl(var(--primary))"
                name="Média INDE"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default IndicadorINDE;
