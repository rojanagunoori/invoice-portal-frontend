import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api";

//const initialState = {
//  orders: [],
//};

// Fetch all orders


export const fetchOrders= createAsyncThunk("orders/fetch", async (_, { getState }) => {
  const token = getState().auth.token;
  
  const response = await API.get("/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("API Response:", response.data);
  return response.data;
});

// Fetch order by ID
export const fetchOrderById = createAsyncThunk("orders/fetchById", async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const response = await API.get(`/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch order");
  }
});

// Add order
export const addOrder = createAsyncThunk("orders/add", async (order, { getState , rejectWithValue}) => {
  try {
  const token = getState().auth.token;
  const response = await API.post("/orders", order, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("API Response AAded:", response.data);
  return response.data;
} catch (error) {
  console.error("Error fetching orders:", error.response?.data || error.message);
  return rejectWithValue(error.response?.data?.message || "Failed to update order");
}
});

// Update order
export const updateOrder = createAsyncThunk("orders/update", async ({ id, updatedData }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const response = await API.put(`/orders/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to update order");
  }
});

// Delete order
export const deleteOrder = createAsyncThunk("orders/delete", async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    await API.delete(`/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete order");
  }
});


const orderSlice = createSlice({
  name: "orders",
  initialState: { list: [], order: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchOrders.fulfilled, (state, action) => { state.list = action.payload; state.loading = false; })
      .addCase(fetchOrders.rejected, (state, action) => { state.error = action.payload; state.loading = false; })

      .addCase(fetchOrderById.pending, (state) => { state.loading = true; })
      .addCase(fetchOrderById.fulfilled, (state, action) => { state.order = action.payload; state.loading = false; })
      .addCase(fetchOrderById.rejected, (state, action) => { state.error = action.payload; state.loading = false; })

      .addCase(addOrder.pending, (state) => { state.loading = true; })
      .addCase(addOrder.fulfilled, (state, action) => { state.list.push(action.payload); state.loading = false; })
      .addCase(addOrder.rejected, (state, action) => { state.error = action.payload; state.loading = false; })

      .addCase(updateOrder.pending, (state) => { state.loading = true; })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.list.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) { state.list[index] = action.payload; }
        state.loading = false;
      })
      .addCase(updateOrder.rejected, (state, action) => { state.error = action.payload; state.loading = false; })

      .addCase(deleteOrder.pending, (state) => { state.loading = true; })
      .addCase(deleteOrder.fulfilled, (state, action) => { state.list = state.list.filter((o) => o.id !== action.payload); state.loading = false; })
      .addCase(deleteOrder.rejected, (state, action) => { state.error = action.payload; state.loading = false; });
  },
});


/*const orderSlice = createSlice({
  name: "orders",
  //initialState,
  initialState: { list: [], order: null, loading: false, error: null },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload);
    },
  },
});*/

//export const { setOrders, addOrder, deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;
