import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  createBrowserRouter,
  isRouteErrorResponse,
  Link,
  Outlet,
  RouterProvider,
  ScrollRestoration,
  useRouteError,
} from "react-router-dom";
import Cart from "./pages/Cart";
import productsData from "./api/Api";
import Product from "./components/Product";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RouteError = () => {
  const error = useRouteError();

  let title = "Page unavailable";
  let message = "We could not load this page. Please try again.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message = "The requested page is unavailable at the moment.";
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <section className="section-shell min-h-[55vh] flex items-center justify-center">
      <div className="surface-card rounded-3xl p-8 text-center max-w-xl fade-slide-up">
        <p className="uppercase tracking-[0.18em] text-xs muted-text mb-3">
          Navigation Error
        </p>
        <h1 className="section-title mb-3">{title}</h1>
        <p className="muted-text mb-6">{message}</p>
        <Link to="/" className="btn-primary inline-flex items-center justify-center">
          Return Home
        </Link>
      </div>
    </section>
  );
};

const Layout = () => {
  return (
    <div className="app-shell">
      <div className="announcement-bar">
        Complimentary shipping on orders above $120
      </div>
      <Header />
      <ScrollRestoration />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2400}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <RouteError />,
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
          path: "/login",
          element: <Login />,
        },
        {
          path: "/not-available",
          element: (
            <section className="section-shell min-h-[55vh] flex items-center justify-center">
              <div className="surface-card rounded-3xl p-8 text-center max-w-xl fade-slide-up">
                <p className="uppercase tracking-[0.18em] text-xs muted-text mb-3">
                  Coming Soon
                </p>
                <h1 className="section-title mb-3">This page is under construction</h1>
                <p className="muted-text">
                  We are building this part of eBazaar and it will be available in
                  an upcoming release.
                </p>
              </div>
            </section>
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
  return <RouterProvider router={router} />;
}

export default App;
