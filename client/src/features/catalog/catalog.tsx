import React, { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponenet";
import { Product } from "../../app/models/products";
import ProductList from "./ProductList";

const Catalog = () => {
  const [products, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then((products: Product[]) => setProduct(products))
      .catch((error: any) => console.log(error))
      .finally(() => setLoading(false));
    // .fetch("http://localhost:5000/api/Products")
    // .then((respose) => respose.json().then((data) => setProduct(data)));
  }, []);

  if (loading) return <LoadingComponent message="Loading" />;

  return (
    <React.Fragment>
      <ProductList products={products} />
    </React.Fragment>
  );
};

export default Catalog;
