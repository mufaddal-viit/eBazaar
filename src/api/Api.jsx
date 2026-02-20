import axios from "axios";

const productsData = async () => {
  try {
    const { data } = await axios.get(
      "https://fakestoreapiserver.reactbd.com/products"
    );
    return data;
  } catch {
    throw new Response("Unable to fetch products", {
      status: 502,
      statusText: "Product API Unavailable",
    });
  }
};

export default productsData;
