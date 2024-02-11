import { Link } from "react-router-dom";
import smallLogo from "../../assets/img/logo-small.png";
import logo from "../../assets/img/logo.png";
import avatar from "../../assets/img/profiles/avatar-01.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/authApiSlice";
import { createToast } from "../../utils/toast";
import { useEffect } from "react";
import { makeMessageEmpty } from "../../features/auth/authSlice";

const Topbar = () => {
  const dispatch = useDispatch();

  const { message, user } = useSelector((state) => state.auth);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (message) {
      createToast(message, "success");
      dispatch(makeMessageEmpty());
    }
  }, [message, dispatch]);

  return (
    <>
      <div className="header">
        <div className="header-left">
          <Link href="index.html" className="logo">
            <img src={logo} alt="Logo" />
          </Link>
          <Link href="index.html" className="logo logo-small">
            <img src={smallLogo} alt="Logo" width="30" height="30" />
          </Link>
        </div>

        <a id="toggle_btn">
          <i className="fe fe-text-align-left"></i>
        </a>

        <div className="top-nav-search">
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Search here"
            />
            <button className="btn" type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>

        <a className="mobile_btn" id="mobile_btn">
          <i className="fa fa-bars"></i>
        </a>

        <ul className="nav user-menu">
          {/* <li className="nav-item dropdown noti-dropdown">
            <a
              href="#"
              className="dropdown-toggle nav-link"
              data-toggle="dropdown"
            >
              <i className="fe fe-bell"></i>{" "}
              <span className="badge badge-pill">3</span>
            </a>
            <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span className="notification-title">Notifications</span>
                <a href="#!" className="clear-noti">
                  {" "}
                  Clear All{" "}
                </a>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  <li className="notification-message">
                    <a href="#">
                      <div className="media">
                        <span className="avatar avatar-sm">
                          <img
                            className="avatar-img rounded-circle"
                            alt="User Image"
                            src={avatar}
                          />
                        </span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">Dr. Ruby Perrin</span>{" "}
                            Schedule{" "}
                            <span className="noti-title">her appointment</span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              4 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="#">
                      <div className="media">
                        <span className="avatar avatar-sm">
                          <img
                            className="avatar-img rounded-circle"
                            alt="User Image"
                            src={avatar}
                          />
                        </span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">Dr. Ruby Perrin</span>{" "}
                            Schedule{" "}
                            <span className="noti-title">her appointment</span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              4 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="#">
                      <div className="media">
                        <span className="avatar avatar-sm">
                          <img
                            className="avatar-img rounded-circle"
                            alt="User Image"
                            src={avatar}
                          />
                        </span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">Dr. Ruby Perrin</span>{" "}
                            Schedule{" "}
                            <span className="noti-title">her appointment</span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              4 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="notification-message">
                    <a href="#">
                      <div className="media">
                        <span className="avatar avatar-sm">
                          <img
                            className="avatar-img rounded-circle"
                            alt="User Image"
                            src={avatar}
                          />
                        </span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">Dr. Ruby Perrin</span>{" "}
                            Schedule{" "}
                            <span className="noti-title">her appointment</span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              4 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="topnav-dropdown-footer">
                <a href="#">View all Notifications</a>
              </div>
            </div>
          </li> */}

          <li className="nav-item dropdown has-arrow">
            <a
              href="#"
              className="dropdown-toggle nav-link"
              data-toggle="dropdown"
            >
              <span className="user-img">
                <img
                  className="rounded-circle"
                  src={
                    user?.photo
                      ? `http://localhost:4040/images/users/${user.photo}`
                      : `https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png`
                  }
                  width={40}
                  height={40}
                  alt="Ryan Taylor"
                />
              </span>
            </a>
            <div className="dropdown-menu">
              <div className="user-header">
                <Link to={"/profile"}>
                  <div className="avatar avatar-sm">
                    <img
                      src={
                        user?.photo
                          ? `http://localhost:4040/images/users/${user.photo}`
                          : `https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png`
                      }
                      alt={user?.name}
                      className="avatar-img rounded-circle"
                    />
                  </div>
                </Link>
                <div className="user-text">
                  <h6>{user?.name}</h6>
                  <p className="text-muted mb-0">{user?.role?.name}</p>
                </div>
              </div>
              <Link
                to={"/profile"}
                className="dropdown-item"
                href="profile.html"
              >
                My Profile
              </Link>
              <a
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
                className="dropdown-item"
              >
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Topbar;
