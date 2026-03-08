import { useState } from "react";
import AppSidebar, { Section } from "@/components/AppSidebar";
import VisaoGeral from "@/components/sections/VisaoGeral";
import Dados from "@/components/sections/Dados";
import Analises_ from "@/components/sections/Analises_.tsx";
import Previsoes from "@/components/sections/Previsoes";
import Contato from "@/components/sections/Monitoramento.tsx";
import Conclusao from "@/components/sections/Conclusao";

const sections: Record<Section, React.FC> = {
  "visao-geral": VisaoGeral,
  dados: Dados,
  analises: Analises_,
  previsoes: Previsoes,
  contato: Contato,
  conclusao: Conclusao,
};

const Index = () => {
  const [currentSection, setCurrentSection] = useState<Section>("visao-geral");
  const ActiveSection = sections[currentSection];

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar currentSection={currentSection} onSectionChange={setCurrentSection} />
      <main className="lg:ml-64 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 pt-16 lg:pt-8">
          <ActiveSection />
          <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
            © 2024 Passos Mágicos · Transformando vidas pela educação
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
