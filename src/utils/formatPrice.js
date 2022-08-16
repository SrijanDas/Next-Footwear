const currencySymbol = {
  INR: "₹",
  USD: "$",
  EUR: "€",
};

const formatPrice = (price, currency) => {
  const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${currencySymbol[currency]} ${formattedPrice}`;
};

export default formatPrice;
