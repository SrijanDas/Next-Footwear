// const charLimit = 30;

const trimProductName = (productName, charLimit = 40) => {
  const trimmedName =
    productName.length > charLimit
      ? productName.slice(0, charLimit) + "..."
      : productName;
  return trimmedName;
};
export default trimProductName;
