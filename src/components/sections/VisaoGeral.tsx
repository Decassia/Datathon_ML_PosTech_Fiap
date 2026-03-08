import { Users, GraduationCap, Award, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import iconAcceleration from "@/assets/icon-acceleration.png";
import iconPrograms from "@/assets/icon-programs.png";
import iconEvents from "@/assets/icon-events.png";
import iconPartners from "@/assets/icon-partners.png";


const stats = [
  { number: "4.400", label: "Pessoas Impactadas", icon: Users },
  { number: "1.100", label: "Alunos no Programa de Aceleração", icon: GraduationCap },
  { number: "100", label: "Bolsistas em Ensino Particular", icon: Award },
  { number: "94", label: "Bolsistas em Ensino Superior", icon: BookOpen },
];
const programs = [
  {
    image: iconAcceleration,
    title: "Aceleração do Conhecimento",
    description: "Oferecemos uma educação de qualidade, com apoio psicológico e iniciativas que ampliam o horizonte dos jovens.",
  },
  {
    image: iconPrograms,
    title: "Programas Especiais",
    description: "Projetos de apadrinhamento e intercâmbio que promovem a integração cultural e o enriquecimento das experiências.",
  },
  {
    image: iconEvents,
    title: "Eventos e Ações Sociais",
    description: "Realizamos campanhas anuais de arrecadação, criando momentos especiais para nossas crianças e adolescentes.",
  },
  {
    image: iconPartners,
    title: "Parceiros e Apoiadores",
    description: "Agradecemos aos nossos colaboradores e empresas parceiras que ajudam a tornar nossos projetos uma realidade.",
  },
];

const VisaoGeral = () => {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative rounded-2xl overflow-hidden shadow-elevated">
        <img src={heroImage} alt="Crianças estudando na Passos Mágicos" className="w-full h-[400px] object-cover" />
        <div className="absolute inset-0 gradient-hero opacity-60" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground mb-4">
            Passos Mágicos ✨
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-xl">
            Transformando vidas de crianças e adolescentes por meio da educação e do suporte social.
          </p>
        </div>
      </section>

      {/* Quem Somos */}
      <section className="animate-slide-up">
        <h2 className="section-title">Quem Somos</h2>
        <div className="section-divider" />
        <p className="text-muted-foreground leading-relaxed max-w-3xl text-lg">
          A <strong className="text-foreground">Passos Mágicos</strong> é uma organização não governamental dedicada a transformar a vida de crianças e adolescentes por meio da educação e do suporte social. Nossa missão é criar oportunidades igualitárias de aprendizado e desenvolvimento pessoal, oferecendo uma ampla gama de programas que vão desde apoio escolar até atividades extracurriculares.
        </p>
      </section>

      {/* Nossa Missão */}
      <section>
        <h2 className="section-title">Nossa Missão</h2>
        <div className="section-divider" />
        <p className="text-muted-foreground leading-relaxed max-w-3xl text-lg">
          Temos como propósito capacitar esses jovens com habilidades e conhecimentos que os preparem para um futuro promissor, contribuindo para uma sociedade mais justa e equitativa. Com o apoio de nossos parceiros e colaboradores, seguimos ampliando nosso impacto.
        </p>
      </section>

      {/* Impacto */}
      <section>
          <h2 className="text-3xl font-bold mb-2">Impacto em 2023</h2>

          <p className="text-muted-foreground mb-8 text-lg">
            Em 2023, alcançamos resultados extraordinários:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-6 shadow text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-500" />

                <div className="text-3xl font-bold text-gray-800">
                  {stat.number}
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
</section>

      {/* Programas */}
      <section>
        <h2 className="section-title">Nossos Programas</h2>
        <div className="section-divider" />
        <p className="text-muted-foreground mb-8 text-lg">
          Desenvolvemos programas inovadores que atendem às necessidades acadêmicas e emocionais dos jovens.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog) => (
            <div key={prog.title} className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow duration-300 group">
              <img src={prog.image} alt={prog.title} className="w-24 h-24 mx-auto mb-4 object-contain rounded-lg group-hover:scale-105 transition-transform" />
              <h3 className="font-heading font-semibold text-foreground mb-2">{prog.title}</h3>
              <p className="text-sm text-muted-foreground">{prog.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default VisaoGeral;
