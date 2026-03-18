const photos = [
  "/images/carrossel-1.jpg",
  "/images/carrossel-2.jpg",
  "/images/carrossel-3.jpg",
  "/images/carrossel-4.jpg",
  "/images/carrossel-5.jpg",
];

const CustomerPhotosCarousel = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <h3 className="text-xl md:text-2xl font-bold text-center text-foreground mb-6">
        Fotos Enviadas por Clientes
      </h3>
      <div className="overflow-hidden">
        <div className="flex gap-4 animate-scroll">
          {[...photos, ...photos].map((src, i) => (
            <div
              key={i}
              className="w-40 h-40 shrink-0 rounded-lg overflow-hidden border border-border bg-muted"
            >
              <img
                src={src}
                alt={`Foto de cliente ${(i % photos.length) + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerPhotosCarousel;
