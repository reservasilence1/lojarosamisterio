const mysteries = [
  {
    title: "Mistérios Gozosos",
    day: "Segunda e Sábado",
    items: [
      "Anunciação do Anjo a Maria",
      "Visitação de Maria a Isabel",
      "Nascimento de Jesus",
      "Apresentação no Templo",
      "Encontro de Jesus no Templo",
    ],
  },
  {
    title: "Mistérios Luminosos",
    day: "Quinta-feira",
    items: [
      "Batismo de Jesus no Jordão",
      "Autorrevelação nas Bodas de Caná",
      "Anúncio do Reino de Deus",
      "Transfiguração de Jesus",
      "Instituição da Eucaristia",
    ],
  },
  {
    title: "Mistérios Dolorosos",
    day: "Terça e Sexta",
    items: [
      "Agonia de Jesus no Horto",
      "Flagelação de Jesus",
      "Coroação de Espinhos",
      "Jesus carrega a Cruz",
      "Crucificação e Morte de Jesus",
    ],
  },
  {
    title: "Mistérios Gloriosos",
    day: "Quarta e Domingo",
    items: [
      "Ressurreição de Jesus",
      "Ascensão de Jesus ao Céu",
      "Vinda do Espírito Santo",
      "Assunção de Maria ao Céu",
      "Coroação de Maria como Rainha",
    ],
  },
];

const MysteriesSection = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-3">
        Os 20 Mistérios do Rosário
      </h2>
      <p className="text-center text-sm text-muted-foreground mb-8 max-w-xl mx-auto italic">
        Cada conta do terço traz gravado o mistério correspondente, guiando sua contemplação durante a oração.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {mysteries.map((m, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-foreground uppercase tracking-wide">{m.title}</h3>
              <p className="text-xs text-muted-foreground italic">{m.day}</p>
            </div>
            <div className="space-y-3">
              {m.items.map((item, j) => (
                <div key={j} className="flex items-center gap-3">
                  <span className="w-7 h-7 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    {j + 1}
                  </span>
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MysteriesSection;
