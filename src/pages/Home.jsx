import { useMemo } from "react";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import Products from "../components/Products";

const Home = () => {
  const products = useLoaderData() ?? [];

  const highlightStats = useMemo(
    () => [
      {
        label: "Available Styles",
        value: products.length,
      },
      {
        label: "Free Shipping Threshold",
        value: "$120",
      },
      {
        label: "New Collections",
        value: "Weekly",
      },
    ],
    [products.length]
  );

  return (
    <div className="space-y-12">
      <Banner />

      <section className="section-shell">
        <div className="surface-card rounded-[2rem] p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-7 items-center">
          <div className="fade-slide-up">
            <p className="uppercase tracking-[0.18em] text-xs muted-text mb-3">Crafted for Everyday Luxury</p>
            <h2 className="section-title mb-3">A wardrobe built from comfort, detail, and confidence</h2>
            <p className="muted-text text-sm sm:text-base mb-6 max-w-2xl">
              Explore thoughtfully selected pieces designed for modern living. Soft textures,
              elevated tailoring, and premium finishes define every drop.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
                Shop the Edit
                <ArrowRight size={16} />
              </Link>
              <Link to="/not-available" className="btn-secondary inline-flex items-center gap-2">
                Style Journal
                <Sparkles size={15} />
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            {highlightStats.map((item) => (
              <article key={item.label} className="rounded-3xl border border-[#1f1a1520] bg-[#f7f0e5] p-4">
                <p className="text-xs uppercase tracking-[0.14em] muted-text mb-1">{item.label}</p>
                <p className="display-font text-4xl leading-none">{item.value}</p>
              </article>
            ))}
            <article className="rounded-3xl border border-[#486b5b2f] bg-[#e4efe9] p-4 flex items-start gap-3">
              <span className="h-9 w-9 rounded-full bg-[#486b5b] text-white grid place-content-center shrink-0">
                <ShieldCheck size={18} />
              </span>
              <div>
                <p className="font-semibold text-[#1f1a15]">Secure checkout</p>
                <p className="text-sm text-[#47584f]">Protected payment flow with quick and safe order processing.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <Products products={products} />
    </div>
  );
};

export default Home;
