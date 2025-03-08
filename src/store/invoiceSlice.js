import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

// Fetch invoices
export const fetchInvoices = createAsyncThunk("invoices/fetch", async (_, { getState }) => {
  const token = getState().auth.token; // Get token from Redux state
  const response = await API.get("/invoices", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

// Fetch invoice by ID
export const fetchInvoiceById = createAsyncThunk("invoices/fetchById", async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const response = await API.get(`/invoices/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch invoice");
  }
});



// Add new invoice
export const addInvoice = createAsyncThunk("invoices/add", async (invoice, { getState ,rejectWithValue }) => {
  try {
    console.log("Sending Invoice Data: ", invoice);
  const token = getState().auth.token;
  const response = await API.post("/invoices", invoice, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("Response Data: ", response.data);
  return response.data
} catch (error) {
  //const errorData = await response.json();
  //console.error("Error Response: ", error);
console.log(error)
      // Ensure error.response exists before accessing its properties
      if (error.response) {
        console.error("Backend Error Data: ", error.response.data);
        return rejectWithValue(error.response.data?.message || "Failed to create invoice");
      }
  console.error("Error Response: ", error);
  return rejectWithValue(error.response?.data?.message || "Failed to create invoice");
};
});

// Update invoice
export const updateInvoice = createAsyncThunk("invoices/update", async ({ id, updatedData }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const response = await API.put(`/invoices/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to update invoice");
  }
});

// Delete invoice
export const deleteInvoice = createAsyncThunk("invoices/delete", async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    await API.delete(`/invoices/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete invoice");
  }
});


// Download invoice PDF
export const downloadInvoicePDF = createAsyncThunk(
  "invoices/download",
  async (id, { getState, rejectWithValue }) => {
    try {
    const token = getState().auth.token; // Get token from Redux state
    const response = await API.get(`/invoices/${id}/pdf`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob", // Important for handling files
    });


     // Create a URL and trigger download
     const blob = new Blob([response.data], { type: "application/pdf" });
     const url = window.URL.createObjectURL(blob);
     const a = document.createElement("a");
     a.href = url;
     a.download = `invoice_${id}.pdf`;
     document.body.appendChild(a);
     a.click();
     document.body.removeChild(a);
     window.URL.revokeObjectURL(url);

    return { id, data: response.data , success: true};
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to download invoice");
  }
  }
);

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: { list: [], invoice: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchInvoices.pending, (state) => { state.loading = true; })
    .addCase(fetchInvoices.fulfilled, (state, action) => { state.list = action.payload; state.loading = false; })
    .addCase(fetchInvoices.rejected, (state, action) => { state.error = action.payload; state.loading = false; })

    .addCase(fetchInvoiceById.pending, (state) => { state.loading = true; })
    .addCase(fetchInvoiceById.fulfilled, (state, action) => { state.invoice = action.payload; state.loading = false; })
    .addCase(fetchInvoiceById.rejected, (state, action) => { state.error = action.payload; state.loading = false; })

    .addCase(addInvoice.pending, (state) => { state.loading = true; })
    .addCase(addInvoice.fulfilled, (state, action) => { state.list.push(action.payload); state.loading = false; })
    .addCase(addInvoice.rejected, (state, action) => { state.error = action.payload; state.loading = false; })

    .addCase(updateInvoice.pending, (state) => { state.loading = true; })
    .addCase(updateInvoice.fulfilled, (state, action) => {
      const index = state.list.findIndex((inv) => inv.id === action.payload.id);
      if (index !== -1) { state.list[index] = action.payload; }
      state.loading = false;
    })
    .addCase(updateInvoice.rejected, (state, action) => { state.error = action.payload; state.loading = false; })

    .addCase(deleteInvoice.pending, (state) => { state.loading = true; })
    .addCase(deleteInvoice.fulfilled, (state, action) => { state.list = state.list.filter((inv) => inv.id !== action.payload); state.loading = false; })
    .addCase(deleteInvoice.rejected, (state, action) => { state.error = action.payload; state.loading = false; })



   // Handle Download PDF
   .addCase(downloadInvoicePDF.pending, (state) => { state.downloading = true; })
   .addCase(downloadInvoicePDF.fulfilled, (state) => { state.downloading = false; })
   .addCase(downloadInvoicePDF.rejected, (state, action) => { state.error = action.payload; state.downloading = false; });
  },
});

export default invoiceSlice.reducer;
