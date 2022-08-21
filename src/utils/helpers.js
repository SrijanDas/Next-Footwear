const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const currencySymbol = {
  INR: "₹",
  USD: "$",
  EUR: "€",
};

const formatPrice = (price, currency = "INR") => {
  const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${currencySymbol[currency]} ${formattedPrice}`;
};

const trimProductName = (productName, charLimit = 40) => {
  const trimmedName =
    productName.length > charLimit
      ? productName.slice(0, charLimit) + "..."
      : productName;
  return trimmedName;
};

const checkReturnPolicy = (delivery_date) => {
  const today = new Date();
  let delivery_date_obj = new Date(delivery_date);
  const diff = Math.abs(today - delivery_date_obj);
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

  delivery_date_obj.setDate(delivery_date_obj.getDate() + 7);

  if (diffDays > 7) {
    return {
      expired: true,
      date: delivery_date_obj,
    };
  }
  return {
    expired: false,
    date: delivery_date_obj,
  };
};

export { formatDate, formatPrice, trimProductName, checkReturnPolicy };
