import PropTypes from "prop-types";
import { Eye, ShoppingBag } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../redux/bazarSlice";
import { formatCurrency, slugifyTitle } from "../utils/product";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const oldPrice = Number(product.oldPrice) || Number(product.price) * 1.2;
  const slug = slugifyTitle(product.title);

  const handleDetails = () => {
    navigate(`/product/${slug}`, {
      state: {
        item: product,
      },
    });
  };

  const handleAddToCart = () => {
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

    toast.success(`${product.title} added to cart`);
  };

  return (
    <article className="group surface-card rounded-3xl overflow-hidden flex flex-col">
      <button
        type="button"
        onClick={handleDetails}
        className="relative h-72 sm:h-80 overflow-hidden text-left"
        aria-label={`View details for ${product.title}`}
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f1a1598] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute left-3 top-3 rounded-full bg-[#fff7ec] px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-[#3f3429]">
          {product.category}
        </span>
      </button>

      <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="display-font text-2xl leading-tight line-clamp-2">{product.title}</h3>
          <p className="muted-text text-sm mt-1 line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-[#1f1a15]">{formatCurrency(product.price)}</span>
          <span className="line-through muted-text">{formatCurrency(oldPrice)}</span>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleDetails}
            className="btn-secondary !rounded-2xl inline-flex items-center justify-center gap-2 !py-2.5"
          >
            <Eye size={16} />
            Details
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            className="btn-primary !rounded-2xl inline-flex items-center justify-center gap-2 !py-2.5"
          >
            <ShoppingBag size={16} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    oldPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    category: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
