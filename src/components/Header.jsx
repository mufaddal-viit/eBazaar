import { Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./newnav";
import { formatCurrency } from "../utils/product";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Collections", to: "/not-available" },
  { label: "Journal", to: "/not-available" },
];

const navLinkClass = ({ isActive }) =>
  `relative text-sm font-semibold tracking-[0.08em] uppercase transition-colors duration-200 ${
    isActive ? "text-[#1f1a15]" : "text-[#5e5348] hover:text-[#1f1a15]"
  }`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.bazar.productData);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const cartSubtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  return (
    <header className="sticky top-0 z-40">
      <div className="glass-panel border-b border-[#ffffffc7]">
        <div className="section-shell h-20 flex items-center justify-between gap-4 px-2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="group flex items-center gap-3"
            aria-label="Go to home"
          >
            <span className="h-11 w-11 rounded-full bg-[#1f1a15] text-[#f6f2ea] grid place-content-center text-lg font-bold">
              e
            </span>
            <span>
              <span className="display-font block text-3xl leading-none">eBazaar</span>
              <span className="muted-text block text-[0.62rem] tracking-[0.22em] uppercase">
                Modern Cloth House
              </span>
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.label} to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden xl:flex items-center rounded-full border border-[#1f1a1522] bg-white/80 px-3 py-2 min-w-64">
            <Search size={16} className="text-[#5e5348]" />
            <input
              type="text"
              placeholder="Search dresses, shirts, jackets"
              className="w-full bg-transparent px-2 text-sm outline-none placeholder:text-[#8d7f71]"
              aria-label="Search products"
            />
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center gap-1 rounded-full border border-[#1f1a1529] bg-white/70 px-3 py-2 text-sm font-semibold text-[#1f1a15] hover:bg-white"
            >
              <UserRound size={16} />
              Account
            </Link>
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="relative inline-flex items-center gap-1 rounded-full border border-[#1f1a1529] bg-white/70 px-3 py-2 text-sm font-semibold text-[#1f1a15] hover:bg-white"
              aria-label="Open cart"
            >
              <ShoppingBag size={16} />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#1f1a15] text-[#f6f2ea] text-xs grid place-content-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className="lg:hidden rounded-full border border-[#1f1a1529] bg-white/70 p-2 text-[#1f1a15]"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        <div className="section-shell hidden lg:flex items-center justify-between px-2 pb-2 text-xs text-[#5e5348]">
          <p className="tracking-[0.15em] uppercase">
            Handpicked silhouettes inspired by contemporary ateliers
          </p>
          <p>
            Cart Subtotal: <span className="font-semibold text-[#1f1a15]">{formatCurrency(cartSubtotal)}</span>
          </p>
        </div>
      </div>

      <Navbar
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        navItems={NAV_ITEMS}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
      />
    </header>
  );
};

export default Header;
