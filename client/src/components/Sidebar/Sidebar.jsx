import { Link, useLocation } from "react-router-dom";
import useAuthUserData from "../../hooks/useAuthUserData";

const Sidebar = () => {
  const location = useLocation();

  const { user } = useAuthUserData();

  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>

              {user?.role?.permissions?.includes("Dashboard") && (
                <li className={location.pathname === "/" ? "active" : ""}>
                  <Link to="/">
                    <i className="fe fe-home" aria-hidden="true"></i>{" "}
                    <span>Dashboard</span>
                  </Link>
                </li>
              )}
              <li className={location.pathname === "/profile" ? "active" : ""}>
                <Link to="/profile">
                  <i className="fe fe-user" aria-hidden="true"></i>{" "}
                  <span>My Profile</span>
                </Link>
              </li>

              {user?.role?.permissions?.includes("Products") && (
                <li
                  className={location.pathname === "/products" ? "active" : ""}
                >
                  <Link to="/products">
                    <i className="fe fe-hash"></i> <span>Products</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Categories") && (
                <li
                  className={location.pathname === "/category" ? "active" : ""}
                >
                  <Link to="/category">
                    <i className="fe fe-layout" aria-hidden="true"></i>{" "}
                    <span>Category</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Brands") && (
                <li className={location.pathname === "/brands" ? "active" : ""}>
                  <Link to="/brands">
                    <i className="fe fe-table"></i> <span>Brands</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Tags") && (
                <li className={location.pathname === "/tags" ? "active" : ""}>
                  <Link to="/tags">
                    <i className="fe fe-tag"></i> <span>Tags</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Users") && (
                <li className={location.pathname === "/user" ? "active" : ""}>
                  <Link to="/user">
                    <i className="fe fe-users" aria-hidden="true"></i>{" "}
                    <span>Users</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Roles") && (
                <li className={location.pathname === "/role" ? "active" : ""}>
                  <Link to="/role">
                    <i className="fe fe-vector"></i> <span>Role</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Permissions") && (
                <li
                  className={
                    location.pathname === "/permission" ? "active" : ""
                  }
                >
                  <Link to="/permission">
                    <i className="fe fe-lock" aria-hidden="true"></i>{" "}
                    <span>Permission</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
