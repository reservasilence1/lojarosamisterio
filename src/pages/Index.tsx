import { useState } from "react";
import { Star, ShieldCheck, Truck, Lock, ShoppingCart, Crown, Shield, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ProductDetails from "@/components/ProductDetails";
import MysteriesSection from "@/components/MysteriesSection";
import CustomerPhotosCarousel from "@/components/CustomerPhotosCarousel";
import SocialProofReviews from "@/components/SocialProofReviews";

const models = [
  {
    id: "sao-bento",
    label: "São Bento",
    images: [
      "/images/terco-sao-bento.jpg",
      "/images/sao-bento-2.jpg",
      "/images/sao-bento-3.jpg",
      "/images/sao-bento-4.jpg",
      "/images/sao-bento-5.jpg",
    ],
  },
  {
    id: "aparecida",
    label: "Nossa Senhora Aparecida",
    images: [
      "/images/terco-aparecida.jpg",
      "/images/aparecida-2.jpg",
      "/images/aparecida-3.jpg",
      "/images/aparecida-4.jpg",
      "/images/aparecida-5.jpg",
    ],
  },
];

const prices = [
  { qty: 1, label: "1 Unidade", price: 19, perUnit: null, checkoutUrl: "https://seu-link-checkout-19.com" },
  { qty: 2, label: "2 Unidades", price: 29, perUnit: 15, checkoutUrl: "https://seu-link-checkout-29.com" },
  { qty: 3, label: "3 Unidades", price: 39, perUnit: 13, checkoutUrl: "https://seu-link-checkout-39.com" },
];

const features = [
  {
    icon: Crown,
    title: "Resistência e Tradição",
    desc: "As contas em madeira nobre oferecem um toque orgânico e firme, enquanto o bronze traz um visual vintage e solene que remete aos antigos mistérios.",
  },
  {
    icon: Shield,
    title: "Proteção e Exorcismo",
    desc: "O entremeio traz a Medalha de São Bento, o maior símbolo de proteção da Igreja, ideal para afastar o mal e fortalecer o espírito durante o combate da oração.",
  },
  {
    icon: Gem,
    title: "Beleza que Atravessa Gerações",
    desc: "Os metais em bronze não descascam; eles ganham personalidade com o tempo, tornando-se uma relíquia para sua família.",
  },
];

const testimonials = [
  { stars: 5, text: "O terço é lindo e as placas realmente ajudam a meditar. Minha oração nunca mais foi a mesma. Recomendo a todos!", author: "Maria Aparecida S." },
  { stars: 5, text: "Presenteei minha mãe e ela chorou de emoção. A qualidade é impressionante, parece peça de colecionador.", author: "José Carlos M." },
  { stars: 5, text: "Já tenho há 6 meses e o bronze está ainda mais bonito. É realmente uma relíquia que vou passar para meus filhos.", author: "Ana Paula R." },
  { stars: 5, text: "Uso no grupo de oração da paróquia. As placas dos mistérios são uma ideia genial para quem está aprendendo a rezar o terço.", author: "Pe. Roberto L." },
];

const faqs = [
  { q: "Qual o material do terço?", a: "O terço é feito com contas de madeira nobre e metais em bronze envelhecido, incluindo a Medalha de São Bento e crucifixo." },
  { q: "Qual o tamanho do terço?", a: "O terço possui tamanho tradicional, com aproximadamente 45cm de comprimento total." },
  { q: "Como funcionam as placas dos mistérios?", a: "As placas de metal são distribuídas entre as dezenas, indicando o Mistério que deve ser meditado, servindo como um guia visual para a oração." },
  { q: "Posso usar para rezar normalmente?", a: "Sim! O terço funciona perfeitamente para a oração tradicional do rosário, com o diferencial das placas indicativas dos mistérios." },
  { q: "Qual o prazo de entrega?", a: "O prazo de entrega varia de acordo com a região, geralmente entre 5 a 15 dias úteis para todo o Brasil." },
  { q: "Posso presentear alguém?", a: "Com certeza! O terço vem em uma embalagem especial, perfeita para presentear pessoas queridas." },
];

const Index = () => {
  const [selected, setSelected] = useState(0);
  const [selectedModel, setSelectedModel] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const currentModel = models[selectedModel];

  const handleModelChange = (i: number) => {
    setSelectedModel(i);
    setSelectedPhoto(0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Sticky */}
      <header className="w-full py-3 bg-primary text-primary-foreground text-center sticky top-0 z-50 shadow-md">
        <img src="/images/logo-header.png" alt="Loja Rosa Mistério" className="h-10 mx-auto" />
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Product Image */}
          <div>
            <div className="rounded-lg overflow-hidden border border-border">
              <img src={currentModel.images[selectedPhoto]} alt="Terço Católico de Contemplação dos Mistérios" className="w-full h-auto object-cover" />
            </div>
            <div className="flex gap-2 mt-3">
              {currentModel.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedPhoto(i)}
                  className={`w-16 h-16 rounded border overflow-hidden bg-muted cursor-pointer transition-all ${
                    selectedPhoto === i ? "border-primary ring-2 ring-primary/30" : "border-border"
                  }`}
                >
                  <img src={img} alt={`Detalhe ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <span className="inline-block bg-primary/15 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              ✦ Edição {currentModel.label}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Terço Católico de Contemplação dos Mistérios
            </h1>
            <p className="text-sm text-muted-foreground">Madeira Nobre & Bronze — Medalha de {currentModel.label} e Crucifixo</p>
            <div className="flex items-center gap-2">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-sm text-muted-foreground">4.9 (10.793 avaliações)</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              O mapa para sua oração e a armadura para sua alma. Unindo a força rústica da madeira com a nobreza eterna do bronze, este terço é uma ferramenta pedagógica de fé com placas indicativas dos Mistérios para meditação profunda.
            </p>

            {/* Model Selector - Shopee style */}
            <div className="space-y-2">
              <p className="text-sm font-bold text-foreground">Modelo:</p>
              <div className="flex gap-3">
                {models.map((model, i) => (
                  <button
                    key={model.id}
                    onClick={() => handleModelChange(i)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all text-sm ${
                      selectedModel === i
                        ? "border-primary bg-primary/5 text-foreground font-bold"
                        : "border-border hover:border-primary/40 text-muted-foreground"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-border shrink-0">
                      <img src={model.images[0]} alt={model.label} className="w-full h-full object-cover" />
                    </div>
                    {model.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <p className="text-sm font-bold text-foreground">Escolha sua oferta:</p>
              {prices.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all ${
                    selected === i ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                  }`}
                >
                  <span className="font-medium text-foreground">{p.label}</span>
                  <div className="text-right">
                    <span className="font-bold text-primary text-lg">R$ {p.price}</span>
                    {p.perUnit && <span className="block text-xs text-muted-foreground line-through">R$ {p.perUnit}/un</span>}
                  </div>
                </button>
              ))}
            </div>

            <Button
              className="w-full h-14 text-lg font-bold gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => window.open(prices[selected].checkoutUrl, "_blank")}
            >
              <ShoppingCart className="w-5 h-5" />
              Comprar Agora — R$ {prices[selected].price}
            </Button>

            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Entrega para todo Brasil</span>
              <span className="flex items-center gap-1"><Lock className="w-4 h-4" /> Compra 100% segura</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Reviews */}
      <SocialProofReviews />

      {/* Product Details Section */}
      <ProductDetails />

      {/* Diferencial */}
      <section className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">O Grande Diferencial: O Caminho da Contemplação</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-foreground leading-relaxed">
            O diferencial exclusivo deste terço está nas <strong>placas de metal distribuídas entre as dezenas</strong>. Cada placa indica o Mistério que deve ser meditado, servindo como um ancoradouro para sua mente. Ao tocar na placa, você é convidado a pausar e visualizar a cena bíblica, transformando a repetição em uma verdadeira vida de Cristo.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">Por que escolher a versão {currentModel.label}?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Card key={i} className="text-center border-border">
              <CardContent className="pt-8 pb-6 px-6 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Mysteries of the Rosary */}
      <MysteriesSection />

      {/* Customer Photos Carousel */}
      <CustomerPhotosCarousel />

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">O Que Nossos Clientes Dizem</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className="border-border">
              <CardContent className="pt-6 pb-4 px-6 space-y-3">
                <div className="flex text-primary">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm text-foreground italic">"{t.text}"</p>
                <p className="text-xs text-muted-foreground">— {t.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">Perguntas Frequentes</h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-4">
              <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Garantia */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <Card className="border-border bg-muted/50">
          <CardContent className="py-10 px-8 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Garantia de Satisfação</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
              Se por qualquer motivo você não ficar satisfeito com o seu Terço de Contemplação dos Mistérios, entre em contato conosco em até <strong className="text-foreground">7 dias após o recebimento</strong> e faremos a troca ou devolução integral do seu pagamento. Sua confiança é sagrada para nós.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* CTA Final */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <Card className="border-2 border-primary/30 bg-card">
          <CardContent className="py-10 px-8 text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Garanta o Seu Terço Agora</h2>
            <p className="text-sm text-muted-foreground">Escolha a melhor oferta e comece sua jornada de contemplação.</p>
            <div className="max-w-md mx-auto space-y-2">
              {prices.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all ${
                    selected === i ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                  }`}
                >
                  <span className="font-medium text-foreground">{p.label}</span>
                  <span className="font-bold text-primary">R$ {p.price}</span>
                </button>
              ))}
            </div>
            <Button
              className="w-full max-w-md h-14 text-lg font-bold gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => window.open(prices[selected].checkoutUrl, "_blank")}
            >
              <ShoppingCart className="w-5 h-5" />
              Comprar Agora — R$ {prices[selected].price}
            </Button>
          </CardContent>
        </Card>
      </section>

      <footer className="py-6 text-center text-xs text-muted-foreground">
        © 2026 Loja Rosa Mistério. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Index;
