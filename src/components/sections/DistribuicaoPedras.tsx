import { useEffect, useState } from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,} from "recharts";

type PedraItem = {
  ano: string;
  pedra: string;
  count: number;
};

const pedraColorMap: Record<string, string> = {
  QUARTZO: "#9966CC",
  ÁGATA: "#D2691E",
  AMETISTA: "#D3D3D3",
  "TOPÁZIO": "#007FFF",
};

const DistribuicaoPedras = () => {
  const [data, setData] = useState<PedraItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/analises/distribuicao-pedras")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        console.log("Distribuição de pedras:", json);
        setData(json);
      })
      .catch((error) => {
        console.error("Erro ao carregar distribuição de pedras:", error);
        setErro("Não foi possível carregar os dados das pedras.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-muted-foreground">Carregando distribuição de pedras...</p>;
  }

  if (erro) {
    return <p className="text-red-500">{erro}</p>;
  }

  const anos = ["2022", "2023", "2024"];

  return (
    <div className="bg-card rounded-xl p-6 shadow-card">

      <p className="text-sm text-muted-foreground mb-6">
        <strong>A perfomance do aluno é representada através de pedras preciosas  e o indicadorr INDE traz estes dados.
            Cada pedra representa uma faixa específica de desempenho</strong>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {anos.map((ano) => {
          const dadosAno = data.filter((item) => item.ano === ano);

          return (
            <div key={ano}>
              <h4 className="text-center font-heading font-semibold text-foreground mb-4 text-xl">
                {ano}
              </h4>

              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dadosAno}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="pedra"
                      tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                    />
                    <YAxis
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <Tooltip contentStyle={{ borderRadius: 8 }} />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {dadosAno.map((entry, index) => (
                        <Cell
                          key={`${ano}-${index}`}
                          fill={pedraColorMap[entry.pedra] || "#000000"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>

              </div>
            </div>

          );
        })}
      </div>
    </div>
  );
};

export default DistribuicaoPedras;