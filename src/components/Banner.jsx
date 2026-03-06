import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    image:
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Denim Reverie",
    subtitle: "Sky Blue Soft Denim",
    cta: "View Edit",
    title1: "Jean's stylish Jacket",
  },
  {
    image:
      "https://images.unsplash.com/photo-1647243498368-8c19cf82031a?w=1600&auto=format&fit=crop&q=80",
    title: "Summer Atelier",
    subtitle: "Discover the season's clean silhouettes.",
    cta: "Shop Now",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1673310535178-7c6069f28917?w=1600&auto=format&fit=crop&q=80",
    title: "New Arrivals",
    subtitle: "Fresh looks for a sharper wardrobe.",
    cta: "Explore",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1673356301861-d555ce5972ef?w=1600&auto=format&fit=crop&q=80",
    title: "Limited Edition",
    subtitle: "Exclusive drops, intentionally scarce.",
    cta: "Get It Now",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timeout);
  }, []);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="flex h-[88vh] min-h-[620px] transition-transform duration-700 ease-out md:h-[96vh]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => {
          const headline = slide.title.split(" ");
          const firstLine = headline.slice(0, Math.ceil(headline.length / 2)).join(" ");
          const secondLine = headline.slice(Math.ceil(headline.length / 2)).join(" ");

          return (
            <article key={index} className="relative min-w-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0.72)_100%)]" />
              <div className="absolute left-0 right-0 top-0 mx-auto flex h-full max-w-[1320px] items-end px-5 pb-22 sm:px-8 md:pb-24">
                <div className="max-w-2xl">
                  <p
                    className={`mb-4 text-[11px] uppercase tracking-[0.35em] text-[#c9a96e] transition-all duration-700 ${
                      isLoaded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-6 opacity-0"
                    }`}
                  >
                    New Season Curation
                  </p>
                  <h1
                    className={`font-display text-5xl leading-[0.95] text-[#f4f0e8] transition-all duration-700 md:text-7xl xl:text-8xl ${
                      isLoaded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-7 opacity-0"
                    }`}
                  >
                    <span className="block">{firstLine}</span>
                    <span className="block text-[#f4f0e8]/85">{secondLine}</span>
                  </h1>
                  <p
                    className={`mt-6 max-w-lg text-sm tracking-[0.08em] text-[#f4f0e8]/75 transition-all delay-150 duration-700 md:text-base ${
                      isLoaded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-6 opacity-0"
                    }`}
                  >
                    {slide.subtitle}
                  </p>
                  <Link
                    to={
                      slide.title1
                        ? `/product/${String(slide.title1)
                            .toLowerCase()
                            .split(" ")
                            .join("")}`
                        : "/#shop"
                    }
                    className={`group relative mt-9 inline-flex items-center overflow-hidden border border-[#f4f0e8]/55 px-7 py-3 text-xs uppercase tracking-[0.3em] text-[#f4f0e8] transition-all duration-500 hover:border-[#c9a96e] ${
                      isLoaded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-6 opacity-0"
                    }`}
                  >
                    <span className="absolute inset-0 -translate-x-full bg-[#c9a96e] transition-transform duration-500 group-hover:translate-x-0" />
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-[#0a0a0a]">
                      {slide.cta}
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 border border-[#f4f0e8]/45 bg-[#0a0a0a]/45 p-2.5 text-[#f4f0e8] transition hover:border-[#c9a96e] hover:text-[#c9a96e] md:left-8"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 border border-[#f4f0e8]/45 bg-[#0a0a0a]/45 p-2.5 text-[#f4f0e8] transition hover:border-[#c9a96e] hover:text-[#c9a96e] md:right-8"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-0.5 w-10 transition-all duration-300 ${
              currentSlide === index ? "bg-[#c9a96e]" : "bg-[#f4f0e8]/40"
            }`}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute -bottom-16 left-[-5%] h-28 w-[112%] -rotate-3 bg-[#0a0a0a]" />
    </section>
  );
};

export default Banner;
