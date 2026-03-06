import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieConsentBanner from "./components/CookieConsentBanner";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import productsData from "./api/Api";
import { lazy, Suspense, useState } from "react";
import { CookieConsentProvider } from "./context/CookieConsentContext";

const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./components/Product"));
const Login = lazy(() => import("./pages/Login"));

const withRouteSuspense = (element) => (
  <Suspense
    fallback={
      <div className="flex min-h-[70vh] items-center justify-center px-4 pt-28">
        <p className="border border-[#f4f0e8]/20 px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-[#f4f0e8]/65">
          Loading...
        </p>
      </div>
    }
  >
    {element}
  </Suspense>
);

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
      <CookieConsentBanner />
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
          element: withRouteSuspense(<Home />),
          loader: productsData,
        },
        {
          path: "/shop",
          element: withRouteSuspense(<Home />),
          loader: productsData,
        },
        {
          path: "/product/:id",
          element: withRouteSuspense(<Product />),
          loader: productsData,
        },
        {
          path: "/cart",
          element: withRouteSuspense(<Cart />),
        },
        {
          path: "login",
          element: withRouteSuspense(<Login />),
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
    <CookieConsentProvider>
      <RouterProvider router={router} />
    </CookieConsentProvider>
  );
}

export default App;
