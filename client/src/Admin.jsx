import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddUser from "./Pages/AddUser";

function Admin() {
  return (
    <div className="w-full h-screen p-3">
      <Navbar />
      <AddUser />
    </div>
  );
}

export default Admin;
