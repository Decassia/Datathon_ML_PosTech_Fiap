import { useState } from "react";
import { Home, BarChart3, ClipboardList, Sun, Mail, CheckCircle, Menu, X, Sparkles } from "lucide-react";

type Section = "visao-geral" | "dados" | "analises" | "previsoes" | "monitoramento" | "contato" | "conclusao";

interface AppSidebarProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
}

const menuItems: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "visao-geral", label: "Visão Geral", icon: Home },
  { id: "dados", label: "Dados", icon: BarChart3 },
  { id: "analises", label: "Análises", icon: ClipboardList },
  { id: "previsoes", label: "Previsões", icon: Sun },
  { id: "contato", label: "Monitoramento", icon:BarChart3},
  { id: "conclusao", label: "Conclusão", icon: CheckCircle },
];

const AppSidebar = ({ currentSection, onSectionChange }: AppSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-card shadow-elevated"
      >
        {isOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-foreground/20 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 p-6 border-b border-sidebar-border">
          <Sparkles className="h-7 w-7 text-sidebar-primary" />
          <span className="text-lg font-heading font-bold text-sidebar-foreground">Passos Mágicos</span>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default AppSidebar;
export type { Section };
