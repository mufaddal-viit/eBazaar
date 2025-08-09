import "./newnav.css";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const handleNavigateCart = () => navigate("/cart");
  const productData = useSelector((state) => state.bazar.productData);
  const [ischecked, setIschecked] = useState(false);

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIschecked(checked);
  };
  const handleChange = () => {
    setIschecked(!ischecked);
  };
  return (
    <div className="menu-container">
      <input
        type="checkbox"
        id="openmenu"
        className="hamburger-checkbox"
        checked={ischecked}
        onChange={handleCheckboxChange}
      />

      <div className="hamburger-icon">
        <label htmlFor="openmenu" id="hamburger-label">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div className="menu-pane">
        <nav>
          <ul className="menu-links">
            <li>
              <Link
                onClick={handleChange}
                to="/"
                className="text-lg font-bold hover:text-gray-800 transition"
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                onClick={handleChange}
                to="/shop"
                className="text-lg font-bold hover:text-gray-800 transition"
              >
                SHOP
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-lg hover:text-gray-800"
                onClick={handleChange}
              >
                <AiOutlineUser className="w-6 h-6" />
              </Link>
            </li>
            <li
              onClick={() => {
                handleChange();
                handleNavigateCart();
              }}
              className="relative cursor-pointer"
            >
              <FiShoppingCart className="w-6 h-6" />
              {productData.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {productData.length}
                </span>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
