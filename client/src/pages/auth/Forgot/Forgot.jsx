import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo-white.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../../features/auth/authApiSlice";
import {
  getAuthData,
  makeMessageEmpty,
} from "../../../features/auth/authSlice";
import { createToast } from "../../../utils/toast";

const Forgot = () => {
  const dispatch = useDispatch();

  const { error, message } = useSelector(getAuthData);

  const [input, setInput] = useState({
    email: "",
  });

  const handleChangeInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handelForgetForm = (e) => {
    e.preventDefault();
    dispatch(forgetPassword(input));
  };

  useEffect(() => {
    if (error) {
      createToast(error, "info");
      dispatch(makeMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(makeMessageEmpty());
    }
  }, [error, message, dispatch]);

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
                  <h1>Forget Password?</h1>
                  <p className="account-subtitle">
                    Enter your E-mail and reset now
                  </p>

                  <form
                    onSubmit={handelForgetForm}
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
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Send
                      </button>
                    </div>
                  </form>

                  <div className="login-or">
                    <span className="or-line"></span>
                    <span className="span-or">or</span>
                  </div>

                  <div className="text-center dont-have">
                    Remember Password? <Link to="/login">Login</Link>
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

export default Forgot;
