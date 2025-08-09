// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { FiShoppingCart } from "react-icons/fi";
// import { AiOutlineUser } from "react-icons/ai";
// import { HiOutlineMenuAlt3 } from "react-icons/hi";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import logo from "../assets/react.svg";
// import Navbar from "./newnav";

// const Header = () => {
//   const navigate = useNavigate();
//   const [menu, setMenu] = useState(false);
//   const productData = useSelector((state) => state.bazar.productData);
//   // const userInfo = useSelector((state) => state.bazar.userInfo) || "";
//   const handleNavigate = () => navigate("/");
//   const handleNavigateCart = () => navigate("/cart");

//   const NavItems = () => (
//     <>
//       <li className="text-lg font-bold px-4 py-2 rounded-md hover:text-gray-900 hover:bg-gray-600 transition-all duration-300 cursor-pointer">
//         <Link to="/" onClick={() => setMenu(!menu)}>
//           HOME
//         </Link>
//       </li>

//       {/* Shop */}
//       <li className="text-lg font-bold px-4 py-2 rounded-md hover:text-gray-900 hover:bg-gray-600 transition-all duration-300 cursor-pointer">
//         <Link to="/shop" onClick={() => setMenu(!menu)}>
//           SHOP
//         </Link>
//       </li>

//       {/* User */}
//       <li className="p-2 hover:bg-gray-600 rounded-full transition-all duration-300 cursor-pointer">
//         <Link to="/login" onClick={() => setMenu(!menu)}>
//           <AiOutlineUser className="w-6 h-6 text-gray-700" />
//         </Link>
//       </li>

//       {/* Cart */}
//       <li
//         className="relative p-2 hover:bg-gray-600 rounded-full transition-all duration-300 cursor-pointer"
//         onClick={() => {
//           handleNavigateCart();
//           setMenu(!menu);
//         }}
//       >
//         <FiShoppingCart className="w-6 h-6 text-gray-700" />
// {productData.length > 0 && (
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//             {productData.length}
//           </span>
//         )}
//       </li>
//     </>
//   );

//   return (
//     <header className="fixed inset-x-0 top-0 z-10 bg-white/60 backdrop-blur-md shadow-md border-b border-white/30 rounded-lg">
//       <div className="mx-auto px-4 sm:px-6 lg:px-8 border-b-2 rounded-lg">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <figure className="w-36 sm:w-44">
//             <img
//               onClick={handleNavigate}
//               src={logo}
//               alt="logo"
//               className="w-fit cursor-pointer"
//             />
//           </figure>

//           {/* Desktop Nav */}
//           <nav className="hidden md:block">
//             <ul className="flex items-center space-x-6">{<NavItems />}</ul>
//           </nav>

//           {/* Mobile Menu Button */}
//           {/* <button className="md:hidden p-2 rounded-full hover:bg-gray-100 transition">
//             <HiOutlineMenuAlt3
//               className="h-6 w-6 text-gray-700"
//               onClick={() => setMenu(!menu)}
//             />
//           </button> */}
//           <div className="md:hidden p-2  hover:bg-gray-800 transition ">
//             <Navbar />
//           </div>
//         </div>
//       </div>

//       {/* Mobile Nav */}
//       {menu && (
//         <nav className="md:hidden">
//           <ul className="flex flex-col items-center space-y-4 py-4 bg-white/90 backdrop-blur-md shadow-md rounded-b-lg">
//             {<NavItems />}
//           </ul>
//         </nav>
//       )}

//       {/* Toast */}
//       <ToastContainer
//         position="top-left"
//         autoClose={2000}
//         hideProgressBar={false}
//         closeOnClick
//         rtl={false}
//         draggable
//         theme="dark"
//       />
//     </header>
//   );
// };

// export default Header;

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "/m-icon.svg";
import Navbar from "./newnav";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdOutlineLightMode } from "react-icons/md";
import { useState } from "react";
import { MdDarkMode } from "react-icons/md";

const Header = ({ dark, handleclick }) => {
  const navigate = useNavigate();
  const productData = useSelector((state) => state.bazar.productData);
  const handleNavigate = () => navigate("/");
  const handleNavigateCart = () => navigate("/cart");
  // const [dark, setdark] = useState(false);
  // const handleclick = () => {
  //   setdark((prev) => !prev);
  // };
  return (
    <header
      className={`fixed inset-x-0 top-0 z-10 ${
        !dark ? "bg-white/60" : "bg-gray-900"
      } backdrop-blur-sm shadow-md border-b border-white/30 rounded-lg`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 border-b-2 rounded-lg">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <figure className="w-36 sm:w-44">
            <img
              onClick={handleNavigate}
              src={logo}
              alt="logo"
              className="w-fit cursor-pointer h-15 bg-radial from-blue-300 via-violet-200 to-violet-50  rounded-full mt-0.5 "
            />
          </figure>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-10">
              <div>
                <button onClick={handleclick}>
                  {dark ? (
                    <MdOutlineLightMode
                      className={`h-6 w-6 cursor-pointer ${
                        dark ? "text-white" : null
                      }`}
                    />
                  ) : (
                    <MdDarkMode className="h-6 w-6 cursor-pointer " />
                  )}
                </button>
              </div>
              <li>
                <Link
                  to="/"
                  className={`text-lg font-bold hover:text-gray-800 transition ${
                    dark ? "text-white" : null
                  }`}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className={`text-lg font-bold hover:text-gray-800 transition ${
                    dark ? "text-white" : null
                  }`}
                >
                  SHOP
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className={`text-lg font-bold hover:text-gray-800  ${
                    dark ? "text-white" : null
                  }`}
                >
                  <AiOutlineUser className="w-6 h-6" />
                </Link>
              </li>
              <li
                onClick={handleNavigateCart}
                className={` cursor-pointer text-lg font-bold hover:text-gray-800 transition ${
                  dark ? "text-white" : null
                }`}
              >
                <FiShoppingCart className="w-6 h-6" />
                {productData.length > 0 && (
                  <span className="absolute top-2 right-4 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {productData.length}
                  </span>
                )}
              </li>
            </ul>
          </nav>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <Navbar />
          </div>
        </div>
      </div>

      {/* Toast */}
      <ToastContainer
        position="top-left"
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
