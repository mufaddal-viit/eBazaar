import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

function Navbar({ dark, handleclick }) {
  const navigate = useNavigate();
  const productData = useSelector((state) => state.bazar.productData);
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const handleNavigateCart = () => {
    closeMenu();
    navigate("/cart");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-[#f4f0e8]/30 bg-[#101010]/60 text-[#f4f0e8]"
        aria-label="Open navigation menu"
      >
        <span
          className={`h-0.5 w-5 bg-current transition-transform duration-300 ${
            isOpen ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`h-0.5 w-5 bg-current transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`h-0.5 w-5 bg-current transition-transform duration-300 ${
            isOpen ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-30 bg-black/60 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-40 h-screen w-[82vw] max-w-[320px] border-l border-[#f4f0e8]/20 bg-[#090909] px-7 pb-7 pt-6 transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <p className="font-display text-2xl tracking-[0.2em] text-[#f4f0e8]">
            eBazaar
          </p>
          <button
            onClick={closeMenu}
            className="h-8 w-8 border border-[#f4f0e8]/30 text-[#f4f0e8]"
            aria-label="Close navigation menu"
          >
            X
          </button>
        </div>

        <nav className="space-y-7">
          <Link
            onClick={closeMenu}
            to="/"
            className="block text-xs uppercase tracking-[0.3em] text-[#f4f0e8]/85 transition-colors hover:text-[#c9a96e]"
          >
            Home
          </Link>
          <Link
            onClick={closeMenu}
            to="/shop"
            className="block text-xs uppercase tracking-[0.3em] text-[#f4f0e8]/85 transition-colors hover:text-[#c9a96e]"
          >
            Shop
          </Link>
          <Link
            to="/login"
            onClick={closeMenu}
            className="inline-flex h-9 w-9 items-center justify-center border border-[#f4f0e8]/35 text-[#f4f0e8]/85 transition-colors hover:border-[#c9a96e] hover:text-[#c9a96e]"
          >
            <AiOutlineUser className="h-5 w-5" />
          </Link>

          <button
            onClick={handleNavigateCart}
            className="relative inline-flex h-9 w-9 items-center justify-center border border-[#f4f0e8]/35 text-[#f4f0e8]/85 transition-colors hover:border-[#c9a96e] hover:text-[#c9a96e]"
          >
            <FiShoppingCart className="h-5 w-5" />
            {productData.length > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-4 min-w-4 items-center justify-center border border-[#c9a96e] bg-[#090909] px-1 text-[10px] font-semibold text-[#c9a96e]">
                {productData.length}
              </span>
            )}
          </button>

          <button
            onClick={handleclick}
            className="inline-flex h-9 w-9 items-center justify-center border border-[#f4f0e8]/35 text-[#f4f0e8]/85 transition-colors hover:border-[#c9a96e] hover:text-[#c9a96e]"
            aria-label="Toggle theme"
          >
            {dark ? (
              <MdOutlineLightMode className="h-5 w-5" />
            ) : (
              <MdDarkMode className="h-5 w-5" />
            )}
          </button>
        </nav>
      </aside>
    </div>
  );
}

export default Navbar;
