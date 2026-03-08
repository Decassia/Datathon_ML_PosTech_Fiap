import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, RefreshCw, Activity } from "lucide-react";

interface MonitoramentoData {
  status_modelo: string;
  mensagem: string;
  media_referencia: number;
  media_atual: number;
  diferenca: number;
  limite_drift: number;
  drift_detectado: boolean;
}

export default function Monitoramento() {
  const [data, setData] = useState<MonitoramentoData | null>(null);
  const [loading, setLoading] = useState(false);

  const carregarMonitoramento = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://datathon-ml-postech-fiap.onrender.com/monitoramento/drift");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Erro ao buscar monitoramento:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarMonitoramento();
  }, []);

  if (!data) {
    return (
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-6">Monitoramento do Modelo</h1>
        <div className="bg-card rounded-2xl p-6 shadow-md">
          <p className="text-muted-foreground">Carregando monitoramento...</p>
        </div>
      </div>
    );
  }

  const percentualDrift =
  data && data.limite_drift
    ? Math.min((Math.abs(data.diferenca) / data.limite_drift) * 100, 100)
    : 0;

  const driftColor = data.drift_detectado
    ? "bg-red-500"
    : percentualDrift >= 80
    ? "bg-yellow-500"
    : "bg-green-500";

  const driftTextColor = data.drift_detectado
    ? "text-red-600"
    : percentualDrift >= 80
    ? "text-yellow-600"
    : "text-green-600";

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Monitoramento do Modelo</h1>
          <p className="text-muted-foreground mt-2">
            Acompanhamento de drift e estabilidade do modelo em produção.
          </p>
        </div>

        <button
          onClick={carregarMonitoramento}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-primary text-primary-foreground hover:opacity-90 transition disabled:opacity-60"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Atualizando..." : "Atualizar monitoramento"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-card rounded-2xl p-6 shadow-md">
          <p className="text-muted-foreground text-sm mb-2">Status do Modelo</p>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            <h2 className="text-3xl font-bold">{data.status_modelo}</h2>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-md">
          <p className="text-muted-foreground text-sm mb-2">Média de Referência</p>
          <h2 className="text-3xl font-bold">{data.media_referencia}</h2>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-md">
          <p className="text-muted-foreground text-sm mb-2">Média Atual</p>
          <h2 className="text-3xl font-bold">{data.media_atual}</h2>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-md">
          <p className="text-muted-foreground text-sm mb-2">Diferença</p>
          <h2 className="text-3xl font-bold">{data.diferenca}</h2>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-md">
          <p className="text-muted-foreground text-sm mb-2">Limite de Drift</p>
          <h2 className="text-3xl font-bold">{data.limite_drift}</h2>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-md">
          <p className="text-muted-foreground text-sm mb-2">Drift</p>
          <div className="flex items-center gap-2">
            {data.drift_detectado ? (
              <AlertTriangle className="h-6 w-6 text-red-500" />
            ) : (
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            )}
            <h2 className={`text-3xl font-bold ${driftTextColor}`}>
              {data.drift_detectado ? "Detectado" : "Não detectado"}
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-lg">Nível de aproximação do drift</p>
          <span className={`font-bold ${driftTextColor}`}>
            {percentualDrift ? percentualDrift.toFixed(1) : 0}%
          </span>
        </div>

        <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full ${driftColor} transition-all duration-500`}
           style={{ width: `${percentualDrift || 0}%` }}
          />
        </div>

        <p className="text-sm text-muted-foreground">
          Essa barra mostra o quanto a diferença atual está próxima do limite de drift.
        </p>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-md">
        <p className="text-muted-foreground text-sm mb-2">Mensagem</p>
        <p className="text-xl font-medium">{data.mensagem}</p>
      </div>
    </div>
  );
}
