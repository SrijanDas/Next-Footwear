const charLimit = 40;

const trimProductName = (productName) => {
  const trimmedName =
    productName.length > charLimit
      ? productName.slice(0, charLimit) + "..."
      : productName;
  return trimmedName;
};
export default trimProductName;
