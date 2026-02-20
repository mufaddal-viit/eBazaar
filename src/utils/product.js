export const slugifyTitle = (value = "") =>
  String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "");

export const findProductBySlug = (products = [], slug = "") =>
  products.find((item) => slugifyTitle(item.title) === slug) ?? null;

export const formatCurrency = (value = 0) => {
  const amount = Number(value);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(amount) ? amount : 0);
};
