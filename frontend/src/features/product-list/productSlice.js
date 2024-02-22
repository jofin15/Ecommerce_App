// productSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductsByFilters,
  fetchBrands,
  fetchCategories,
  fetchProductById,
} from "./productAPI";

export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    console.log(response);
    return response.data;
  },
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  "products/fetchProductsByFilters",
  async ({ filter, sort, pagination }) => {
    console.log("filtered data", filter);
    console.log("sorted data", sort);
    console.log("pagination data", pagination);
    const response = await fetchProductsByFilters(filter, sort, pagination);
    console.log("response filtered data", response.data);
    return response.data;
  },
);

export const fetchBrandAsync = createAsyncThunk(
  "products/fetchBrands",
  async () => {
    const response = await fetchBrands();
    console.log("response filtered data", response.data);
    return response.data;
  },
);

export const fetchCategoriesAsync = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await fetchCategories();
    console.log("response filtered data", response.data);
    return response.data;
  },
);

export const fetchAllProductByIdAsync = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    console.log("response fetchAllProductByIdAsync data", response.data);
    return response.data;
  },
);

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: "idle",
  totalItems: 0,
  selectedProduct:[]
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchAllProductsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.products = action.error;
      })

      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.totalItems = action.payload.totalItems;
        state.products = action.payload.products;
      })
      .addCase(fetchProductsByFiltersAsync.rejected, (state, action) => {
        state.status = "idle";
        state.products = action.error;
      })

      .addCase(fetchBrandAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchBrandAsync.rejected, (state, action) => {
        state.status = "idle";
        state.brands = action.error;
      })

      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.status = "idle";
        state.categories = action.error;
      })


      .addCase(fetchAllProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchAllProductByIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.error;
      });
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectedProductById=(state)=>state.product.selectedProduct
export default productSlice.reducer;
