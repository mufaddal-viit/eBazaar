import { useEffect, useMemo, useState } from "react";
import { Heart, Minus, Plus, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useLoaderData, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../redux/bazarSlice";
import { findProductBySlug, formatCurrency } from "../utils/product";

const Product = () => {
  const dispatch = useDispatch();
  const products = useLoaderData() ?? [];
  const location = useLocation();
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (location?.state?.item) {
      setDetails(location.state.item);
      return;
    }

    setDetails(findProductBySlug(products, id));
  }, [id, location?.state, products]);

  const oldPrice = useMemo(() => {
    if (!details) {
      return 0;
    }

    return Number(details.oldPrice) || Number(details.price) * 1.2;
  }, [details]);

  if (!details) {
    return (
      <section className="section-shell min-h-[55vh] flex items-center justify-center">
        <div className="surface-card rounded-3xl p-8 text-center max-w-xl">
          <p className="uppercase tracking-[0.18em] text-xs muted-text mb-3">Product Unavailable</p>
          <h1 className="section-title mb-3">We could not find this product</h1>
          <p className="muted-text mb-6">
            The item may have been removed or the link is outdated.
          </p>
          <Link to="/shop" className="btn-primary inline-flex">
            Back to Shop
          </Link>
        </div>
      </section>
    );
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: details._id,
        title: details.title,
        image: details.image,
        price: details.price,
        quantity,
        description: details.description,
      })
    );

    toast.success(`${details.title} added to cart`);
  };

  return (
    <section className="section-shell py-8">
      <div className="surface-card rounded-[2rem] p-4 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-[1.05fr,1fr] gap-8 lg:gap-10">
        <div className="rounded-[1.6rem] overflow-hidden bg-[#efe7da] border border-[#1f1a1520] min-h-[420px]">
          <img
            src={details.image}
            alt={details.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <p className="uppercase tracking-[0.18em] text-xs muted-text mb-3">{details.category}</p>
          <h1 className="editorial-heading text-[clamp(2rem,3.5vw,3.4rem)] mb-4 leading-[0.95]">
            {details.title}
          </h1>
          <p className="muted-text text-sm sm:text-base leading-relaxed mb-6">{details.description}</p>

          <div className="flex flex-wrap items-end gap-3 mb-6">
            <span className="display-font text-4xl leading-none">
              {formatCurrency(details.price)}
            </span>
            <span className="text-sm line-through muted-text">{formatCurrency(oldPrice)}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#1f1a1526] bg-[#f9f2e7] px-3 py-2">
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="h-8 w-8 rounded-full border border-[#1f1a152f] bg-white grid place-content-center"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((prev) => prev + 1)}
                className="h-8 w-8 rounded-full border border-[#1f1a152f] bg-white grid place-content-center"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="btn-primary inline-flex items-center gap-2"
            >
              Add to cart
            </button>
            <button
              type="button"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Heart size={16} />
              Save
            </button>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mt-auto">
            <article className="rounded-2xl border border-[#1f1a1520] bg-[#faf5ec] p-3">
              <p className="text-sm font-semibold flex items-center gap-2">
                <Truck size={15} />
                Delivery
              </p>
              <p className="text-xs muted-text mt-1">Ships in 2-4 business days.</p>
            </article>
            <article className="rounded-2xl border border-[#1f1a1520] bg-[#faf5ec] p-3">
              <p className="text-sm font-semibold flex items-center gap-2">
                <RotateCcw size={15} />
                Returns
              </p>
              <p className="text-xs muted-text mt-1">Easy 7-day return window.</p>
            </article>
            <article className="rounded-2xl border border-[#1f1a1520] bg-[#faf5ec] p-3">
              <p className="text-sm font-semibold flex items-center gap-2">
                <ShieldCheck size={15} />
                Guarantee
              </p>
              <p className="text-xs muted-text mt-1">Quality checked before dispatch.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
