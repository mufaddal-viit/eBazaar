import "./App.css";
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
  const [dark, setdark] = useState(false);
  const handleclick = () => {
    setdark((prev) => !prev);
  };
  return (
    <div
      className={`${
        !dark
          ? "bg-gradient-to-b from-violet-300 via-blue-100 to-blue-400"
          : "bg-gray-700"
      }`}
    >
      <Header dark={dark} handleclick={handleclick} />
      <ScrollRestoration />
      {/* <Outlet /> */}
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
            <div className="flex items-center justify-center min-h-screen">
              <h1 className="text-center text-3xl text-gray-400 font-bold border-2 border-gray-400 rounded-2xl p-4">
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
  }
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
