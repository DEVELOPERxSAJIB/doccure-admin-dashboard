import { useEffect } from "react";
import DataTable from "datatables.net-dt";
import PageTitle from "../../components/PageTitle/PageTitle";
import useAuthUserData from "../../hooks/useAuthUserData";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const users = useSelector((state) => state.user);
  const product = useSelector((state) => state.product);

  useEffect(() => {
    new DataTable(".datatable");
  });

  const { user } = useAuthUserData();

  return (
    <>
      <PageTitle title={user.name} breadcum={"Dashboard"} />
      <div className="row">
        <div className="col-xl-3 col-sm-6 col-12">
          <div
            className="card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/user")}
          >
            <div className="card-body">
              <div className="dash-widget-header">
                <span className="dash-widget-icon text-primary border-primary">
                  <i className="fe fe-users"></i>
                </span>
                <div className="dash-count">
                  <h3>{users?.user?.length}</h3>
                </div>
              </div>
              <div className="dash-widget-info">
                <h6 className="text-muted">Users</h6>
                <div className="progress progress-sm">
                  <div className="progress-bar bg-primary w-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div             className="card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/products")}>
            <div className="card-body">
              <div className="dash-widget-header">
                <span className="dash-widget-icon text-success">
                  <i className="fe fe-credit-card"></i>
                </span>
                <div className="dash-count">
                  <h3>1</h3>
                </div>
              </div>
              <div className="dash-widget-info">
                <h6 className="text-muted">Products</h6>
                <div className="progress progress-sm">
                  <div className="progress-bar bg-success w-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div
            className="card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/brands")}
          >
            <div className="card-body">
              <div className="dash-widget-header">
                <span className="dash-widget-icon text-danger border-danger">
                  <i className="fe fe-money"></i>
                </span>
                <div className="dash-count">
                  <h3>{product?.brand?.length}</h3>
                </div>
              </div>
              <div className="dash-widget-info">
                <h6 className="text-muted">Brands</h6>
                <div className="progress progress-sm">
                  <div className="progress-bar bg-danger w-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div
            className="card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/category")}
          >
            <div className="card-body">
              <div className="dash-widget-header">
                <span className="dash-widget-icon text-warning border-warning">
                  <i className="fe fe-folder"></i>
                </span>
                <div className="dash-count">
                  <h3>{product?.category?.length}</h3>
                </div>
              </div>
              <div className="dash-widget-info">
                <h6 className="text-muted">Categories</h6>
                <div className="progress progress-sm">
                  <div className="progress-bar bg-warning w-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
