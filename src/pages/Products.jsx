import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "@material-table/core";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "../store/productSlice";

const ProductTable = () => {
  const dispatch = useDispatch();
  const { list: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <MaterialTable
      title="Product Inventory"
      columns={[
        { title: "Name", field: "name" },
        { title: "Store", field: "store" },
        { title: "Price", field: "price", type: "numeric" },
        { title: "Stock", field: "stock", type: "numeric" },
        { title: "Quantity", field: "quantity", type: "numeric" },
      ]}
      data={products}
      isLoading={loading}
      editable={{
        onRowAdd: (newData) => dispatch(addProduct(newData)),
        onRowUpdate: (newData) => dispatch(updateProduct({ id: newData._id, updatedData: newData })),
        onRowDelete: (oldData) => dispatch(deleteProduct(oldData._id)),
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

export default ProductTable;