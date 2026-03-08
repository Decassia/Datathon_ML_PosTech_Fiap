import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Info, TrendingUp, Target, Brain } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "https://datathon-ml-postech-fiap.onrender.com/";

const Previsoes = () => {
  const [age, setAge] = useState(12);
  const [level, setLevel] = useState(0);
  const [isFirstYear, setIsFirstYear] = useState(true);
  const [iaa, setIaa] = useState(0);
  const [ian, setIan] = useState(0);
  const [ieg, setIeg] = useState(0);
  const [result, setResult] = useState<{ inde: number; pedra: string } | null>(null);



  const handlePredict = async () => {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idade: age,
        fase: level,
        ingressante: isFirstYear ? 1 : 0,
        iaa: iaa,
        ian: ian,
        ieg: ieg,
      }),
    });

    const data = await response.json();
    const inde = data.inde;

    let pedra = "Quartzo";
    if (inde > 8.23) pedra = "Topázio";
    else if (inde > 6.868) pedra = "Ametista";
    else if (inde > 5.506) pedra = "Ágata";

    setResult({ inde, pedra });
  } catch (error) {
    console.error("Erro ao prever INDE:", error);
  }
};

  const pedraColor: Record<string, string> = {
    Quartzo: "from-purple-400 to-purple-600",
    Ágata: "from-amber-600 to-amber-800",
    Ametista: "from-violet-400 to-violet-600",
    Topázio: "from-blue-400 to-blue-600",
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="section-title">Previsões</h2>
        <div className="section-divider" />
      </div>

      <Tabs defaultValue="geral">
        <TabsList className="bg-muted p-1 rounded-xl">
          <TabsTrigger value="geral" className="rounded-lg">Análise Geral</TabsTrigger>
          <TabsTrigger value="detalhada" className="rounded-lg">Previsão Detalhada</TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="mt-6">
          <div className="bg-card rounded-xl p-8 shadow-card space-y-6">
            <div className="flex items-start gap-3">
              <Brain className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-heading font-semibold text-foreground text-lg">Modelo de Previsão do INDE</h3>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  Desenvolvido para auxiliar no desenvolvimento dos alunos, esse modelo prevê, antes do final do ano letivo, o INDE (Índice de Desenvolvimento Educacional) de um aluno. A previsão é feita com apenas três dos sete indicadores utilizados na ponderação do INDE e algumas informações do aluno.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: Info, label: "Erro médio absoluto", value: "0.44" },
                { icon: Target, label: "R²", value: "0.773" },
                { icon: TrendingUp, label: "Maior erro absoluto", value: "1.79" },
              ].map((stat) => (
                <div key={stat.label} className="bg-muted/50 rounded-lg p-4 text-center">
                  <stat.icon className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="font-heading font-bold text-foreground text-xl">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-sm text-muted-foreground">
              <p>O modelo utiliza: idade, fase atual, se o aluno é ingressante, IAN, IEG e IAA.</p>
              <p>Pode ser disponibilizado para professores ou alunos, permitindo análise eficiente do progresso e motivação para melhorias.</p>
              <p className="text-xs italic">Nota: não realiza previsões para alunos da fase 8.</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="detalhada" className="mt-6">
          <div className="bg-card rounded-xl p-8 shadow-card space-y-6">
            <h3 className="font-heading font-semibold text-foreground text-lg">Insira os dados do aluno</h3>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Idade do aluno: {age}</Label>
                <Slider value={[age]} onValueChange={(v) => setAge(v[0])} min={1} max={30} step={1} />
              </div>

              <div className="space-y-2">
                <Label>Fase do aluno: {level}</Label>
                <Slider value={[level]} onValueChange={(v) => setLevel(v[0])} min={0} max={7} step={1} />
              </div>

              <div className="space-y-2">
                <Label>O aluno é ingressante?</Label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsFirstYear(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isFirstYear ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                  >
                    Sim
                  </button>
                  <button
                    onClick={() => setIsFirstYear(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!isFirstYear ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                  >
                    Não
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>IAA (0–10)</Label>
                <Input type="number" min={0} max={10} step={0.01} value={iaa} onChange={(e) => setIaa(Number(e.target.value))} />
              </div>

              <div className="space-y-2">
                <Label>IAN (0–10)</Label>
                <Input type="number" min={0} max={10} step={0.05} value={ian} onChange={(e) => setIan(Number(e.target.value))} />
              </div>

              <div className="space-y-2">
                <Label>IEG (0–10)</Label>
                <Input type="number" min={0} max={10} step={0.01} value={ieg} onChange={(e) => setIeg(Number(e.target.value))} />
              </div>
            </div>

            <Button onClick={handlePredict} className="gradient-primary text-primary-foreground px-8 py-3 text-base font-heading font-semibold rounded-xl hover:opacity-90 transition-opacity">
              <Sparkles className="h-5 w-5 mr-2" />
              Prever INDE
            </Button>

            {result && (
              <div className={`rounded-xl p-6 bg-gradient-to-r ${pedraColor[result.pedra]} text-primary-foreground animate-slide-up`}>
                <h4 className="text-2xl font-heading font-bold">{result.pedra}!</h4>
                <p className="text-lg mt-1">INDE previsto: <strong>{result.inde.toFixed(2)}</strong></p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Previsoes;
