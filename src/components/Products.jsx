import React from "react";
import ProductCard from "./ProductCard";
import { useOutletContext } from "react-router-dom";

const Products = ({ products }) => {
  const { dark } = useOutletContext(); // Get the dark mode state
  return (
    <div
      id="shop"
      className={` ${
        !dark ? "bg-gray-300" : "bg-gray-700"
      }  rounded-2xl mx-auto max-w-screen-xl w-full p-1 m-3`}
    >
      <div className="text-center mt-6 mb-6">
        <h2 className="text-3xl font-bold mb-4">Our Products</h2>
        <div className="w-30 h-1 bg-gray-950 mx-auto mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto font-bold">
          Discover our curated collection of high-quality products. From
          everyday essentials to unique finds, we've got something for everyone.
        </p>
      </div>
      <div className=" max-w-screen-xl mx-auto flex justify-center flex-wrap lg:grid grid-cols-4 gap-10 py-10 ">
        {products.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
