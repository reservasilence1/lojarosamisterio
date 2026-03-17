const details = [
  { num: 1, title: "Cordão Durável", desc: "Fio encerado resistente e elegante" },
  { num: 2, title: "Contas de Madeira Nobre 8mm", desc: "Cada conta com o mistério gravado" },
  { num: 3, title: "Medalha de São Bento 17mm", desc: "Proteção e devoção em bronze" },
  { num: 4, title: "Crucifixo de Metal e Madeira", desc: "Acabamento artesanal refinado" },
  { num: 5, title: "Pai-Nossos com Orações", desc: "Textos em português gravados" },
];

const ProductDetails = () => {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-4">
        Detalhes do Produto
      </h2>

      {/* Product detail image placeholder */}
      <div className="rounded-lg overflow-hidden border border-border mb-8">
        <img
          src="/images/terco-detalhes.jpg"
          alt="Detalhes do Terço Católico"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Benefits list */}
      <div className="bg-card rounded-lg border border-border p-6 space-y-6">
        {details.map((d) => (
          <div key={d.num} className="flex items-start gap-4">
            <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              {d.num}
            </div>
            <div>
              <h3 className="font-bold text-foreground uppercase tracking-wide text-sm">{d.title}</h3>
              <p className="text-sm text-muted-foreground">{d.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductDetails;
