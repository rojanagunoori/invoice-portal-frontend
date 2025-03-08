import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const role = useSelector((state) => state.auth.role);

  const menuItems = [
    { path: "/", label: "Dashboard", roles: ["admin", "store_owner", "customer"] },
    { path: "/orders", label: "Orders", roles: ["customer"] },
    { path: "/manage-stores", label: "Manage Stores", roles: ["admin"] },
    { path: "/manage-products", label: "Manage Products", roles: ["store_owner"] },
    { path: "/invoices", label: "Invoices", roles: ["admin", "store_owner"] },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul>
        {menuItems.map(
          (item) =>
            item.roles.includes(role) && (
              <li key={item.path} className="p-2 hover:bg-gray-700">
                <Link to={item.path}>{item.label}</Link>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
