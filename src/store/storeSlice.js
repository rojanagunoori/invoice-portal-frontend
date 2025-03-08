import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

export const fetchStores = createAsyncThunk("stores/fetch", async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await API.get("/stores", { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
});

export const fetchStoreById = createAsyncThunk("stores/fetchById", async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const response = await API.get(`/stores/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch store");
  }
});

export const addStore = createAsyncThunk("stores/add", async (store, { getState }) => {
  const token = getState().auth.token;
  const response = await API.post("/stores", store, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
});

export const updateStore = createAsyncThunk("stores/update", async ({ id, updatedData }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const response = await API.put(`/stores/${id}`, updatedData, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to update store");
  }
});

export const deleteStore = createAsyncThunk("stores/delete", async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    await API.delete(`/stores/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete store");
  }
});

const storeSlice = createSlice({
  name: "stores",
  initialState: { list: [], store: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => { state.loading = true; })
      .addCase(fetchStores.fulfilled, (state, action) => { state.list = action.payload; state.loading = false; })
      .addCase(fetchStores.rejected, (state, action) => { state.error = action.payload; state.loading = false; })

      .addCase(fetchStoreById.pending, (state) => { state.loading = true; })
      .addCase(fetchStoreById.fulfilled, (state, action) => { state.store = action.payload; state.loading = false; })
      .addCase(fetchStoreById.rejected, (state, action) => { state.error = action.payload; state.loading = false; })

      .addCase(addStore.pending, (state) => { state.loading = true; })
      .addCase(addStore.fulfilled, (state, action) => { state.list.push(action.payload); state.loading = false; })
      .addCase(addStore.rejected, (state, action) => { state.error = action.payload; state.loading = false; })

      .addCase(updateStore.pending, (state) => { state.loading = true; })
      .addCase(updateStore.fulfilled, (state, action) => {
        const index = state.list.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) { state.list[index] = action.payload; }
        state.loading = false;
      })
      .addCase(updateStore.rejected, (state, action) => { state.error = action.payload; state.loading = false; })

      .addCase(deleteStore.pending, (state) => { state.loading = true; })
      .addCase(deleteStore.fulfilled, (state, action) => { state.list = state.list.filter((s) => s.id !== action.payload); state.loading = false; })
      .addCase(deleteStore.rejected, (state, action) => { state.error = action.payload; state.loading = false; });
  },
});

export default storeSlice.reducer;
