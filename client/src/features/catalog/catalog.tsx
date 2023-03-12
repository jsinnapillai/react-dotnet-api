import React, { useEffect } from "react";

import LoadingComponent from "../../app/layout/LoadingComponenet";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, ProductSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

const Catalog = () => {
  const products = useAppSelector(ProductSelectors.selectAll);
  const { productsLoaded, status } = useAppSelector((state) => state.catalog);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [productsLoaded, dispatch]);

  if (status.includes("pending")) return <LoadingComponent message="Loading" />;

  return (
    <React.Fragment>
      <ProductList products={products} />
    </React.Fragment>
  );
};

export default Catalog;
