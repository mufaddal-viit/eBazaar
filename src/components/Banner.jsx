import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Spring Studio",
    title: "Tailored layers for elevated city wear",
    subtitle: "Refined silhouettes with a relaxed, wearable finish.",
    ctaLabel: "Explore Collection",
    ctaTo: "/shop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Modern Essentials",
    title: "Minimal staples crafted for everyday movement",
    subtitle: "Build outfits around textures, clean cuts, and timeless tones.",
    ctaLabel: "Shop Essentials",
    ctaTo: "/shop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "New Drop",
    title: "Runway mood with effortless day comfort",
    subtitle: "Fresh arrivals designed to move from day plans to evening edits.",
    ctaLabel: "View New Arrivals",
    ctaTo: "/shop",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="section-shell pt-4 sm:pt-6">
      <div className="relative overflow-hidden rounded-[2rem] surface-card min-h-[500px] sm:min-h-[560px]">
        {slides.map((slide, index) => (
          <article
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-700 ${
              currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1f1a15cc] via-[#1f1a1578] to-[#1f1a1520]" />
            <div className="relative z-10 h-full flex items-center px-6 sm:px-10 lg:px-16">
              <div className="max-w-2xl text-[#f6f2ea] fade-slide-up">
                <p className="uppercase tracking-[0.22em] text-xs sm:text-sm mb-5 text-[#f3e7ce]">
                  {slide.eyebrow}
                </p>
                <h1 className="editorial-heading mb-5">{slide.title}</h1>
                <p className="text-sm sm:text-lg text-[#f3e7ce] mb-8 max-w-xl">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to={slide.ctaTo} className="btn-primary inline-flex">
                    {slide.ctaLabel}
                  </Link>
                  <Link to="/not-available" className="btn-secondary inline-flex text-[#f6f2ea] !border-[#f6f2ea66] !bg-[#ffffff1c]">
                    Editorial Picks
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}

        <button
          type="button"
          onClick={goPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-[#fffdf8d4] p-2.5 text-[#1f1a15] hover:bg-white"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-[#fffdf8d4] p-2.5 text-[#1f1a15] hover:bg-white"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
          {slides.map((slide, index) => (
            <button
              key={slide.eyebrow}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-10 bg-[#f6f2ea]" : "w-2.5 bg-[#f6f2ea88]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
