import axios from "axios";

const PRODUCTS_API_URL = "https://fakestoreapiserver.reactbd.com/products";

const productsData = async () => {
  try {
    const products = await axios.get(PRODUCTS_API_URL, {
      timeout: 12000,
    });

    return {
      data: Array.isArray(products?.data) ? products.data : [],
      error: null,
    };
  } catch (error) {
    let message = "Unable to load products right now. Please try again.";

    if (axios.isAxiosError(error)) {
      message =
        error.response?.data?.message ||
        error.message ||
        "Unable to load products right now. Please try again.";
    }

    return {
      data: [],
      error: message,
    };
  }
};

export default productsData;
