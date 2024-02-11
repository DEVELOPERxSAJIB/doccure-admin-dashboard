import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/img/logo-white.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUserPassword } from "../../../features/auth/authApiSlice";
import {
  getAuthData,
  makeMessageEmpty,
} from "../../../features/auth/authSlice";
import { createToast } from "../../../utils/toast";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const { message, error } = useSelector(getAuthData);

  const [input, setInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const dataOptions = {
    token,
    newPassword: input.newPassword,
    confirmPassword: input.confirmPassword,
  };

  const handleResetPasswordForm = (e) => {
    e.preventDefault();
    dispatch(resetUserPassword(dataOptions));
  };

  useEffect(() => {
    if (error) {
      createToast(error, "error");
      dispatch(makeMessageEmpty());
    } else if (message) {
      createToast(message, "success");
      dispatch(makeMessageEmpty());
      navigate("/login")
    }
  }, [error, message, navigate, dispatch]);

  return (
    <div className="main-wrapper login-body">
      <div className="login-wrapper">
        <div className="container">
          <div className="loginbox">
            <div className="login-left">
              <img className="img-fluid" src={logo} alt="Logo" />
            </div>
            <div className="login-right">
              <div className="login-right-wrap">
                <h1>Reset Password</h1>
                <p className="account-subtitle">Access to our dashboard</p>

                <form
                  onSubmit={handleResetPasswordForm}
                  action="https://dreamguys.co.in/demo/doccure/admin/index.html"
                >
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Password"
                      name="newPassword"
                      value={input.newPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={input.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary btn-block" type="submit">
                      Reset
                    </button>
                  </div>
                </form>

                <div className="login-or">
                  <span className="or-line"></span>
                  <span className="span-or">or</span>
                </div>

                <div className="text-center dont-have">
                  Don’t have an account? <Link to="/register">Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
