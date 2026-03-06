import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { MdOutlineStar } from "react-icons/md";
import { Link, useLoaderData, useLocation, useParams } from "react-router-dom";
import { addToCart } from "../redux/bazarSlice";
import useAppToast from "../hooks/useAppToast";

const isValidProduct = (item) => {
  if (!item) return false;
  const parsedPrice = Number(item.price);
  return Boolean(
    item._id &&
      item.title &&
      item.image &&
      Number.isFinite(parsedPrice) &&
      parsedPrice > 0
  );
};

const Product = () => {
  const dispatch = useDispatch();
  const { success, error } = useAppToast();
  const [details, setDetails] = useState({});
  const [status, setStatus] = useState("loading");
  const [loadError, setLoadError] = useState("");
  const [baseQty, setBaseQty] = useState(1);
  const location = useLocation();
  const uniqueId = useParams();
  const response = useLoaderData();

  const canAddToCart = useMemo(() => isValidProduct(details), [details]);
  const isNotFound = status === "not-found" || (status === "ready" && !canAddToCart);

  useEffect(() => {
    if (location?.state?.item) {
      setDetails(location.state.item);
      setStatus("ready");
      return;
    }

    if (response?.error) {
      setLoadError(response.error);
      setStatus("error");
      return;
    }

    if (!response?.data) {
      setStatus("loading");
      return;
    }

    const matchedItem = response.data.find((item) => {
      const normalizedTitle = String(item.title)
        .toLowerCase()
        .replace(/\s+/g, "")
        .trim();
      return normalizedTitle === uniqueId.id;
    });

    if (matchedItem) {
      setDetails(matchedItem);
      setStatus("ready");
    } else {
      setStatus("not-found");
    }
  }, [location, response, uniqueId.id]);

  const handleAddToCart = () => {
    if (!canAddToCart) {
      error("Product details are unavailable. Please refresh and try again.");
      return;
    }

    dispatch(
      addToCart({
        _id: details._id,
        title: details.title,
        image: details.image,
        price: Number(details.price),
        quantity: baseQty,
        description: details.description || "",
      })
    );
    success(`${details.title} is added`);
  };

  if (status === "loading") {
    return (
      <section className="relative min-h-screen px-4 pb-20 pt-28 sm:px-6">
        <div className="mx-auto max-w-[1280px] border border-[#f4f0e8]/15 bg-[#101010]/70 p-10 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#f4f0e8]/55">
            Loading Product
          </p>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="relative min-h-screen px-4 pb-20 pt-28 sm:px-6">
        <div className="mx-auto max-w-[1280px] border border-[#c86060]/45 bg-[#240f0f]/60 p-10 text-center">
          <h1 className="font-display text-4xl text-[#f4f0e8]">
            Failed To Load Product
          </h1>
          <p className="mt-3 text-sm tracking-[0.04em] text-[#f4f0e8]/75">
            {loadError || "Please refresh and try again."}
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex border border-[#c9a96e] px-5 py-3 text-[11px] uppercase tracking-[0.25em] text-[#f4f0e8] transition hover:bg-[#c9a96e] hover:text-[#0a0a0a]"
          >
            Back To Shop
          </Link>
        </div>
      </section>
    );
  }

  if (isNotFound) {
    return (
      <section className="relative min-h-screen px-4 pb-20 pt-28 sm:px-6">
        <div className="mx-auto max-w-[1280px] border border-[#f4f0e8]/15 bg-[#101010]/70 p-10 text-center">
          <h1 className="font-display text-4xl text-[#f4f0e8]">Product Not Found</h1>
          <p className="mt-3 text-sm tracking-[0.04em] text-[#f4f0e8]/65">
            This product is unavailable or the link is invalid.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex border border-[#c9a96e] px-5 py-3 text-[11px] uppercase tracking-[0.25em] text-[#f4f0e8] transition hover:bg-[#c9a96e] hover:text-[#0a0a0a]"
          >
            Back To Shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen px-4 pb-20 pt-28 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(201,169,110,0.16),_transparent_75%)]" />

      <div className="mx-auto grid max-w-[1280px] gap-10 border border-[#f4f0e8]/15 bg-[#101010]/70 p-5 md:grid-cols-[1.02fr_1fr] md:p-8">
        <div className="relative overflow-hidden border border-[#f4f0e8]/20">
          <img
            className="h-[420px] w-full object-cover md:h-[620px]"
            src={details.image}
            alt={details.title}
          />
          {(details.isNew ||
            Number(details.oldPrice) > Number(details.price)) && (
            <span className="absolute right-0 top-5 border border-[#c9a96e]/70 bg-[#090909]/88 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[#c9a96e]">
              {details.isNew ? "NEW" : "SALE"}
            </span>
          )}
        </div>

        <div className="flex flex-col justify-center gap-7">
          <div>
            <p className="text-[11px] uppercase tracking-[0.34em] text-[#c9a96e]">
              Product Detail
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-[#f4f0e8] md:text-5xl">
              {details.title}
            </h1>

            <div className="mt-4 flex items-center gap-3 tabular-nums">
              <p className="font-mono text-[#f4f0e8]/45 line-through">
                ${details.oldPrice}
              </p>
              <p className="font-mono text-2xl text-[#c9a96e]">
                ${details.price}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex text-[#c9a96e]">
              {[...Array(5)].map((_, index) => (
                <MdOutlineStar key={index} />
              ))}
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#f4f0e8]/55">
              1 Customer Review
            </p>
          </div>

          <p className="max-w-xl text-sm leading-relaxed tracking-[0.03em] text-[#f4f0e8]/75">
            {details.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-4 border border-[#f4f0e8]/25 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#f4f0e8]/60">
                Quantity
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setBaseQty(Math.max(1, baseQty - 1))}
                  className="h-8 w-8 border border-[#f4f0e8]/35 text-sm transition hover:border-[#c9a96e] hover:text-[#c9a96e]"
                >
                  -
                </button>
                <span className="w-6 text-center font-mono text-base text-[#f4f0e8]">
                  {baseQty}
                </span>
                <button
                  onClick={() => setBaseQty(baseQty + 1)}
                  className="h-8 w-8 border border-[#f4f0e8]/35 text-sm transition hover:border-[#c9a96e] hover:text-[#c9a96e]"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              className={`group relative overflow-hidden border border-[#c9a96e] px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-[#f4f0e8] ${
                !canAddToCart ? "cursor-not-allowed opacity-60" : ""
              }`}
            >
              <span className="absolute inset-0 -translate-x-full bg-[#c9a96e] transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-[#0a0a0a]">
                Add To Cart
              </span>
            </button>
          </div>

          <p className="text-[11px] uppercase tracking-[0.25em] text-[#f4f0e8]/55">
            Category:{" "}
            <span className="text-[#f4f0e8]/85">{details.category}</span>
          </p>
        </div>
      </div>

    </section>
  );
};

export default Product;
