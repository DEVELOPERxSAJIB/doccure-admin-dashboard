import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import DataTables from "datatables.net-dt";
import PageTitle from "../../components/PageTitle/PageTitle";
import useAuthUserData from "../../hooks/useAuthUserData";
import useFormFeilds from "../../hooks/useFormFeilds";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUserPermission,
  setMessageEmpty,
} from "../../features/user/userSlice";
import { createToast } from "../../utils/toast";
import {
  createRole,
  deleteRole,
  updateRole,
  updateRoleStatus,
} from "../../features/user/userApiSlice";
import { timeAgo } from "../../helper/helper";
import swal from "sweetalert";

const Role = () => {
  const dispatch = useDispatch();

  // form feilds hook
  const { input, handleInputChange, resetForm } = useFormFeilds({
    name: "",
  });

  const { permission, role, message, error } =
    useSelector(getAllUserPermission);

  const [selected, setSelected] = useState([]);

  const handleCheckbox = (e) => {
    let val = e.target.value;
    const updateList = [...selected];

    if (selected.includes(val)) {
      updateList.splice(selected.indexOf(val), 1);
    } else {
      updateList.push(val);
    }

    setSelected(updateList);
  };

  const handleRoleFrom = (e) => {
    e.preventDefault();
    dispatch(
      createRole({
        name: input.name,
        permissions: [...selected],
      })
    );

    resetForm();
    setSelected([]);
  };

  // data show to edit modal
  const [roleEdit, setRoleEdit] = useState({});

  const handleEditRole = (id) => {
    const editData = role.find((data) => data._id === id);
    setRoleEdit(editData);
    setSelected(editData.permissions);
  };

  // role name change
  const handleRoleNameChange = (e) => {
    setRoleEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // update edit form
  const handleRoleUpdateFrom = (e) => {
    e.preventDefault();
    dispatch(
      updateRole({
        id: roleEdit._id,
        name: roleEdit.name,
        permissions: selected,
      })
    );
  };

  // delete role handaler
  const handleDeleteRole = (id) => {
    swal({
      title: "Are You Sure?",
      text: "This will delete your permission forever",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Deleted", {
          icon: "success",
        });
        dispatch(deleteRole(id));
      }
    });
  };

  const handleRoleStatus = (id, status) => {
    dispatch(updateRoleStatus({ id, status }));
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
  }, [message, error, dispatch]);

  const { user } = useAuthUserData();

  return (
    <>
      <PageTitle title={user?.name} breadcum={"Role"} />

      <ModalPopup target="roleModal">
        <form onSubmit={handleRoleFrom}>
          <div className="row form-row">
            <div className="col-12 col-sm-12">
              <div className="form-group">
                <label>
                  <h6>Role</h6>
                </label>
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <h6>Permission</h6>
              {permission?.map((item, index) => {
                return (
                  <label className="d-flex" style={{ gap: "5px" }} key={index}>
                    <input
                      type="checkbox"
                      checked={selected.includes(item.name)}
                      name={item.name}
                      value={item.name}
                      onChange={handleCheckbox}
                    />
                    {item.name}
                  </label>
                );
              })}
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Add Now
          </button>
        </form>
      </ModalPopup>

      <ModalPopup header={"Update Role"} target="roleEdit">
        <form onSubmit={handleRoleUpdateFrom}>
          <div className="row form-row">
            <div className="col-12 col-sm-12">
              <div className="form-group">
                <label>
                  <h6>Role</h6>
                </label>
                <input
                  type="text"
                  name="name"
                  value={roleEdit.name}
                  onChange={handleRoleNameChange}
                  className="form-control"
                />
              </div>
              <h6>Permission</h6>
              {permission?.map((item, index) => {
                return (
                  <label className="d-flex" style={{ gap: "5px" }} key={index}>
                    <input
                      type="checkbox"
                      checked={selected?.includes(item.name)}
                      name={item.name}
                      value={item.name}
                      onChange={handleCheckbox}
                    />
                    {item.name}
                  </label>
                );
              })}
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
            data-target="#roleModal"
            data-toggle="modal"
          >
            Add Role
          </button>
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                {role && (
                  <table className="datatable table table-striped table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th style={{ width: "150px" }}>No .</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Permissions</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...role]?.reverse().map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
                            <td>
                              {item.permissions.map((item, index) => {
                                return (
                                  <li key={index}>
                                    <span>{item}</span>;
                                  </li>
                                );
                              })}
                            </td>
                            <td>{timeAgo(item.createdAt)}</td>
                            <td>
                              {item._id !== "6503321ceeb65cc3d880930b" ? (
                                <>
                                  <div className="status-toggle">
                                    <input
                                      type="checkbox"
                                      id="status_1"
                                      className="check"
                                      checked={item.status ? true : false}
                                    />
                                    <label
                                      onClick={() =>
                                        handleRoleStatus(item._id, item.status)
                                      }
                                      htmlFor="status_1"
                                      className="checktoggle"
                                    >
                                      checkbox
                                    </label>
                                  </div>
                                </>
                              ) : (
                                "Default"
                              )}
                            </td>
                            <td className="text-right">
                              {item._id !== "6503321ceeb65cc3d880930b" ? (
                                <>
                                  <button
                                    className="mr-2 btn btn-sm btn-warning"
                                    data-toggle="modal"
                                    data-target="#roleEdit"
                                    onClick={() => handleEditRole(item._id)}
                                  >
                                    <i
                                      className="fe fe-edit"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                  <button
                                    className="mr-3 btn btn-sm btn-danger"
                                    onClick={() => handleDeleteRole(item._id)}
                                  >
                                    <i
                                      className="fe fe-trash"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                </>
                              ) : (
                                ""
                              )}
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

export default Role;
