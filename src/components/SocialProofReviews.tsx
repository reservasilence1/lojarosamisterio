import { useState } from "react";
import { Star, ThumbsUp, Play, X } from "lucide-react";

interface Review {
  id: number;
  username: string;
  stars: number;
  variation: string;
  text: string;
  media: { type: "image" | "video"; src: string; thumbnail?: string }[];
  helpful: number;
  date: string;
}

const reviewsData: Review[] = [
  {
    id: 1,
    username: "mariacristina_santos",
    stars: 5,
    variation: "Nossa Senhora Aparecida",
    text: "Produto maravilhoso! A qualidade do bronze é impressionante e as placas dos mistérios são perfeitas para meditar. Minha família toda amou, já estou comprando mais para presentear.",
    media: [
      { type: "image", src: "/images/cliente-1.jpg" },
      { type: "image", src: "/images/cliente-2.jpg" },
      { type: "video", src: "/images/provans3.mp4", thumbnail: "/images/cliente-3.jpg" },
    ],
    helpful: 12,
    date: "15/03/2026",
  },
  {
    id: 2,
    username: "joao_pedro_fiel",
    stars: 5,
    variation: "São Bento",
    text: "Superou todas as expectativas! O acabamento é impecável, parece peça de antiquário. As contas de madeira são firmes e o cordão muito resistente. Recomendo demais!",
    media: [
      { type: "video", src: "/images/provans4.mp4", thumbnail: "/images/cliente-4.jpg" },
      { type: "image", src: "/images/cliente-5.jpg" },
    ],
    helpful: 8,
    date: "12/03/2026",
  },
  {
    id: 3,
    username: "ana_paula_rezadeira",
    stars: 5,
    variation: "São Bento",
    text: "Comprei 3 unidades e todas vieram perfeitas. A embalagem é linda, presenteei minha mãe e minha sogra. Elas choraram de emoção!",
    media: [
      { type: "image", src: "/images/cliente-6.jpg" },
    ],
    helpful: 5,
    date: "10/03/2026",
  },
  {
    id: 4,
    username: "pe_roberto_lima",
    stars: 5,
    variation: "São Bento",
    text: "Uso no grupo de oração da paróquia. As placas dos mistérios facilitam muito para quem está aprendendo a rezar o terço. Material de alta qualidade.",
    media: [
      { type: "image", src: "/images/cliente-7.jpg" },
    ],
    helpful: 15,
    date: "08/03/2026",
  },
  {
    id: 5,
    username: "lucia_ferreira92",
    stars: 4,
    variation: "Nossa Senhora Aparecida",
    text: "Muito bonito e bem feito. O bronze realmente dá um ar de relíquia antiga. Entrega foi rápida também. Amei!",
    media: [
      { type: "image", src: "/images/cliente-8.jpg" },
    ],
    helpful: 3,
    date: "05/03/2026",
  },
];

const StarRating = ({
  rating,
  interactive = false,
  onRate,
}: {
  rating: number;
  interactive?: boolean;
  onRate?: (n: number) => void;
}) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        className={`w-4 h-4 ${
          n <= rating ? "fill-primary text-primary" : "text-border"
        } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
        onClick={() => interactive && onRate?.(n)}
      />
    ))}
  </div>
);

const SocialProofReviews = () => {
  const [userRatings, setUserRatings] = useState<Record<number, number>>({});
  const [helpfulCounts, setHelpfulCounts] = useState<Record<number, number>>({});
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const handleRate = (reviewId: number, stars: number) => {
    setUserRatings((prev) => ({ ...prev, [reviewId]: stars }));
  };

  const handleHelpful = (reviewId: number, base: number) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [reviewId]: prev[reviewId] !== undefined ? prev[reviewId] : base + 1,
    }));
  };

  const avgRating = 4.9;
  const totalReviews = 10793;

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70" onClick={() => setActiveVideo(null)}>
          <div className="relative w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActiveVideo(null)} className="absolute -top-10 right-0 text-primary-foreground hover:text-primary transition-colors">
              <X className="w-6 h-6" />
            </button>
            <video src={activeVideo} controls autoPlay className="w-full rounded-lg" />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-foreground">{avgRating}</span>
          <Star className="w-5 h-5 fill-primary text-primary" />
          <span className="text-lg font-semibold text-foreground">
            Avaliações do produto{" "}
            <span className="text-muted-foreground font-normal">
              ({totalReviews.toLocaleString("pt-BR")})
            </span>
          </span>
        </div>
      </div>

      {/* Highlight badge */}
      <div className="bg-primary/10 rounded-md px-4 py-2 mb-6 flex items-center gap-2">
        <span className="text-sm">😍</span>
        <span className="text-sm text-primary font-medium">
          Frequentemente avaliado como material excelente
        </span>
      </div>

      {/* Reviews */}
      <div className="space-y-6">
        {reviewsData.map((review) => (
          <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
            {/* User info */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold uppercase">
                  {review.username[0]}
                </div>
                <span className="font-semibold text-sm text-foreground">{review.username}</span>
              </div>
              <button
                onClick={() => handleHelpful(review.id, review.helpful)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Útil ({helpfulCounts[review.id] !== undefined ? helpfulCounts[review.id] : review.helpful}) <ThumbsUp className="w-3 h-3" />
              </button>
            </div>

            <StarRating rating={review.stars} />

            <p className="text-xs text-muted-foreground mt-2">
              Variação: <span className="font-medium text-foreground">{review.variation}</span>
              <span className="ml-3">{review.date}</span>
            </p>
            <p className="text-sm text-foreground mt-2 leading-relaxed">{review.text}</p>

            {/* Media */}
            {review.media.length > 0 && (
              <div className="flex gap-2 mt-3">
                {review.media.map((m, i) => (
                  <div
                    key={i}
                    className="relative w-24 h-24 rounded-md overflow-hidden border border-border bg-muted cursor-pointer"
                    onClick={() => m.type === "video" && m.src && setActiveVideo(m.src)}
                  >
                    {m.type === "video" ? (
                      <video
                        src={m.src}
                        muted
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={m.src}
                        alt="Foto do cliente"
                        className="w-full h-full object-cover"
                      />
                    )}
                    {m.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-foreground/30">
                        <Play className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
                        <span className="absolute bottom-1 left-1 text-[10px] text-primary-foreground font-medium">0:15</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* User interactive rating */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Sua avaliação:</span>
              <StarRating rating={userRatings[review.id] || 0} interactive onRate={(n) => handleRate(review.id, n)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SocialProofReviews;
