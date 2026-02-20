import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

const Products = ({ products }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const rawCategories = products
      .map((item) => item.category)
      .filter(Boolean)
      .map((value) =>
        value
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );

    return ["All", ...new Set(rawCategories)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") {
      return products;
    }

    return products.filter((item) => {
      const normalized = item.category
        ? item.category
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : "";

      return normalized === activeCategory;
    });
  }, [products, activeCategory]);

  return (
    <section id="shop" className="section-shell mt-12 pb-12">
      <div className="surface-card rounded-[2rem] p-5 sm:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="uppercase tracking-[0.18em] text-xs muted-text mb-3">Product Studio</p>
            <h2 className="section-title mb-3">Curated styles for every wardrobe rhythm</h2>
            <p className="muted-text text-sm sm:text-base">
              From signature basics to statement layers, discover a fresh catalog with
              premium fits and modern cuts.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold tracking-[0.08em] uppercase transition-colors duration-200 ${
                  activeCategory === category
                    ? "bg-[#1f1a15] text-[#f6f2ea]"
                    : "bg-[#f1e8da] text-[#4d4136] hover:bg-[#e7dbc8]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[#1f1a1530] bg-[#f9f4eb] p-8 text-center muted-text">
            No products available in this category right now.
          </div>
        )}
      </div>
    </section>
  );
};

Products.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
};

Products.defaultProps = {
  products: [],
};

export default Products;
