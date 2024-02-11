import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/img/logo-white.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, verifyUser } from "../../../features/auth/authApiSlice";
import { createToast } from "../../../utils/toast";
import {
  getAuthData,
  makeMessageEmpty,
} from "../../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, message } = useSelector(getAuthData);
  
  if (error) {
    createToast(error, "error");
    dispatch(makeMessageEmpty());
  }
  if (message) {
    createToast(message, "success");
    dispatch(makeMessageEmpty());
  }

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChangeInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginForm = (e) => {
    e.preventDefault();
    dispatch(loginUser(input));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }

    if (token) {
      dispatch(verifyUser({ token }));
      createToast(message, "success");
      dispatch(makeMessageEmpty());
    }
  }, []);

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
                <h1>Login</h1>
                <p className="account-subtitle">Access to our dashboard</p>

                <form
                  onSubmit={handleLoginForm}
                  action="https://dreamguys.co.in/demo/doccure/admin/index.html"
                >
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={input.email}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Password"
                      name="password"
                      value={input.password}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary btn-block" type="submit">
                      Login
                    </button>
                  </div>
                </form>

                <div className="text-center forgotpass">
                  <Link to="/forgot">Forgot Password?</Link>
                </div>
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

export default Login;
