import React from "react";
import Card from "../../components/Card";
import products from "../../dummyData";

function Products() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 p-4">
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Products;
