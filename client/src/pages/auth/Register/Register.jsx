import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/img/logo-white.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  processRegister,
} from "../../../features/auth/authApiSlice";
import { createToast } from "../../../utils/toast";
import { makeMessageEmpty } from "../../../features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { error, message } = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChangeInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegisterFrom = (e) => {
    e.preventDefault();

    if (input.password !== input.cpassword) {
      return createToast("wrong Confirmation Password", "info");
    }

    dispatch(
      processRegister({
        name: input.name,
        email: input.email,
        password: input.password,
      })
    );
  };

  useEffect(() => {
    if (error) {
      createToast(error, "info");
      dispatch(makeMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(makeMessageEmpty());
      navigate("/login");
    }
  }, [error, message, dispatch, navigate]);

  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={logo} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Register</h1>
                  <p className="account-subtitle">Access to our dashboard</p>

                  <form
                    onSubmit={handleRegisterFrom}
                    action="https://dreamguys.co.in/demo/doccure/admin/login.html"
                  >
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={input.name}
                        onChange={handleChangeInput}
                      />
                    </div>
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
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Confirm Password"
                        name="cpassword"
                        value={input.cpassword}
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div className="form-group mb-0">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                  </form>

                  <div className="login-or">
                    <span className="or-line"></span>
                    <span className="span-or">or</span>
                  </div>

                  <div className="text-center dont-have">
                    Already have an account? <Link to="/login">Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
