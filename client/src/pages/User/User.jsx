import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import DataTables from "datatables.net-dt";
import PageTitle from "../../components/PageTitle/PageTitle";
import useAuthUserData from "../../hooks/useAuthUserData";
import useFormFeilds from "../../hooks/useFormFeilds";
import { generateRandomPassword, timeAgo } from "../../helper/helper";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  deleteUser,
  updateUser,
  updateUserStatus,
} from "../../features/user/userApiSlice";
import { createToast } from "../../utils/toast";
import { setMessageEmpty } from "../../features/user/userSlice";
import swal from "sweetalert";

const User = () => {
  useEffect(() => {
    new DataTables(".datatable");
  });

  const dispatch = useDispatch();

  const { user: bradecumShow } = useAuthUserData();
  const { user, role, message, error } = useSelector((state) => state.user);

  const { input, setInput, handleInputChange, resetForm } = useFormFeilds({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const [edit, setEdit] = useState({
    name: "",
    password: "",
    role: "",
  });

  const handleRandomPassword = () => {
    setInput((prevState) => ({
      ...prevState,
      password: generateRandomPassword(20),
    }));
    setEdit((prevState) => ({
      ...prevState,
      password: generateRandomPassword(20),
    }));
  };

  const handleUserForm = (e) => {
    e.preventDefault();
    dispatch(createUser(input));
    resetForm();
  };

  const handleDeleteUser = (id) => {
    swal({
      title: "Are You Sure?",
      text: "This will delete your User forever",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Deleted", {
          icon: "success",
        });
        dispatch(deleteUser(id));
      }
    });
  };

  const handleStatusUpdate = (id, status) => {
    dispatch(updateUserStatus({ id, status }));
  };

  // update user onchange handaler
  const handleEditDataChange = (e) => {
    setEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // set previous user value and set them on form
  const handleEditUser = (id) => {
    const editData = user.find((data) => data._id === id);

    setEdit({ ...editData, password: null });
  };

  // update user
  const handleSubmitUserEditedForm = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: edit._id,
        name: edit.name,
        role: edit.role,
        password: edit.password,
      })
    );
  };

  useEffect(() => {
    if (error) {
      createToast(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }
  });

  return (
    <>
      <PageTitle title={bradecumShow?.name} breadcum={"user"} />

      <ModalPopup target="userModal">
        <form onSubmit={handleUserForm}>
          <div className="my-3">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="my-3">
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={input.email}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="my-3">
            <div className="form-group">
              <label>Role</label>
              <select
                name="role"
                value={setInput.role}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="">-SELECT-</option>
                {role?.map((item, index) => {
                  return (
                    <option value={item._id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="my-3">
            <div className="form-group">
              <label>Password</label>
              <input
                type="text"
                name="password"
                value={input.password}
                onChange={handleInputChange}
                className="form-control"
              />
              <a
                style={{ cursor: "pointer" }}
                onClick={handleRandomPassword}
                className="badge badge-danger text-light"
              >
                Random Password
              </a>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Add New User
          </button>
        </form>
      </ModalPopup>

      <ModalPopup header={"Update User"} target="userEditModal">
        <form onSubmit={handleSubmitUserEditedForm}>
          <div className="my-3">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={edit.name}
                onChange={handleEditDataChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="my-3">
            <div className="form-group">
              <label>Role</label>
              <select
                name="role"
                value={edit.role}
                onChange={handleEditDataChange}
                className="form-control"
              >
                <option value="">-SELECT-</option>
                {role?.map((item, index) => {
                  return (
                    <>
                      <option value={item._id} key={index}>
                        {item.name}
                      </option>
                    </>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="my-3">
            <div className="form-group">
              <label>Password</label>
              <input
                type="text"
                name="password"
                value={edit.password}
                onChange={handleEditDataChange}
                className="form-control"
              />
              <a
                style={{ cursor: "pointer" }}
                onClick={handleRandomPassword}
                className="badge badge-danger text-light"
              >
                Random Password
              </a>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Update User
          </button>
        </form>
      </ModalPopup>

      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-primary mb-4"
            data-target="#userModal"
            data-toggle="modal"
          >
            Add new user
          </button>
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                {user && (
                  <table className="datatable table table-striped table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item?.role?.name}</td>
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
                                    handleStatusUpdate(item._id, item.status)
                                  }
                                  htmlFor="status_1"
                                  className="checktoggle"
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <td className="text-right">
                              {item.role?._id !==
                                "64cc24755510117318a88adb" ? (
                                <>
                                  <button
                                    className="mr-2 btn btn-sm btn-warning"
                                    data-toggle="modal"
                                    data-target="#userEditModal"
                                    onClick={() => handleEditUser(item._id)}
                                  >
                                    <i
                                      className="fe fe-edit"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteUser(item._id)}
                                    className="mr-3 btn btn-sm btn-danger"
                                  >
                                    <i
                                      className="fe fe-trash"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                </>
                              ) : <b>No Actions</b>}
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

export default User;
