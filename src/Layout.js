import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useSystem } from "./system/SystemContext";

const menu = [
{ name: "Dashboard", path: "/" },
{ name: "Patients", path: "/patients" },
{ name: "OPD", path: "/opd" },
{ name: "OPD Queue", path: "/opd-queue" },
{ name: "Billing", path: "/billing" },
{ name: "Pharmacy", path: "/pharmacy" },
{ name: "Laboratory", path: "/laboratory" },
{ name: "Expenses", path: "/expense" },
{ name: "Cash Closing", path: "/cash-closing" },
{ name: "Finance Report", path: "/finance-report" },
{ name: "Revenue Report", path: "/revenue-report" },
{ name: "Settings", path: "/settings" }
];

function Layout() {

const { hospital } = useSystem();

return (

<div style={{ display: "flex", height: "100vh" }}>

<div style={{ width: "220px", background: "#1f2937", color: "white", padding: "20px" }}>

<h2>Mediqliq</h2>

{menu.map((item) => (

<div key={item.path} style={{ margin: "10px 0" }}>

<Link to={item.path} style={{ color: "white", textDecoration: "none" }}>
{item.name}
</Link>

</div>

))}

</div>

<div style={{ flex: 1 }}>

<div style={{
background: "#f3f4f6",
padding: "10px 20px",
borderBottom: "1px solid #ddd"
}}>

<strong>
{hospital ? hospital.hospital_name : "Loading clinic..."}
</strong>

</div>

<div style={{ padding: "20px" }}>

<Outlet />

</div>

</div>

</div>

);

}

export default Layout;