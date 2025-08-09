import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link, useOutletContext } from "react-router-dom";
import {
  decrementQuantity,
  deleteItem,
  increamentQuantity,
} from "../redux/bazarSlice";
import { ToastContainer, toast } from "react-toastify";

const CartItem = () => {
  const { dark } = useOutletContext(); // Get the dark mode state
  const productData = useSelector((state) => state.bazar.productData);
  const dispatch = useDispatch();

  return (
    <div className="w-full md:pr-14 h-full flex flex-col gap-4 sm:border-r-2">
      <h2
        className={`text-xl font-titleFont border-b-2 py-2 ${
          dark ? "text-white" : "text-gray-700"
        }`}
      >
        Your Shopping Cart
      </h2>

      {productData.length > 0 ? (
        productData.map((product) => (
          <div
            className={`border-b-2 pb-4 flex gap-4 p-1 ${
              dark ? "border-gray-600" : "border-gray-300"
            }`}
            key={product._id}
          >
            <figure className="w-32 md:w-40">
              <img
                className="max-w-full block rounded-md object-cover"
                src={product.image}
                alt="productImg"
              />
            </figure>
            <div
              className={`flex flex-col w-1/2 gap-4 py-3 ${
                dark ? "text-white" : "text-gray-700"
              }`}
            >
              <h2 className="text-lg md:text-2xl">{product.title}</h2>
              <p className="md:text-lg font-bold">
                ${product.price * product.quantity}
              </p>
              <div className="flex gap-3 w-fit items-center">
                <button
                  className={`border h-8 font-bold rounded text-lg flex items-center justify-center p-2.5 cursor-pointer duration-300
                    ${
                      dark
                        ? "hover:bg-white hover:text-black border-white"
                        : "hover:bg-gray-700 hover:text-white border-gray-700"
                    } active:bg-black`}
                  onClick={() =>
                    dispatch(
                      decrementQuantity({
                        _id: product._id,
                        title: product.title,
                        image: product.image,
                        price: product.price,
                        quantity: 1,
                        description: product.description,
                      })
                    )
                  }
                >
                  -
                </button>
                <span className="font-bold text-xl">{product.quantity}</span>
                <button
                  className={`border h-8 font-bold rounded text-lg flex items-center justify-center px-2 cursor-pointer duration-300
                    ${
                      dark
                        ? "hover:bg-white hover:text-black border-white"
                        : "hover:bg-gray-700 hover:text-white border-gray-700"
                    } active:bg-black`}
                  onClick={() =>
                    dispatch(
                      increamentQuantity({
                        _id: product._id,
                        title: product.title,
                        image: product.image,
                        price: product.price,
                        quantity: 1,
                        description: product.description,
                      })
                    )
                  }
                >
                  +
                </button>
              </div>
              <button
                className="bg-red-500 text-white py-2 mt-2 w-16 md:w-20 text-xs md:text-sm rounded hover:bg-transparent
                border border-red-500 hover:text-red-500 transition-all duration-200"
                onClick={() => {
                  dispatch(deleteItem(product._id));
                  toast.error(`${product.title} is removed`);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="h-full w-full">
          <div className="w-fit">
            <Link to="/">
              <div
                className={`flex items-center gap-1 transition-all duration-300 hover:scale-110 ${
                  dark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                <span className="text-2xl">
                  <HiOutlineArrowLeft />
                </span>
                <p className="text-2xl font-bold">Go Shopping</p>
              </div>
            </Link>
          </div>

          <p
            className={`mt-10 w-full h-full grid place-content-center italic transition-all duration-300 hover:scale-110 ${
              dark ? "text-gray-300" : "text-gray-400"
            }`}
          >
            Your Cart is Empty
          </p>
        </div>
      )}

      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default CartItem;
