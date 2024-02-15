import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle/PageTitle";
import { useEffect, useState } from "react";
import {
  getLoggedInUserData,
  updateSingleUser,
  updateUserPasswrod,
} from "../../features/auth/authApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { createToast } from "../../utils/toast";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, message, loader } = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdatePasswordForm = (e) => {
    e.preventDefault();
    dispatch(updateUserPasswrod(input));
  };

  // Data Editing Starts
  const [modalInput, setmodalInput] = useState({
    name: "",
    gender: "",
    birthDate: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });

  // for photo
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleModalInputChange = (e) => {
    setmodalInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditForm = (e) => {
    e.preventDefault();

    const form_data = new FormData();

    form_data.append("photo", photo);
    form_data.append("name", modalInput.name);
    form_data.append("gender", modalInput.gender);
    form_data.append("birthDate", modalInput.birthDate);
    form_data.append("mobile", modalInput.mobile);
    form_data.append("address", modalInput.address);
    form_data.append("city", modalInput.city);
    form_data.append("state", modalInput.state);
    form_data.append("country", modalInput.country);
    form_data.append("zipcode", modalInput.zipcode);

    dispatch(updateSingleUser(form_data)).then((res) => {
      dispatch(getLoggedInUserData())
    });
  };

  useEffect(() => {
    if (error) {
      createToast(error, "error");
    }
    if (message) {
      createToast(message, "success");
    }
    if (user) {
      createToast(message, "success");
    }
    if (!user) {
      navigate("/login");
    }
  }, [error, message, user, navigate]);

  useEffect(() => {
    setmodalInput({
      ...user,
    });
  }, [user]);

  return (
    <>
      <PageTitle title={user.name} breadcum={"profile"} />

      {loader ? (
        "Loading..."
      ) : (
        <div className="row">
          <div className="col-md-12">
            <div className="profile-header">
              <div className="row align-items-center">
                <div className="col-auto profile-image">
                  <img
                    alt="User Image"
                    src={
                      user?.photo
                        ? `http://localhost:4040/images/users/${user.photo}`
                        : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
                    }
                  />
                  <Link to={"/profile"}></Link>
                </div>
                <div className="col ml-md-n2 profile-user-info">
                  <h4 className="user-name mb-0">{user?.name}</h4>
                  <h6 className="text-muted">{user?.email}</h6>
                  <div className="user-Location">
                    <i className="fa fa-map-marker"></i>
                    {user?.city} {user?.country}
                  </div>
                  <div className="about-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </div>
                </div>
                <div className="col-auto profile-btn">
                  {/* <a href="#" className="btn btn-primary">
                  Edit
                </a> */}
                </div>
              </div>
            </div>
            <div className="profile-menu">
              <ul className="nav nav-tabs nav-tabs-solid">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#per_details_tab"
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#password_tab"
                  >
                    Password
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content profile-tab-cont">
              <div className="tab-pane fade show active" id="per_details_tab">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title d-flex justify-content-between">
                          <span>Personal Details</span>
                          <a
                            className="edit-link"
                            data-toggle="modal"
                            href="#edit_personal_details"
                          >
                            <i className="fa fa-edit mr-1"></i>Edit
                          </a>
                        </h5>
                        <div className="row">
                          <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                            Name
                          </p>
                          <p className="col-sm-10">{user?.name}</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                            Date of Birth
                          </p>
                          <p className="col-sm-10">{user?.birthDate}</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                            Gender
                          </p>
                          <p className="col-sm-10">{user?.gender}</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                            Mobile
                          </p>
                          <p className="col-sm-10">{user?.mobile}</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted text-sm-right mb-0">
                            Address
                          </p>
                          <p className="col-sm-10 mb-0">
                            {user?.address}
                            <br />
                            {user?.city}
                            <br />
                            {user?.state}
                            {user?.zipcode}
                            <br />
                            {user?.country}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="password_tab" className="tab-pane fade">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Change Password</h5>
                    <div className="row">
                      <div className="col-md-10 col-lg-6">
                        <form onSubmit={handleUpdatePasswordForm}>
                          <div className="form-group">
                            <label>Old Password</label>
                            <input
                              name="oldPassword"
                              value={input.oldPassword}
                              onChange={handleInputChange}
                              type="password"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group">
                            <label>New Password</label>
                            <input
                              name="newPassword"
                              value={input.newPassword}
                              onChange={handleInputChange}
                              type="password"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                              type="password"
                              name="confirmPassword"
                              value={input.confirmPassword}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          </div>
                          <button className="btn btn-primary" type="submit">
                            Save Changes
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}

      <div
        className="modal fade"
        id="edit_personal_details"
        aria-hidden="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Personal Details</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditForm}>
                <div className="row form-row">
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={modalInput.name}
                        name="name"
                        onChange={handleModalInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>Photo</label>
                      <input
                        type="file"
                        name="photo"
                        className="form-control"
                        onChange={handlePhotoChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <div className="cal-icon">
                        <input
                          type="text"
                          className="form-control"
                          name="birthDate"
                          value={modalInput.birthDate}
                          onChange={handleModalInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>Gender</label>
                      <select
                        name="gender"
                        value={modalInput.gender}
                        onChange={handleModalInputChange}
                        id=""
                        className="form-control"
                      >
                        <option value="undifined">-select-</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>Mobile</label>
                      <input
                        type="text"
                        name="mobile"
                        value={modalInput.mobile}
                        onChange={handleModalInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <h5 className="form-title">
                      <span>Address</span>
                    </h5>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={modalInput.address}
                        onChange={handleModalInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={modalInput.city}
                        onChange={handleModalInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={modalInput.state}
                        onChange={handleModalInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>Zip Code</label>
                      <input
                        type="number"
                        className="form-control"
                        name="zipcode"
                        value={modalInput.zipcode}
                        onChange={handleModalInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label>Country</label>
                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        value={modalInput.country}
                        onChange={handleModalInputChange}
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
