import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

const Products = ({ products }) => {
  const categories = useMemo(
    () => ["All", ...new Set(products.map((item) => item.category))],
    [products]
  );

  const [activeCategory, setActiveCategory] = useState("All");
  const [openSections, setOpenSections] = useState({
    category: true,
    curation: true,
  });
  const [curationState, setCurationState] = useState({
    newDrops: true,
    salePieces: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((item) => item.category === activeCategory);

  return (
    <section id="shop" className="relative px-4 pb-24 pt-16 sm:px-6">
      <div className="pointer-events-none absolute -top-20 left-0 h-40 w-full bg-[radial-gradient(circle_at_center,_rgba(201,169,110,0.14),_transparent_70%)]" />
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-12 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[#c9a96e]">
            Editorial Selection
          </p>
          <h2 className="mt-4 font-display text-4xl text-[#f4f0e8] sm:text-5xl">
            Our Products
          </h2>
          <p className="mt-5 max-w-2xl text-sm tracking-[0.06em] text-[#f4f0e8]/68 sm:text-base">
            Curated essentials in sharp tailoring and refined silhouettes.
            Discover pieces designed to elevate everyday wear.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="h-fit border border-[#f4f0e8]/15 bg-[#101010]/75 p-5 xl:sticky xl:top-24">
            <div className="border-b border-[#f4f0e8]/15 pb-4">
              <button
                onClick={() => toggleSection("category")}
                className="flex w-full items-center justify-between text-left text-[11px] uppercase tracking-[0.32em] text-[#f4f0e8]/80"
              >
                Categories
                <span className="text-lg leading-none">
                  {openSections.category ? "−" : "+"}
                </span>
              </button>
              {openSections.category && (
                <div className="mt-4 space-y-2">
                  {categories.map((category) => {
                    const isActive = activeCategory === category;
                    return (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className="group flex w-full items-center justify-between py-1 text-left"
                      >
                        <span
                          className={`text-[11px] uppercase tracking-[0.24em] transition-colors ${
                            isActive
                              ? "text-[#c9a96e]"
                              : "text-[#f4f0e8]/65 group-hover:text-[#f4f0e8]"
                          }`}
                        >
                          {category}
                        </span>
                        <span
                          className={`h-3.5 w-3.5 border transition ${
                            isActive
                              ? "border-[#c9a96e] bg-[#c9a96e]"
                              : "border-[#f4f0e8]/45 bg-transparent"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                onClick={() => toggleSection("curation")}
                className="flex w-full items-center justify-between text-left text-[11px] uppercase tracking-[0.32em] text-[#f4f0e8]/80"
              >
                Curation
                <span className="text-lg leading-none">
                  {openSections.curation ? "−" : "+"}
                </span>
              </button>
              {openSections.curation && (
                <div className="mt-4 space-y-3">
                  {[
                    { key: "newDrops", label: "New Drops" },
                    { key: "salePieces", label: "Sale Pieces" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() =>
                        setCurationState((prev) => ({
                          ...prev,
                          [item.key]: !prev[item.key],
                        }))
                      }
                      className="group flex w-full items-center justify-between text-left"
                    >
                      <span className="text-[11px] uppercase tracking-[0.24em] text-[#f4f0e8]/65 transition-colors group-hover:text-[#f4f0e8]">
                        {item.label}
                      </span>
                      <span
                        className={`h-4 w-8 border border-[#f4f0e8]/40 p-0.5 transition-colors ${
                          curationState[item.key] ? "bg-[#c9a96e]/20" : ""
                        }`}
                      >
                        <span
                          className={`block h-full w-2.5 bg-[#c9a96e] transition-transform ${
                            curationState[item.key] ? "translate-x-3" : ""
                          }`}
                        />
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </aside>

          <div className="grid auto-rows-[260px] grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredProducts.map((item, index) => {
              const staggeredClass =
                index % 7 === 0
                  ? "sm:col-span-2 sm:row-span-2"
                  : index % 5 === 0
                  ? "row-span-2"
                  : index % 4 === 0
                  ? "sm:col-span-2"
                  : "";

              return (
                <div key={item._id} className={staggeredClass}>
                  <ProductCard product={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
