import { Github, Linkedin, Mail, Phone, Globe } from "lucide-react";

const team = [
  {
    name: "Matheus Pereira de Jesus",
    linkedin: "https://www.linkedin.com/in/matheus-pereira-de-jesus-750589147/",
  },
  {
    name: "Joanna de Cassia Valadares",
    linkedin: "https://www.linkedin.com/in/joannadecassiavaladares/",
  },
];

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "passosmagicos@passosmagicos.org.br",
    href: "mailto:passosmagicos@passosmagicos.org.br",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "(11) 98208-3282",
    href: "tel:+5511982083282",
  },
  {
    icon: Globe,
    label: "Site",
    value: "passosmagicos.org.br",
    href: "https://passosmagicos.org.br/",
  },
];

const Conclusao = () => {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="section-title">Conclusão</h2>
        <div className="section-divider" />
        <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
          Na <strong className="text-foreground">Passos Mágicos</strong>,
          acreditamos que cada criança e adolescente merece a chance de um
          futuro melhor. Através de nossos programas e iniciativas, buscamos
          não apenas impactar a vida dos jovens, mas também inspirar uma mudança
          positiva nas comunidades em que atuamos.
        </p>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mt-4">
          Junte-se a nós nessa jornada de esperança e transformação! Cada ação
          conta, e juntos podemos fazer a diferença na vida de muitos.
        </p>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-card">
        <a
          href="https://github.com/Decassia/Datathon_ML_PosTech_Fiap"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-primary hover:underline font-heading font-semibold mb-6"
        >
          <Github className="h-5 w-5" />
          Acessar o repositório no GitHub
        </a>

        <h3 className="font-heading font-semibold text-foreground mb-4">
          Equipe
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {team.map((member) => (
            <a
              key={member.name}
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <Linkedin className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-sm text-foreground">{member.name}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="section-title">Contato</h2>
          <div className="section-divider" />
          <p className="text-muted-foreground text-lg">
            Entre em contato com a ONG Passos Mágicos.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {contacts.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 group text-center"
              >
                <Icon className="h-8 w-8 mx-auto mb-3 text-accent group-hover:scale-110 transition-transform" />
                <p className="font-heading font-semibold text-foreground">
                  {item.label}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.value}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Conclusao;
