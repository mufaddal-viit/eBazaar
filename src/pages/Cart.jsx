import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { useOutletContext } from "react-router-dom";
import CartItem from "../components/CartItem";
import useAppToast from "../hooks/useAppToast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!API_BASE_URL) {
  throw new Error("Missing required environment variable: VITE_API_BASE_URL");
}

if (!STRIPE_PUBLISHABLE_KEY) {
  throw new Error(
    "Missing required environment variable: VITE_STRIPE_PUBLISHABLE_KEY"
  );
}

const Cart = () => {
  const { dark } = useOutletContext();
  const productData = useSelector((state) => state.bazar.productData);
  const userInfo = useSelector((state) => state.bazar.userInfo);
  const { error, success } = useAppToast();

  const [totalAmt, setTotalAmt] = useState(null);
  const [payNow, setPayNow] = useState(false);
  const [drawerReady, setDrawerReady] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setDrawerReady(true), 120);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let price = 0;
    productData.forEach((product) => {
      price += product.price * product.quantity;
    });
    setTotalAmt(price.toFixed(2));
  }, [productData]);

  const payment = async (token) => {
    const lineItems = productData.map((product) => ({
      productId: product._id,
      quantity: product.quantity,
    }));

    if (lineItems.length === 0) {
      error("Your cart is empty.");
      return;
    }

    setPaymentError("");
    setIsProcessingPayment(true);
    try {
      await axios.post(`${API_BASE_URL.replace(/\/$/, "")}/pay`, {
        token,
        items: lineItems,
      });
      success("Payment request submitted.");
      setPayNow(false);
    } catch (requestError) {
      const fallbackMessage = "Payment failed. Please try again.";
      const message = axios.isAxiosError(requestError)
        ? requestError.response?.data?.message ||
          requestError.message ||
          fallbackMessage
        : fallbackMessage;

      setPaymentError(message);
      error(message);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleCheckout = () => {
    if (productData.length === 0) {
      error("Your cart is empty.");
      return;
    }

    if (userInfo) {
      setPaymentError("");
      setPayNow(true);
    } else {
      error("Please sign in to checkout");
    }
  };

  return (
    <section
      className={`min-h-screen px-4 pb-20 pt-28 sm:px-6 ${
        dark ? "bg-[#0a0a0a]" : "bg-[#151515]"
      }`}
    >
      <div className="mx-auto grid max-w-[1280px] gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="border border-[#f4f0e8]/15 bg-[#101010]/70 p-4 sm:p-6">
          <CartItem />
        </div>

        <aside
          className={`h-fit border border-[#f4f0e8]/20 bg-[#0d0d0d] p-6 transition-all duration-600 xl:sticky xl:top-28 ${
            drawerReady
              ? "translate-x-0 opacity-100"
              : "translate-x-8 opacity-0 xl:translate-x-16"
          }`}
        >
          <h2 className="font-display text-3xl text-[#f4f0e8]">Cart Total</h2>

          <div className="mt-8 space-y-4 text-sm uppercase tracking-[0.16em]">
            <div className="flex items-center justify-between border-b border-[#f4f0e8]/12 pb-3 text-[#f4f0e8]/78">
              <span>Subtotal</span>
              <p className="font-mono text-lg text-[#c9a96e]">${totalAmt}</p>
            </div>

            <div className="space-y-2">
              <label className="block text-[#f4f0e8]/62">Shipping Address</label>
              <input
                type="text"
                placeholder="Write address here"
                className="w-full border border-[#f4f0e8]/20 bg-transparent px-3 py-2 text-sm normal-case tracking-normal text-[#f4f0e8] placeholder:text-[#f4f0e8]/35 outline-none transition focus:border-[#c9a96e]"
              />
            </div>
          </div>

          <div className="my-5 border-t border-[#f4f0e8]/12" />

          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#f4f0e8]/70">
              Total
            </span>
            <p className="font-mono text-3xl text-[#f4f0e8]">${totalAmt}</p>
          </div>

          <button
            className={`group relative mt-6 w-full overflow-hidden border border-[#c9a96e] py-3 text-[11px] uppercase tracking-[0.28em] text-[#f4f0e8] ${
              isProcessingPayment ? "cursor-not-allowed opacity-60" : ""
            }`}
            onClick={handleCheckout}
            disabled={isProcessingPayment || Number(totalAmt) <= 0}
          >
            <span className="absolute inset-0 -translate-x-full bg-[#c9a96e] transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative z-10 transition-colors duration-500 group-hover:text-[#0a0a0a]">
              {isProcessingPayment ? "Processing..." : "Proceed to Checkout"}
            </span>
          </button>

          {payNow && (
            <div
              className={`mt-4 w-full overflow-hidden border border-[#f4f0e8]/20 bg-[#0a0a0a] p-3 ${
                isProcessingPayment ? "pointer-events-none opacity-60" : ""
              }`}
            >
              <StripeCheckout
                stripeKey={STRIPE_PUBLISHABLE_KEY}
                name="Bazar Online Shopping"
                amount={totalAmt * 100}
                label="Pay to bazar"
                description={`Your Payment amount is $${totalAmt}`}
                token={payment}
                email={userInfo?.email}
                disabled={isProcessingPayment}
                className="w-full"
              />
              {paymentError && (
                <p className="mt-3 text-xs tracking-[0.04em] text-[#c86060]">
                  {paymentError}
                </p>
              )}
            </div>
          )}
        </aside>
      </div>

    </section>
  );
};

export default Cart;
