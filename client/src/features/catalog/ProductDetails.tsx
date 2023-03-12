import { LoadingButton } from "@mui/lab";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponenet";
import { Product } from "../../app/models/products";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../basket/basketSlice";
import { fetchSingleProductAsync, ProductSelectors } from "./catalogSlice";

const ProductDetails = () => {
  // const { basket, setBasket, removeItem } = useStoreContext();

  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const product = useAppSelector((state) =>
    ProductSelectors.selectById(state, id!)
  );

  const { status: productStatus } = useAppSelector((state) => state.catalog);

  const [quantity, setQuantity] = useState(0);

  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product && id) {
      dispatch(fetchSingleProductAsync(parseInt(id)));
    }
  }, [id, item, dispatch, product]);

  const handleInoutChange = (event: any) => {
    if (parseInt(event.target.value) > 0) {
      setQuantity(parseInt(event.target.value));
    }
  };

  const handleUpdateCart = () => {
    if (!item || quantity > 0) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addBasketItemAsync({
          productId: item?.productId!,
          quantity: updatedQuantity,
        })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(
        removeBasketItemAsync({
          productId: item?.productId!,
          quantity: updatedQuantity,
        })
      );
    }
  };

  if (productStatus.includes("pending"))
    return <LoadingComponent message="Loading Products.." />;

  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3"> {product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name:</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Description:</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Type:</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Brand:</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Quantity In Stock:</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={handleInoutChange}
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              loading={status.includes("pending" + item?.productId)}
              onClick={handleUpdateCart}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              sx={{ height: "55px" }}
            >
              {item ? "Update Quantity" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
