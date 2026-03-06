import { BsArrowBarRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/bazarSlice";
import useAppToast from "../hooks/useAppToast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success } = useAppToast();

  const rootId = String(product.title).toLowerCase().split(" ").join("");
  const hasDiscount = Number(product.oldPrice) > Number(product.price);
  const tag = product.isNew ? "NEW" : hasDiscount ? "SALE" : null;

  const handleDetails = () => {
    navigate(`/product/${rootId}`, {
      state: { item: product },
    });
  };

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(
      addToCart({
        _id: product._id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: 1,
        description: product.description,
      })
    );
    success(`${product.title} added to cart`, {
      autoClose: 1800,
    });
  };

  return (
    <article className="group relative h-full min-h-[260px] overflow-hidden border border-[#f4f0e8]/15 bg-[#101010]">
      <figure
        onClick={handleDetails}
        className="h-full cursor-pointer overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </figure>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/35 to-transparent" />

      {tag && (
        <span className="absolute left-3 top-3 border border-[#c9a96e]/70 bg-[#090909]/80 px-2 py-1 text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">
          {tag}
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 z-10 p-4">
        <p className="text-[10px] uppercase tracking-[0.26em] text-[#f4f0e8]/65">
          {product.category}
        </p>
        <h3
          onClick={handleDetails}
          className="mt-2 cursor-pointer font-display text-lg leading-tight text-[#f4f0e8]"
        >
          {product.title}
        </h3>

        <div className="mt-2 flex justify-end text-sm font-medium tabular-nums cursor-pointer ">
          <div className="relative w-[124px] cursor-pointer overflow-hidden">
            <div className="flex justify-end gap-2 transform transition-transform duration-500 group-hover:translate-x-24">
              {hasDiscount && (
                <p className="font-mono text-[#f4f0e8]/45 line-through">
                  ${product.oldPrice}
                </p>
              )}
              <p className="font-mono text-[#c9a96e]">${product.price}</p>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className="cursor-pointer absolute z-20 top-0 flex w-[120px] -translate-x-32 transform items-center text-[11px] uppercase tracking-[0.18em] text-[#f4f0e8]/85 transition-transform duration-500 group-hover:translate-x-0 hover:text-[#c9a96e]"
            >
              Add to cart
              <span className="ml-1">
                <BsArrowBarRight className="h-3.5 w-3.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
