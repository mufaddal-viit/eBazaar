import { useMemo, useState } from "react";
import axios from "axios";
import { ArrowRight, LockKeyhole, ShoppingBag, UserRound } from "lucide-react";
import StripeCheckout from "react-stripe-checkout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CartItem from "../components/CartItem";
import { formatCurrency } from "../utils/product";

const Cart = () => {
  const productData = useSelector((state) => state.bazar.productData);
  const userInfo = useSelector((state) => state.bazar.userInfo);
  const [payNow, setPayNow] = useState(false);

  const subtotal = useMemo(
    () =>
      productData.reduce(
        (sum, product) => sum + Number(product.price) * Number(product.quantity),
        0
      ),
    [productData]
  );

  const shipping = subtotal > 120 ? 0 : productData.length ? 12 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const paymentApiUrl =
    import.meta.env.VITE_PAYMENT_API_URL || "https://eBazaar-api-backend/pay";
  const stripeKey =
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51NPN6ZSAdCrwmZUXYsOcpBg6s7nFA90QIR1frvzXZKrHQo5wL5spmSyC6zVbqOWQEfAaPgeSLoviCfSmaCwUZvJT00Ufprot9c";

  const payment = async (token) => {
    try {
      await axios.post(paymentApiUrl, {
        amount: Math.round(total * 100),
        token,
      });
      toast.success("Payment request submitted successfully");
      setPayNow(false);
    } catch {
      toast.error("Payment failed. Please try again.");
    }
  };

  const handleCheckout = () => {
    if (!productData.length) {
      toast.error("Your cart is empty");
      return;
    }

    if (!userInfo) {
      toast.error("Please sign in before checkout");
      return;
    }

    setPayNow(true);
  };

  return (
    <section className="section-shell py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,0.9fr] gap-6 items-start">
        <div>
          <div className="mb-4">
            <p className="uppercase tracking-[0.18em] text-xs muted-text mb-2">Shopping Bag</p>
            <h1 className="section-title">Review your selected pieces</h1>
          </div>
          <CartItem />
        </div>

        <aside className="surface-card rounded-[2rem] p-5 sm:p-6 lg:sticky lg:top-24">
          <p className="uppercase tracking-[0.18em] text-xs muted-text mb-3">Order Summary</p>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="muted-text">Subtotal</span>
              <span className="font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="muted-text">Shipping</span>
              <span className="font-semibold">{shipping ? formatCurrency(shipping) : "Free"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="muted-text">Estimated tax</span>
              <span className="font-semibold">{formatCurrency(tax)}</span>
            </div>
          </div>

          <div className="border-t border-[#1f1a151f] my-5" />

          <div className="flex items-center justify-between mb-5">
            <span className="text-base font-semibold">Total</span>
            <span className="display-font text-3xl leading-none">{formatCurrency(total)}</span>
          </div>

          <div className="rounded-2xl border border-[#1f1a1525] bg-[#f9f1e4] p-3 mb-4 text-sm">
            {userInfo ? (
              <p className="flex items-center gap-2 text-[#2f3f36]">
                <UserRound size={16} />
                Signed in as {userInfo.email}
              </p>
            ) : (
              <p className="flex items-center gap-2 text-[#5c4f42]">
                <UserRound size={16} />
                Guest mode. <Link to="/login" className="underline">Sign in</Link> for checkout.
              </p>
            )}
          </div>

          <button
            type="button"
            className="btn-primary !w-full inline-flex items-center justify-center gap-2"
            onClick={handleCheckout}
          >
            <LockKeyhole size={16} />
            Proceed to secure checkout
          </button>

          {payNow && (
            <div className="mt-3 rounded-2xl border border-[#1f1a1522] bg-[#fff9f0] p-3">
              <StripeCheckout
                stripeKey={stripeKey}
                name="eBazaar"
                amount={Math.round(total * 100)}
                label="Pay with Stripe"
                description={`Order total: ${formatCurrency(total)}`}
                token={payment}
                email={userInfo?.email}
              />
            </div>
          )}

          <div className="mt-4 rounded-2xl border border-[#486b5b38] bg-[#e8f0ec] p-3 text-sm text-[#3f5b4f]">
            <p className="font-semibold flex items-center gap-2 mb-1">
              <ShoppingBag size={15} />
              Free shipping unlock
            </p>
            <p>
              Add {formatCurrency(Math.max(0, 120 - subtotal))} more to qualify for free shipping.
            </p>
          </div>

          <Link to="/shop" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1f1a15] hover:underline">
            Continue shopping
            <ArrowRight size={14} />
          </Link>
        </aside>
      </div>
    </section>
  );
};

export default Cart;
