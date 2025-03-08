import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "@material-table/core";
import { addOrder, deleteOrder, fetchOrders, updateOrder } from "../store/orderSlice";

const OrderTable = () => {
  const dispatch = useDispatch();
  const { list: orders, loading } = useSelector((state) => state.orders);

  const ordersState = useSelector((state) => state.orders);
  console.log("Redux Orders:", ordersState.list);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <MaterialTable
      title="Orders"
      columns={[
        { title: "Order ID", field: "orderId" },
        { 
          title: "Customer", 
          field: "customer",
          render: rowData => rowData.customer?.storeName || "N/A" // ✅ Fix: Access a property
        },
        { 
          title: "Store", 
          field: "store",
          render: rowData => rowData.store?.name || "N/A" // ✅ Fix: Access a property
        },
        { title: "Total Amount", field: "totalAmount", type: "numeric" },
        { title: "Grand Total (Without Tax)", field: "grandTotalWithoutTax", type: "numeric" },
        { title: "Grand Total (With Tax)", field: "grandTotalWithTax", type: "numeric" },
        { title: "Status", field: "status" },
        { title: "Tracking Number", field: "trackingNumber" },
        { 
          title: "Date", 
          field: "date", 
          render: rowData => new Date(rowData.date).toLocaleDateString() 
        },
        { 
          title: "Items", 
          field: "items", 
          render: rowData => (
            <ul>
              {rowData.items?.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.quantity} x ${item.dealPrice} = ${item.itemTotal} (Tax: ${item.tax})
                </li>
              ))}
            </ul>
          ),
          editComponent: props => (
            <textarea
              value={JSON.stringify(props.value, null, 2)}
              onChange={e => props.onChange(JSON.parse(e.target.value))}
              rows={4}
              style={{ width: "100%" }}
            />
          )
        }
      ]}
      
      data={orders}
      isLoading={loading}
      editable={{
        onRowAdd: (newData) => dispatch(addOrder(newData)),
        onRowUpdate: (newData) => dispatch(updateOrder({ id: newData._id, updatedData: newData })),
        onRowDelete: (oldData) => dispatch(deleteOrder(oldData._id)),
      }}
      options={{
        sorting: true, search: true,
        searchFieldAlignment: "right", searchAutoFocus: true, searchFieldVariant: "standard",
        filtering: true, paging: true, pageSizeOptions: [2, 5, 10, 20, 25, 50, 100], pageSize: 5,
        paginationType: "stepped", showFirstLastPageButtons: false, paginationPosition: "both", exportButton: true,
        exportAllData: true, exportFileName: "InvoicesData", addRowPosition: "first", actionsColumnIndex: -1, selection: true,
        showSelectAllCheckbox: false, showTextRowsSelected: false,
        grouping: true, columnsButton: true,
        rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null,
        headerStyle: { background: "#f44336", color: "#fff" }
      }}
    />
  );
};

export default OrderTable;
