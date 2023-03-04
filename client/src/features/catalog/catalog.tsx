import React, { useEffect, useState } from "react";
import { Product } from "../../app/models/products";
import ProductList from "./ProductList";

const Catalog = () => {
  const [products, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/Products").then((respose) =>
      respose.json().then((data) => setProduct(data))
    );
  }, []);

  return (
    <React.Fragment>
      <ProductList products={products} />
    </React.Fragment>
  );
};

export default Catalog;
