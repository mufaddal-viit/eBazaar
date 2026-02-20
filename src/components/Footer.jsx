import { Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "About", to: "/not-available" },
  { label: "Shipping", to: "/not-available" },
  { label: "Returns", to: "/not-available" },
  { label: "Contact", to: "/not-available" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/not-available" },
  { label: "Terms", to: "/not-available" },
  { label: "Cookies", to: "/not-available" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-14 bg-[#1f1a15] text-[#efe6d8]">
      <div className="section-shell px-2 sm:px-3 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <p className="display-font text-4xl leading-none mb-3">eBazaar</p>
            <p className="text-sm text-[#c8b9a4] max-w-xs">
              A modern clothing storefront focused on thoughtful edits, premium textures,
              and everyday confidence.
            </p>
          </div>

          <div>
            <p className="uppercase tracking-[0.18em] text-xs text-[#d4c8b7] mb-4">Explore</p>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-[#efe6d8] hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="uppercase tracking-[0.18em] text-xs text-[#d4c8b7] mb-4">Legal</p>
            <ul className="space-y-3 text-sm">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-[#efe6d8] hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="uppercase tracking-[0.18em] text-xs text-[#d4c8b7] mb-4">Newsletter</p>
            <p className="text-sm text-[#c8b9a4] mb-4">Get curated drops and style updates every week.</p>
            <form className="space-y-2" onSubmit={(event) => event.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-2xl border border-[#ffffff2c] bg-[#ffffff14] px-4 py-2.5 text-sm placeholder:text-[#c9b7a1] outline-none focus:border-[#ffffff54]"
              />
              <button type="submit" className="btn-secondary !rounded-2xl !w-full !bg-[#f6eee1] !text-[#1f1a15]">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-[#ffffff2b] flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-[#b8aa97]">
          <p>Copyright {year} eBazaar. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link to="/not-available" className="hover:text-white" aria-label="Instagram">
              <Instagram size={16} />
            </Link>
            <Link to="/not-available" className="hover:text-white" aria-label="Twitter">
              <Twitter size={16} />
            </Link>
            <Link to="/not-available" className="hover:text-white" aria-label="LinkedIn">
              <Linkedin size={16} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
