import { useState, useEffect } from "react";
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
      "/images/terco-sao-bento.webp",
      "/images/sao-bento-2.webp",
      "/images/sao-bento-3.webp",
      "/images/sao-bento-4.webp",
      "/images/sao-bento-5.webp",
    ],
  },
  {
    id: "aparecida",
    label: "Nossa Senhora Aparecida",
    images: [
      "/images/terco-aparecida.webp",
      "/images/aparecida-2.webp",
      "/images/aparecida-3.webp",
      "/images/aparecida-4.webp",
      "/images/aparecida-5.webp",
    ],
  },
  {
    id: "casal",
    label: "Terço do Casal",
    images: [
      "/images/terco-casal.webp",
      "/images/casal-2.webp",
      "/images/casal-3.webp",
      "/images/casal-4.webp",
      "/images/casal-5.webp",
    ],
  },
];

const pricesByModel: Record<string, { qty: number; label: string; price: number; oldPrice: number; perUnit: number | null; badge: string | null; checkoutUrl: string }[]> = {
  "sao-bento": [
    { qty: 1, label: "1 Unidade", price: 19, oldPrice: 29, perUnit: null, badge: null, checkoutUrl: "https://pay.rosamisterio.site/checkout/ad448ed6-2adb-407d-aa33-b2612ba6a265" },
    { qty: 2, label: "2 Unidades", price: 29, oldPrice: 69, perUnit: 15, badge: "Mais vendido", checkoutUrl: "https://pay.rosamisterio.site/checkout/fc4d0f20-847c-429b-9812-26cbf8368390" },
    { qty: 3, label: "3 Unidades", price: 39, oldPrice: 89, perUnit: 13, badge: null, checkoutUrl: "https://pay.rosamisterio.site/checkout/ff7b0935-972c-4678-bc80-b849bcdd094e" },
  ],
  "aparecida": [
    { qty: 1, label: "1 Unidade", price: 19, oldPrice: 29, perUnit: null, badge: null, checkoutUrl: "https://pay.rosamisterio.site/checkout/f299c504-6092-4196-91cd-381421e16619" },
    { qty: 2, label: "2 Unidades", price: 29, oldPrice: 69, perUnit: 15, badge: "Mais vendido", checkoutUrl: "https://pay.rosamisterio.site/checkout/95e182d7-4338-430b-b2f5-482d39d51adc" },
    { qty: 3, label: "3 Unidades", price: 39, oldPrice: 89, perUnit: 13, badge: null, checkoutUrl: "https://pay.rosamisterio.site/checkout/d09219cb-533c-4ba4-921f-45cf5592d75f" },
  ],
  "casal": [
    { qty: 1, label: "1 Unidade", price: 19, oldPrice: 29, perUnit: null, badge: null, checkoutUrl: "https://pay.rosamisterio.site/checkout/51570b1a-f693-4774-8b4b-4a161f71bd1b" },
    { qty: 2, label: "2 Unidades", price: 29, oldPrice: 69, perUnit: 15, badge: "Mais vendido", checkoutUrl: "https://pay.rosamisterio.site/checkout/65bcbc85-0ea6-4bb4-a045-b3c76b62982d" },
    { qty: 3, label: "3 Unidades", price: 39, oldPrice: 89, perUnit: 13, badge: null, checkoutUrl: "https://pay.rosamisterio.site/checkout/c7f71b3a-d027-48ca-ba28-5320549d3ceb" },
  ],
};

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

  useEffect(() => {
    // Pixel UTMify
    const trackingWindow = window as Window & { pixelId?: string };
    trackingWindow.pixelId = "69996f756285f3591bdfb2a8";

    const pixelScript = document.createElement("script");
    pixelScript.async = true;
    pixelScript.defer = true;
    pixelScript.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
    document.head.appendChild(pixelScript);

    // Captura UTM
    const utmScript = document.createElement("script");
    utmScript.async = true;
    utmScript.defer = true;
    utmScript.src = "https://cdn.utmify.com.br/scripts/utms/latest.js";
    utmScript.setAttribute("data-utmify-prevent-subids", "true");
    document.head.appendChild(utmScript);

    return () => {
      document.head.removeChild(pixelScript);
      document.head.removeChild(utmScript);
    };
  }, []);

  const currentModel = models[selectedModel];
  const prices = pricesByModel[currentModel.id];

  const handleModelChange = (i: number) => {
    setSelectedModel(i);
    setSelectedPhoto(0);
    setSelected(0);
  };


  return (
    <div className="min-h-screen bg-background">
      {/* Header - Sticky */}
      <header className="w-full py-3 bg-card text-foreground sticky top-0 z-50 shadow-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-center">
          <span className="text-lg md:text-xl font-bold text-primary flex items-center gap-2">
            <img src="/images/pascoa-nobg.png" alt="Páscoa" className="w-7 h-7 object-contain" />
            Promoção de Páscoa <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">70% OFF</span>
          </span>
        </div>
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
          <div className="space-y-4 overflow-hidden">
            <span className="inline-block bg-primary/15 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              ✦ Edição {currentModel.label}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Terço Católico de Contemplação dos Mistérios
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>Entrega via</span>
              <img src="/images/correios-logo.svg" alt="Correios" className="h-3.5 w-auto" />
            </div>
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
              <div className="flex flex-wrap gap-2">
                {models.map((model, i) => (
                  <button
                    key={model.id}
                    onClick={() => handleModelChange(i)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 transition-all text-xs sm:text-sm ${
                      selectedModel === i
                        ? "border-primary bg-primary/5 text-foreground font-bold"
                        : "border-border hover:border-primary/40 text-muted-foreground"
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-border shrink-0">
                      <img src={model.images[0]} alt={model.label} className="w-full h-full object-cover" />
                    </div>
                    <span className="whitespace-nowrap">{model.label}</span>
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
                  className={`w-full flex items-center justify-between px-3 sm:px-4 py-3 rounded-lg border-2 transition-all ${
                    selected === i ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 shrink">
                    <span className="font-medium text-foreground text-sm sm:text-base whitespace-nowrap">{p.label}</span>
                    {p.badge && <span className="bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap">{p.badge}</span>}
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <span className="text-xs sm:text-sm text-muted-foreground line-through">R$ {p.oldPrice}</span>
                    <span className="font-bold text-primary text-base sm:text-lg">R$ {p.price}</span>
                  </div>
                </button>
              ))}
            </div>

              <Button
                className="w-full max-w-md h-14 text-lg font-bold gap-2 rounded-lg bg-[#348d35] hover:bg-[#2d7a2e] text-white"
                onClick={() => {
                  const baseUrl = prices[selected].checkoutUrl;
                  const params = window.location.search;
              
                  const finalUrl = params
                    ? baseUrl + params
                    : baseUrl;
              
                  window.open(finalUrl, "_blank");
                }}
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
            
            {/* Model Selector */}
            <div className="max-w-md mx-auto space-y-2">
              <p className="text-sm font-bold text-foreground text-left">Modelo:</p>
              <div className="grid grid-cols-2 gap-2">
                {models.slice(0, 2).map((model, i) => (
                  <button
                    key={model.id}
                    onClick={() => handleModelChange(i)}
                    className={`flex items-center gap-1 px-2 py-2 rounded-lg border-2 transition-all text-xs ${
                      selectedModel === i
                        ? "border-primary bg-primary/5 text-foreground font-bold"
                        : "border-border hover:border-primary/40 text-muted-foreground"
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-border shrink-0">
                      <img src={model.images[0]} alt={model.label} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs whitespace-nowrap">{model.label}</span>
                  </button>
                ))}
                <button
                  onClick={() => handleModelChange(2)}
                  className={`col-span-2 mx-auto flex items-center gap-1 px-3 py-2 rounded-lg border-2 transition-all text-xs ${
                    selectedModel === 2
                      ? "border-primary bg-primary/5 text-foreground font-bold"
                      : "border-border hover:border-primary/40 text-muted-foreground"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-border shrink-0">
                    <img src={models[2].images[0]} alt={models[2].label} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs whitespace-nowrap">{models[2].label}</span>
                </button>
              </div>
            </div>

            <div className="max-w-md mx-auto space-y-2">
              {prices.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-full flex items-center justify-between px-3 sm:px-4 py-3 rounded-lg border-2 transition-all ${
                    selected === i ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 shrink">
                    <span className="font-medium text-foreground text-sm sm:text-base whitespace-nowrap">{p.label}</span>
                    {p.badge && <span className="bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap">{p.badge}</span>}
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <span className="text-xs sm:text-sm text-muted-foreground line-through">R$ {p.oldPrice}</span>
                    <span className="font-bold text-primary text-sm sm:text-base">R$ {p.price}</span>
                  </div>
                </button>
              ))}
            </div>
            <Button
                className="w-full max-w-md h-14 text-lg font-bold gap-2 rounded-lg bg-[#348d35] hover:bg-[#2d7a2e] text-white"
                onClick={() => {
                  const baseUrl = prices[selected].checkoutUrl;
                  const params = window.location.search;
              
                  const finalUrl = params
                    ? baseUrl + params
                    : baseUrl;
              
                  window.open(finalUrl, "_blank");
                }}
              >
              
              <ShoppingCart className="w-5 h-5" />
              Comprar Agora — R$ {prices[selected].price}
            </Button>
          </CardContent>
        </Card>
      </section>

      <footer className="py-6 text-center text-xs text-muted-foreground">
        ©️ 2026 Loja Rosa Mistério. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Index;
