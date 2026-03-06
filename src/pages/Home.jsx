import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import Products from "../components/Products";

const Home = () => {
  const response = useLoaderData();
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    setProducts(Array.isArray(response?.data) ? response.data : []);
    setApiError(response?.error || "");
  }, [response]);

  return (
    <div>
      {apiError && (
        <div className="mx-auto mt-24 w-[92%] max-w-[1320px] border border-[#c86060]/45 bg-[#240f0f]/60 px-4 py-3 text-sm tracking-[0.03em] text-[#f4f0e8] sm:px-6">
          {apiError}
        </div>
      )}
      <Banner />
      <Products products={products} />
    </div>
  );
};

export default Home;
