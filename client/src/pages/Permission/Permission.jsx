import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import DataTables from "datatables.net-dt";
import PageTitle from "../../components/PageTitle/PageTitle";
import useAuthUserData from "../../hooks/useAuthUserData";
import { useDispatch, useSelector } from "react-redux";
import {
  createPermission,
  deletePermission,
  updatePermissionStatus,
} from "../../features/user/userApiSlice";
import {
  getAllUserPermission,
  setMessageEmpty,
} from "../../features/user/userSlice";
import { createToast } from "../../utils/toast";
import swal from "sweetalert";
import { timeAgo } from "../../helper/helper";

const Permission = () => {
  const dispatch = useDispatch();

  const { user } = useAuthUserData();
  const { permission, error, message } = useSelector(getAllUserPermission);

  const [input, setInput] = useState({
    name: "",
  });

  const handleChangeInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePermissionForm = (e) => {
    e.preventDefault();
    dispatch(createPermission(input));
    setInput({
      name: "",
    });
  };

  const handleDeletePerm = (id) => {
    swal({
      title: "Are You Sure?",
      text: "This will delete your permission forever",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Deleting . . .", {
          icon: "success",
        });
        dispatch(deletePermission(id));
      }
    });
  };

  const handlePermissionStatus = (status, id) => {
    dispatch(updatePermissionStatus({ status, id }));
  };

  useEffect(() => {
    new DataTables(".datatable");
    if (error) {
      createToast(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch]);

  return (
    <>
      <PageTitle title={user?.name} breadcum={"Permissions"} />

      <ModalPopup target="permissionModal">
        <form onSubmit={handlePermissionForm}>
          <div className="row form-row">
            <div className="col-12 col-sm-12">
              <div className="form-group">
                <label>Permissions</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={input.name}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Add Now
          </button>
        </form>
      </ModalPopup>

      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-primary mb-4"
            data-target="#permissionModal"
            data-toggle="modal"
          >
            Add new Permission
          </button>
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                {permission && (
                  <table className="datatable table table-striped table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th style={{ width: "150px" }}>No .</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...permission].reverse().map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
                            <td>{timeAgo(item.createdAt)}</td>
                            <td>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                  checked={item.status ? true : false}
                                />
                                <label
                                  onClick={() =>
                                    handlePermissionStatus(
                                      item.status,
                                      item._id
                                    )
                                  }
                                  htmlFor="status_1"
                                  className="checktoggle"
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <td className="text-right">
                              <button
                                onClick={() => handleDeletePerm(item._id)}
                                className="mr-3 btn btn-sm btn-danger"
                              >
                                <i
                                  className="fe fe-trash"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Permission;
