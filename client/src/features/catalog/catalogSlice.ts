import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/products";
import { RootState } from "../../app/store/configureStore";

const productAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
  "catalog/fetchProductsAsync",
  async (_, thunkAPI) => {
    try {
      return await agent.Catalog.list();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchSingleProductAsync = createAsyncThunk<Product, number>(
  "catalog/fetchSingleProductAsync",
  async (productId, thunkAPI) => {
    try {
      return await agent.Catalog.details(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productAdapter.getInitialState({
    productsLoaded: false,
    status: "false",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (status) => {
      status.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (status, action) => {
      console.log(action.payload);
      status.status = "idle";
    });

    ////////////
    builder.addCase(fetchSingleProductAsync.pending, (status) => {
      status.status = "fetchSingleProductAsync";
    });
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      productAdapter.upsertOne(state, action.payload);
      state.status = "idle";
      //   state.productsLoaded = true;
    });
    builder.addCase(fetchSingleProductAsync.rejected, (status, action) => {
      console.log(action);
      status.status = "idle";
    });
  },
});

export const ProductSelectors = productAdapter.getSelectors(
  (state: RootState) => state.catalog
);
