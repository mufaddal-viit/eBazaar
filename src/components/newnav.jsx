import PropTypes from "prop-types";
import { ShoppingBag, UserRound, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/product";

const navLinkClass = ({ isActive }) =>
  `w-full rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${
    isActive
      ? "bg-[#1f1a15] text-[#f6f2ea]"
      : "bg-[#f4ede0] text-[#3f342a] hover:bg-[#eadfce]"
  }`;

const Navbar = ({ isOpen, onClose, navItems, cartCount, cartSubtotal }) => {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1f1a1552] backdrop-blur-[2px] lg:hidden"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <aside
        className="absolute right-0 top-0 h-full w-[86vw] max-w-sm bg-[#f8f2e8] p-5 shadow-2xl fade-slide-up"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="display-font text-3xl leading-none">Navigate</p>
            <p className="text-xs uppercase tracking-[0.18em] muted-text">Quick access</p>
          </div>
          <button
            type="button"
            className="rounded-full border border-[#1f1a152f] p-2"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={onClose}
              className={navLinkClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="surface-card rounded-3xl p-4 mt-7">
          <p className="text-xs uppercase tracking-[0.16em] muted-text mb-3">Cart Snapshot</p>
          <div className="flex items-center justify-between text-sm">
            <span>Items</span>
            <span className="font-semibold">{cartCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span>Subtotal</span>
            <span className="font-semibold">{formatCurrency(cartSubtotal)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate("/login");
            }}
            className="btn-secondary inline-flex items-center justify-center gap-2 !rounded-2xl"
          >
            <UserRound size={16} />
            Account
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate("/cart");
            }}
            className="btn-primary inline-flex items-center justify-center gap-2 !rounded-2xl"
          >
            <ShoppingBag size={16} />
            Cart
          </button>
        </div>
      </aside>
    </div>
  );
};

Navbar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ).isRequired,
  cartCount: PropTypes.number.isRequired,
  cartSubtotal: PropTypes.number.isRequired,
};

export default Navbar;
