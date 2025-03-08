import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const role = useSelector((state) => state.auth.role);

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link to="/">Home</Link>

      {role === "admin" && <Link to="/admin">Admin Panel</Link>}
      {role === "store_owner" && <Link to="/store-dashboard">Store Dashboard</Link>}
      {role === "customer" && <Link to="/orders">My Orders</Link>}

      <Link to="/logout">Logout</Link>
    </nav>
  );
};

export default Navbar;
