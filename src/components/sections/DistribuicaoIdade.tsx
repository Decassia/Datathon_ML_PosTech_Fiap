import { useEffect, useState } from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,} from "recharts";

type IdadeItem = {
  idade: number;
  ano2022: number;
  ano2023: number;
  ano2024: number;
  TOTAL: number;
};

const DistribuicaoIdade = () => {
  const [data, setData] = useState<IdadeItem[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
     fetch("http://localhost:8000/analises/estatisticas-idade")
        .then((res) => res.json())
        .then((json) => setStats(json));
    fetch("http://localhost:8000/analises/distribuicao-idade")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        console.log("Dados da API:", json);
        setData(json);
      })

      .catch((error) => {
        console.error("Erro ao carregar dados:", error);
        setErro("Não foi possível carregar os dados da API.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-muted-foreground">Carregando dados...</p>;
  }

  if (erro) {
    return <p className="text-red-500">{erro}</p>;
  }

  if (!data.length) {
    return <p className="text-muted-foreground">A API retornou lista vazia.</p>;
  }

  return (
    <div className="bg-card rounded-xl p-6 shadow-card">
      <h3 className="font-heading font-semibold text-foreground mb-2">
        Distribuição de Idades por Ano
      </h3>

      <p className="text-sm text-muted-foreground mb-6">
        <li>A distribuição de idades dos alunos da ONG Passos Mágicos entre os
        anos de 2022, 2023 e 2024 varia de 7 a 20 anos, com maior concentração
        nas faixas de 12 e 13 anos.</li>
            <li>O gráfico abaixo nos mostra que a grande maioria da população atendida tinha idades entre 11 e 14 anos, com poucos casos abaixo de 8 ou acima de 19.
        A mediana de 12 anos reforça que a ONG atua majoritariamente com um grupo jovem, nos primeiros anos da adolescência, com características
        etárias bastante homogêneas.</li>
      </p>




      <div className="h-[420px] mb-8">

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="idade" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ano2022" name="2022" fill="#3b82f6" />
            <Bar dataKey="ano2023" name="2023" fill="#22c55e" />
            <Bar dataKey="ano2024" name="2024" fill="#f97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h3 className="font-heading font-semibold text-foreground mb-4">
        Tabela de Quantidade por Idade
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
            <li>A tabela apresenta abaixo a distribuição de idades dos alunos da ONG Passos Mágicos ao longo dos anos de 2022, 2023 e 2024, com o total acumulado por faixa etária. Observamos que a idade dos alunos varia entre 7 e 20 anos, com as maiores concentrações em faixas específicas, como as idades de 13 e 12 anos.
            </li>
            <li> Nas estatísticas descritivas por ano, observamos um aumento gradual na idade média dos alunos, de 11 e 12 anos entre 2022 e 2023 para 12 a 14 anos em 2024. A variação (desvio padrão) diminui ao longo dos anos, indicando uma concentração maior de alunos em torno de idades específicas.         </li>
            <li>Além disso, os quartis sugerem que a maioria dos alunos tem entre 10 e 16 ano ao longo dos três anos analisados.</li>
        </p>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Idade</th>
              <th className="border p-2 text-left">2022</th>
              <th className="border p-2 text-left">2023</th>
              <th className="border p-2 text-left">2024</th>
              <th className="border p-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.idade}</td>
                <td className="border p-2">{item.ano2022}</td>
                <td className="border p-2">{item.ano2023}</td>
                <td className="border p-2">{item.ano2024}</td>
                <td className="border p-2 font-semibold">{item.TOTAL}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 {stats && (
  <div className="mt-10">
    <h3 className="font-heading font-semibold text-foreground mb-5 text-xl">
      Estatísticas Descritivas por Ano
    </h3>
    <p className="text-sm text-muted-foreground mb-6">
        <li> Em 2022, a ONG Passos Mágicos trabalhou predominantemente com jovens cuja idade girava em torno de 12 anos. A curva de densidade suaviza a distribuição etária,
        revelando que, embora houvesse algumas pessoas mais jovens e mais velhas, a maior concentração estava entre 11 e 13 anos.</li>

    </p>
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="grid grid-cols-4 bg-muted/40 px-6 py-4 text-sm font-semibold text-foreground">
        <div>Métrica</div>
        <div className="text-center">2022</div>
        <div className="text-center">2023</div>
        <div className="text-center">2024</div>
      </div>

      <div className="divide-y divide-border">
        {Object.keys(stats[2022]).map((metric) => (
          <div
            key={metric}
            className="grid grid-cols-4 items-center px-6 py-4 hover:bg-muted/20 transition-colors"
          >
            <div className="font-medium text-foreground capitalize">
              {metric}
            </div>
            <div className="text-center text-muted-foreground">
              {stats[2022][metric]}
            </div>
            <div className="text-center text-muted-foreground">
              {stats[2023][metric]}
            </div>
            <div className="text-center text-muted-foreground">
              {stats[2024][metric]}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
    </div>


  );


};

export default DistribuicaoIdade;