import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-4">
        <Link to="/products" className="block bg-green-500 text-white p-3 rounded mb-3">Manage Products</Link>
        <Link to="/invoices" className="block bg-blue-500 text-white p-3 rounded">View Invoices</Link>
      </div>
    </div>
  );
};

export default Dashboard;
