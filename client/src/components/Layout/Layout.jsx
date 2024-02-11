import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";

const Layout = () => {
  return (
    <>
      <div className="main-wrapper">
        <Topbar />
        <Sidebar />

        <div className="page-wrapper">
          <div className="content container-fluid">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
