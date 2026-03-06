import { Link } from "react-router-dom";
import { FaInstagram, FaPinterestP } from "react-icons/fa";
import { FiFacebook, FiTwitter } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const linkClass =
    "text-xs uppercase tracking-[0.24em] text-[#f4f0e8]/62 transition-colors hover:text-[#c9a96e]";

  return (
    <footer className="relative mt-10 border-t border-[#f4f0e8]/15 bg-[#090909] px-4 py-14 sm:px-6">
      <div className="mx-auto grid max-w-[1320px] gap-10 md:grid-cols-4">
        <div className="space-y-4">
          <h3 className="font-display text-3xl tracking-[0.18em] text-[#f4f0e8]">
            eBazaar
          </h3>
          <p className="max-w-xs text-sm leading-relaxed text-[#f4f0e8]/58">
            Refined essentials and elevated staples for a modern wardrobe.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.34em] text-[#c9a96e]">
            Explore
          </p>
          <Link className={linkClass} to="/shop">
            Shop
          </Link>
          <Link className={linkClass} to="/login">
            Account
          </Link>
          <Link className={linkClass} to="/cart">
            Cart
          </Link>
        </div>

        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.34em] text-[#c9a96e]">
            Policies
          </p>
          <Link className={linkClass} to="/not-available">
            About
          </Link>
          <Link className={linkClass} to="/not-available">
            Privacy Policy
          </Link>
          <Link className={linkClass} to="/not-available">
            Contact
          </Link>
        </div>

        <div className="space-y-4">
          <p className="text-[11px] uppercase tracking-[0.34em] text-[#c9a96e]">
            Newsletter
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="w-full border border-[#f4f0e8]/22 bg-transparent px-3 py-2 text-sm text-[#f4f0e8] placeholder:text-[#f4f0e8]/35 outline-none transition focus:border-[#c9a96e]"
            />
            <button className="border border-[#c9a96e] px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[#f4f0e8] transition hover:bg-[#c9a96e] hover:text-[#0a0a0a]">
              Join
            </button>
          </div>

          <div className="flex gap-3 text-[#f4f0e8]/65">
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center border border-[#f4f0e8]/25 transition hover:border-[#c9a96e] hover:text-[#c9a96e]"
            >
              <FiFacebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center border border-[#f4f0e8]/25 transition hover:border-[#c9a96e] hover:text-[#c9a96e]"
            >
              <FiTwitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center border border-[#f4f0e8]/25 transition hover:border-[#c9a96e] hover:text-[#c9a96e]"
            >
              <FaInstagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center border border-[#f4f0e8]/25 transition hover:border-[#c9a96e] hover:text-[#c9a96e]"
            >
              <FaPinterestP className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-[1320px] border-t border-[#f4f0e8]/12 pt-5 text-[11px] uppercase tracking-[0.22em] text-[#f4f0e8]/45">
        © {currentYear} eBazaar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
