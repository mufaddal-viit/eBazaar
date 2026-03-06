import { useDispatch, useSelector } from "react-redux";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link, useOutletContext } from "react-router-dom";
import {
  decrementQuantity,
  deleteItem,
  increamentQuantity,
} from "../redux/bazarSlice";
import useAppToast from "../hooks/useAppToast";

const CartItem = () => {
  const { dark } = useOutletContext();
  const productData = useSelector((state) => state.bazar.productData);
  const dispatch = useDispatch();
  const { error } = useAppToast();

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <h2 className="border-b border-[#f4f0e8]/15 pb-3 font-display text-3xl text-[#f4f0e8]">
        Your Shopping Cart
      </h2>

      {productData.length > 0 ? (
        productData.map((product) => (
          <article
            className="grid gap-4 border-b border-[#f4f0e8]/12 py-4 sm:grid-cols-[110px_minmax(0,1fr)] md:grid-cols-[130px_minmax(0,1fr)]"
            key={product._id}
          >
            <figure className="overflow-hidden border border-[#f4f0e8]/15">
              <img
                className="h-full w-full object-cover"
                src={product.image}
                alt={product.title}
              />
            </figure>

            <div className="flex flex-col justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl leading-tight text-[#f4f0e8]">
                  {product.title}
                </h3>
                <p className="mt-2 font-mono text-lg text-[#c9a96e]">
                  ${(product.price * product.quantity).toFixed(2)}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 border border-[#f4f0e8]/20 px-3 py-2">
                  <button
                    className="h-7 w-7 border border-[#f4f0e8]/35 text-sm text-[#f4f0e8] transition hover:border-[#c9a96e] hover:text-[#c9a96e]"
                    onClick={() =>
                      dispatch(
                        decrementQuantity({
                          _id: product._id,
                          title: product.title,
                          image: product.image,
                          price: product.price,
                          quantity: 1,
                          description: product.description,
                        })
                      )
                    }
                  >
                    -
                  </button>
                  <span className="w-5 text-center font-mono text-sm text-[#f4f0e8]">
                    {product.quantity}
                  </span>
                  <button
                    className="h-7 w-7 border border-[#f4f0e8]/35 text-sm text-[#f4f0e8] transition hover:border-[#c9a96e] hover:text-[#c9a96e]"
                    onClick={() =>
                      dispatch(
                        increamentQuantity({
                          _id: product._id,
                          title: product.title,
                          image: product.image,
                          price: product.price,
                          quantity: 1,
                          description: product.description,
                        })
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="border border-[#c86060] px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[#c86060] transition hover:bg-[#c86060] hover:text-[#090909]"
                  onClick={() => {
                    dispatch(deleteItem(product._id));
                    error(`${product.title} is removed`);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))
      ) : (
        <div className="grid min-h-[260px] place-content-center text-center">
          <Link
            to="/"
            className="mb-6 inline-flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#f4f0e8]/60 transition hover:text-[#c9a96e]"
          >
            <HiOutlineArrowLeft className="h-4 w-4" />
            Go Shopping
          </Link>
          <p
            className={`font-display text-3xl ${
              dark ? "text-[#f4f0e8]/50" : "text-[#f4f0e8]/45"
            }`}
          >
            Your Cart is Empty
          </p>
        </div>
      )}

    </div>
  );
};

export default CartItem;
