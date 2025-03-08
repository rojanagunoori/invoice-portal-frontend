import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

// Fetch products
export const fetchProducts = createAsyncThunk("products/fetch", async (_, { getState }) => {
  const token = getState().auth.token; // Get token from Redux
  const response = await API.get("/products", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

// Fetch a single product by ID
export const fetchProductById = createAsyncThunk("products/fetchById", async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const response = await API.get(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch product");
  }
});

// Add product
export const addProduct = createAsyncThunk("products/add", async (product, { getState }) => {
  const token = getState().auth.token; // Get token from Redux
  console.log("Token from Redux:", token);
  const response = await API.post("/products", product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

/** 🔹 3. Update a Product (UPDATE) */
export const updateProduct = createAsyncThunk("products/update", async ({ id, updatedData }, {getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    console.log("Token from Redux:", token);
    const response = await API.put(`/products/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to update product");
  }
});

/** 🔹 4. Delete a Product (DELETE) */
export const deleteProduct = createAsyncThunk("products/delete", async (id, {getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    
    await API.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id; // Returning ID to remove from state
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete product");
  }
});


const productSlice = createSlice({
  name: "products",
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /** 🟢 FETCH PRODUCTS */
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })


       /** 🟢 CREATE PRODUCT */
       .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
        //state.list = action.payload;
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

       /** 🟢 UPDATE PRODUCT */
       .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
       .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        };
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

        /** 🟢 DELETE PRODUCT */
        .addCase(deleteProduct.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
          state.list = state.list.filter((p) => p.id !== action.payload);
          state.loading = false;
        })
        .addCase(deleteProduct.rejected, (state, action) => {
          state.error = action.payload;
          state.loading = false;
        });
  },
});

export default productSlice.reducer;
