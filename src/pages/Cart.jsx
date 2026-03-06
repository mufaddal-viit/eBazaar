import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { useOutletContext } from "react-router-dom";
import CartItem from "../components/CartItem";
import useAppToast from "../hooks/useAppToast";

const Cart = () => {
  const { dark } = useOutletContext();
  const productData = useSelector((state) => state.bazar.productData);
  const userInfo = useSelector((state) => state.bazar.userInfo);
  const { error } = useAppToast();

  const [totalAmt, setTotalAmt] = useState(null);
  const [payNow, setPayNow] = useState(false);
  const [drawerReady, setDrawerReady] = useState(false);

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
    await axios.post("https://eBazaar-api-backend/pay", {
      amount: totalAmt * 100,
      token: token,
    });
  };

  const handleCheckout = () => {
    if (userInfo) {
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
            className="group relative mt-6 w-full overflow-hidden border border-[#c9a96e] py-3 text-[11px] uppercase tracking-[0.28em] text-[#f4f0e8]"
            onClick={handleCheckout}
          >
            <span className="absolute inset-0 -translate-x-full bg-[#c9a96e] transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative z-10 transition-colors duration-500 group-hover:text-[#0a0a0a]">
              Proceed to Checkout
            </span>
          </button>

          {payNow && (
            <div className="mt-4 w-full overflow-hidden border border-[#f4f0e8]/20 bg-[#0a0a0a] p-3">
              <StripeCheckout
                stripeKey="pk_test_51NPN6ZSAdCrwmZUXYsOcpBg6s7nFA90QIR1frvzXZKrHQo5wL5spmSyC6zVbqOWQEfAaPgeSLoviCfSmaCwUZvJT00Ufprot9c"
                name="Bazar Online Shopping"
                amount={totalAmt * 100}
                label="Pay to bazar"
                description={`Your Payment amount is $${totalAmt}`}
                token={payment}
                email={userInfo.email}
                className="w-full"
              />
            </div>
          )}
        </aside>
      </div>

    </section>
  );
};

export default Cart;
