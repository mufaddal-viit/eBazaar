import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  decrementQuantity,
  deleteItem,
  increamentQuantity,
} from "../redux/bazarSlice";
import { formatCurrency } from "../utils/product";

const CartItem = () => {
  const productData = useSelector((state) => state.bazar.productData);
  const dispatch = useDispatch();

  if (!productData.length) {
    return (
      <div className="surface-card rounded-3xl p-8 text-center h-full flex flex-col items-center justify-center">
        <p className="uppercase tracking-[0.18em] text-xs muted-text mb-2">Cart Empty</p>
        <h2 className="section-title mb-3">Start building your look</h2>
        <p className="muted-text mb-5 max-w-sm">
          Your shopping bag is waiting. Add your favorite pieces and come back here.
        </p>
        <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={16} />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {productData.map((product) => (
        <article
          key={product._id}
          className="surface-card rounded-3xl p-3 sm:p-4 flex flex-col sm:flex-row gap-4"
        >
          <figure className="w-full sm:w-32 md:w-36 h-44 sm:h-32 md:h-36 rounded-2xl overflow-hidden bg-[#f3eadf] border border-[#1f1a1520] shrink-0">
            <img
              className="h-full w-full object-cover"
              src={product.image}
              alt={product.title}
            />
          </figure>

          <div className="flex-1 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 className="display-font text-2xl leading-tight">{product.title}</h3>
                <p className="text-sm muted-text mt-1 line-clamp-2">{product.description}</p>
              </div>
              <p className="text-lg font-semibold text-[#1f1a15] whitespace-nowrap">
                {formatCurrency(product.price * product.quantity)}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 mt-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1f1a1528] bg-[#f8f2e7] px-3 py-2">
                <button
                  type="button"
                  className="h-8 w-8 rounded-full border border-[#1f1a152b] bg-white grid place-content-center"
                  onClick={() => dispatch(decrementQuantity({ _id: product._id }))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-7 text-center font-semibold">{product.quantity}</span>
                <button
                  type="button"
                  className="h-8 w-8 rounded-full border border-[#1f1a152b] bg-white grid place-content-center"
                  onClick={() => dispatch(increamentQuantity({ _id: product._id }))}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-[#ce6f5e56] bg-[#fef2ef] px-4 py-2 text-sm font-semibold text-[#a84735] hover:bg-[#fee7e1]"
                onClick={() => {
                  dispatch(deleteItem(product._id));
                  toast.error(`${product.title} removed from cart`);
                }}
              >
                <Trash2 size={15} />
                Remove
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default CartItem;
