import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import Cart from "./pages/Cart";
import productsData from "./api/Api";
import Product from "./components/Product";
import Login from "./pages/Login";
import { useState } from "react";

const Layout = () => {
  const [dark, setdark] = useState(true);
  const handleclick = () => {
    setdark((prev) => !prev);
  };
  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
        dark ? "bg-[#0a0a0a]" : "bg-[#151515]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(201,169,110,0.12),_transparent_42%)]" />
      <Header dark={dark} handleclick={handleclick} />
      <ScrollRestoration />
      <Outlet context={{ dark }} />
      <Footer />
    </div>
  );
};
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: productsData,
        },
        {
          path: "/shop",
          element: <Home />,
          loader: productsData,
        },
        {
          path: "/product/:id",
          element: <Product />,
          loader: productsData,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "not-available",
          element: (
            <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 pt-28">
              <h1 className="border border-[#f4f0e8]/20 px-8 py-6 text-center font-display text-3xl tracking-[0.12em] text-[#f4f0e8]/70">
                Page Under Construction
              </h1>
            </div>
          ),
        },
      ],
    },
  ],
  {
    basename: "/eBazaar",
  },
);
function App() {
  return (
    <>
      {/* <h1>Hello</h1> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
