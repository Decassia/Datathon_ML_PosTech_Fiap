import { Download } from "lucide-react";

const datasets = [
  { label: "DF 2022", filename: "df_2022.csv" },
  { label: "DF 2023", filename: "df_2023.csv" },
  { label: "DF 2024", filename: "df_2024.csv" },
  { label: "DF Geral", filename: "df_geral_novo.csv" },
  { label: "Dados Limpos", filename: "df_cleaned.csv" },
];

const tables = [
  { label: "Tabela Idade", filename: "tabela_idades.csv" },
  { label: "Tabela Pedras", filename: "tabela_pedras_por_ano.csv" },

];

const DataCard = ({ label, filename }: { label: string; filename: string }) => (
  <div className="bg-card rounded-xl p-5 shadow-card flex items-center justify-between hover:shadow-elevated transition-shadow">
    <div>
      <p className="font-heading font-semibold text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">{filename}</p>
    </div>
    <button className="gradient-primary text-primary-foreground p-2 rounded-lg hover:opacity-90 transition-opacity">
      <Download className="h-4 w-4" />
    </button>
  </div>
);

const Dados = () => {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="section-title">Dados</h2>
        <div className="section-divider" />
        <p className="text-muted-foreground text-lg">
          Esta seção apresenta os dados coletados e analisados pela Passos Mágicos.
        </p>
      </div>

      <div>
        <h3 className="font-heading font-semibold text-foreground mb-4">Datasets</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {datasets.map((d) => <DataCard key={d.label} {...d} />)}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-semibold text-foreground mb-4">Tabelas</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tables.map((t) => <DataCard key={t.label} {...t} />)}
        </div>
      </div>
    </div>
  );
};

export default Dados;
