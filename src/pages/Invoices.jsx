import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "@material-table/core";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "../store/productSlice";
import { addInvoice, deleteInvoice, downloadInvoicePDF, fetchInvoices, updateInvoice } from "../store/invoiceSlice";
import { Button } from "@mui/material";

const InvoicesTable = () => {
  const dispatch = useDispatch();
  const { list: invoices, loading } = useSelector((state) => state.invoices);

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  return (
    <MaterialTable
    title="Invoices"
    columns={[
      { title: "Order ID", field: "orderId" },
      { title: "Customer", field: "customer" },
      { title: "Amount", field: "amount", type: "numeric" },
      { title: "Grand Total (Without Tax)", field: "grandTotalWithoutTax", type: "numeric" },
      { title: "Grand Total (With Tax)", field: "grandTotalWithTax", type: "numeric" },
      { title: "Date", field: "date", render: rowData => new Date(rowData.date).toLocaleDateString() },
      { 
        title: "Items", 
        field: "items", 
        render: rowData => (
          <ul>
            {(rowData.items || []).map((item, index) => (
              <li key={index}>{item.name} - {item.quantity} x ${item.dealPrice} = ${item.itemTotal}</li>
            ))}
          </ul>
        ),
       // editable: 'onUpdate',
        editComponent: ({ value, onChange }) => (
          <textarea
            rows={3}
            style={{ width: "100%" }}
            value={JSON.stringify(value, null, 2)} // Convert array to string
            onChange={(e) => {
              try {
                onChange(JSON.parse(e.target.value)); // Convert text input to array
              } catch {
                onChange([]); // Prevent crash if input is invalid JSON
              }
            }}
          />
        )
      },
      {
        title: "Actions",
        field: "actions",
        render: rowData => (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => dispatch(downloadInvoicePDF(rowData._id))}
          >
            Download PDF
          </Button>
        )
      }
    ]}
      data={invoices}
      isLoading={loading}
     // editable={{
      //  onRowAdd: (newData) => dispatch(addInvoice(newData)),
      //  onRowUpdate: (newData) => dispatch(updateInvoice({ id: newData._id, updatedData: newData })),
      //  onRowDelete: (oldData) => dispatch(deleteInvoice(oldData._id)),
    //  }}
    editable={{
      onRowAdd: async (newData) => {
        try {
          // Ensure items is a valid array before adding
          if (typeof newData.items === "string" && newData.items.trim() !== "") {
            newData.items = JSON.parse(newData.items);
          } else if (!Array.isArray(newData.items)) {
            newData.items = []; // Default empty array to avoid errors
          }
      
          dispatch(addInvoice(newData));
        } catch (error) {
          console.error("Error adding invoice:", error);
        }
      },
      
      onRowUpdate: async (newData) => {
        if (typeof newData.items === "string") {
          newData.items = JSON.parse(newData.items);
        }
        dispatch(updateInvoice({ id: newData._id, updatedData: newData }));
      },
      onRowDelete: async (oldData) => {
        dispatch(deleteInvoice(oldData._id));
      },
    }}

      
      options={{
        sorting: true, search: true,
          searchFieldAlignment: "right", searchAutoFocus: true, searchFieldVariant: "standard",
          filtering: true, paging: true, pageSizeOptions: [2, 5, 10, 20, 25, 50, 100], pageSize: 5,
          paginationType: "stepped", showFirstLastPageButtons: false, paginationPosition: "both", exportButton: true,
          exportAllData: true, exportFileName: "TableData", addRowPosition: "first", actionsColumnIndex: -1, selection: true,
          showSelectAllCheckbox: false, showTextRowsSelected: false, selectionProps: rowData => ({
            disabled: rowData.age == null,
            // color:"primary"
          }),
          grouping: true, columnsButton: true,
          rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null,
          headerStyle: { background: "#f44336",color:"#fff"}
      }}
    />
  );
};

export default InvoicesTable;