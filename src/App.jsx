






import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Invoices from "./pages/Invoices";
import Orders from "./pages/Orders";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout"; // Import Layout

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;




/**
 * import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

import Products from "./pages/Products";
import Invoices from "./pages/Invoices";
import Orders from "./pages/Orders";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
      
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Home />} />
        
        <Route path="/products" element={<Products />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/orders" element={<Orders />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
 */



/*import React, { useState } from 'react';
import './App.css';
import MaterialTable from "@material-table/core";

import GetAppIcon from "@mui/icons-material/GetApp";
import AddIcon from "@mui/icons-material/Add";


function App() {
  const [tableData, setTableData] = useState([
    { name: "Raj", email: "Raj@gmail.com", phone: 7894561230, age: null, gender: "M", city: "Chennai", fee: 78456 },
    { name: "Mohan", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", fee: 456125 },
    { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", fee: 458796 },
    { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", fee: 874569 },
    { name: "Neha", email: "neha@gmail.com", phone: 7845621301, age: 25, gender: "F", city: "Patna", fee: 748521 },
    { name: "Mohan", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", fee: 456125 },
    { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", fee: 458796 },
    { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", fee: 874569 },
    { name: "Raj", email: "Raj@gmail.com", phone: 7894561230, age: null, gender: "M", city: "Chennai", fee: 78456 },
    { name: "Mohan", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", fee: 456125 },
    { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", fee: 458796 },
    { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", fee: 874569 },
  ])
  const columns = [
    { title: "Name", field: "name", sorting: false, filtering: false, cellStyle: { background:"#009688" }, headerStyle: { color: "#fff" } },
    { title: "Email", field: "email", filterPlaceholder: "filter" },
    { title: "Phone Number", field: "phone", align: "center", grouping: false },
    {
      title: "Age", field: "age", emptyValue: () => <em>null</em>,
      render: (rowData) => <div style={{ background: rowData.age >= 18 ? "#008000aa" : "#f90000aa",borderRadius:"4px",paddingLeft:5 }}>{rowData.age >= 18 ? "18+" : "18-"}</div>,
       searchable: false, export: false
    },
    { title: "Gender", field: "gender", lookup: { M: "Male", F: "Female" } },
    { title: "City", field: "city",filterPlaceholder:"filter" },
    { title: "School Fee", field: "fee", type: "currency", currencySetting: { currencyCode: "INR", minimumFractionDigits: 1 },
    cellStyle: { background:"#009688" }, headerStyle: { color: "#fff" } },
  ]
  return (
    <div className="App">
      <h1 align="center">React-App</h1>
      <h4 align='center'>Crash Course on Material Table </h4>

      <MaterialTable columns={columns} data={tableData}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            setTableData([...tableData, newRow])

            setTimeout(() => resolve(), 500)
          }),
          onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            updatedData[oldRow.tableData.id] = newRow
            setTableData(updatedData)
            setTimeout(() => resolve(), 500)
          }),
          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            updatedData.splice(selectedRow.tableData.id, 1)
            setTableData(updatedData)
            setTimeout(() => resolve(), 1000)

          })
        }}
        actions={[
          {
            icon: () => <GetAppIcon />,
            tooltip: "Click me",
            onClick: (e, data) => console.log(data),
            // isFreeAction:true
          }
        ]}
        onSelectionChange={(selectedRows) => console.log(selectedRows)}
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
        title="Student Information"
        icons={{ Add: () => <AddIcon /> }} />
        <h2>hh</h2>
    </div>
  );
}

export default App;
*/
/*
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Products from "./components/Products";

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Products />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
*/



/*import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, CssBaseline, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useState } from "react";

// Import Pages (You should create these components)
import Home from "./pages/Home";
import GenerateInvoice from "./pages/Dashboard";
import InvoiceList from "./pages/Invoices";

const drawerWidth = 240;

function App() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <List>
                <ListItem button component={Link} to="/">
                    <HomeIcon sx={{ marginRight: 1 }} />
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/generate-invoice">
                    <ReceiptIcon sx={{ marginRight: 1 }} />
                    <ListItemText primary="Generate Invoice" />
                </ListItem>
                <ListItem button component={Link} to="/invoice-list">
                    <ListAltIcon sx={{ marginRight: 1 }} />
                    <ListItemText primary="Invoice List" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <Router>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                
                <AppBar position="fixed" sx={{ zIndex: 1300 }}>
                    <Toolbar>
                        <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Invoice Management System
                        </Typography>
                    </Toolbar>
                </AppBar>

            
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    sx={{
                        "& .MuiDrawer-paper": { width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
                    }}
                >
                    {drawer}
                </Drawer>

           
                <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px`, mt: 8 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/generate-invoice" element={<GenerateInvoice />} />
                        <Route path="/invoice-list" element={<InvoiceList />} />
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}

export default App;

*/


