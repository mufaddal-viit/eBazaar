import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import Navbar from "./newnav";
import { APP_TOAST_CONTAINER_ID } from "../hooks/useAppToast";

const Header = ({ dark, handleclick }) => {
  const navigate = useNavigate();
  const productData = useSelector((state) => state.bazar.productData);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const prevCartCount = useRef(productData.length);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (productData.length > prevCartCount.current) {
      setCartPulse(true);
      const timeout = setTimeout(() => setCartPulse(false), 500);
      prevCartCount.current = productData.length;
      return () => clearTimeout(timeout);
    }

    prevCartCount.current = productData.length;
  }, [productData.length]);

  const handleNavigate = () => navigate("/");
  const handleNavigateCart = () => navigate("/cart");

  const navLinkClasses =
    "relative text-[11px] uppercase tracking-[0.32em] text-[#f4f0e8]/85 transition-colors duration-300 hover:text-[#c9a96e] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#c9a96e] after:transition-transform after:duration-300 hover:after:scale-x-100";

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 sm:px-6">
      <div
        className={`mx-auto mt-2 max-w-[1320px] transition-all duration-500 ${
          isScrolled
            ? "h-16 border border-[#f4f0e8]/10 bg-[#101010]/78 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            : "h-20 border border-transparent bg-transparent"
        }`}
      >
        <div className="flex h-full items-center justify-between px-4 md:px-8">
          <button
            onClick={handleNavigate}
            className="font-display text-[26px] tracking-[0.18em] text-[#f4f0e8] transition-colors hover:text-[#c9a96e]"
          >
            eBazaar
          </button>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              <li>
                <button
                  onClick={handleclick}
                  className="text-[#f4f0e8]/80 transition-colors hover:text-[#c9a96e]"
                  aria-label="Toggle theme"
                >
                  {dark ? (
                    <MdOutlineLightMode className="h-5 w-5" />
                  ) : (
                    <MdDarkMode className="h-5 w-5" />
                  )}
                </button>
              </li>
              <li>
                <Link to="/" className={navLinkClasses}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className={navLinkClasses}>
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-[#f4f0e8]/85 transition-colors duration-300 hover:text-[#c9a96e]"
                >
                  <AiOutlineUser className="h-5 w-5" />
                </Link>
              </li>
              <li
                onClick={handleNavigateCart}
                className="relative cursor-pointer text-[#f4f0e8]/85 transition-colors duration-300 hover:text-[#c9a96e]"
              >
                <FiShoppingCart
                  className={`h-5 w-5 ${cartPulse ? "animate-bounce" : ""}`}
                />
                {productData.length > 0 && (
                  <span className="absolute -right-2.5 -top-2 inline-flex h-4 min-w-4 items-center justify-center border border-[#c9a96e] bg-[#0a0a0a] px-1 text-[10px] font-semibold text-[#c9a96e]">
                    {productData.length}
                  </span>
                )}
              </li>
            </ul>
          </nav>

          <div className="md:hidden">
            <Navbar dark={dark} handleclick={handleclick} />
          </div>
        </div>
      </div>

      <ToastContainer
        containerId={APP_TOAST_CONTAINER_ID}
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
      />
    </header>
  );
};

export default Header;
