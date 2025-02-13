import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Header from "../../components/header/header";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons
import "./loginAndSignUp.css";
import { ToastContainer, toast, Zoom } from "react-toastify";

const Login = () => {
  const { currentUser, login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Redirect if the user is already logged in
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      toast.error("Invalid username or password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    }
  };

  return (
    <>
      <Header />
      <div className="register-body">
        <div className="register-card">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="register-form">
              <input
                type="text"
                className="input-text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"} // Toggle password visibility
                  className="input-text"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)} // Toggle the state
                >
                  {showPassword ? (
                    <FaEyeSlash
                      style={{ color: "#9e9e9e", fontSize: "20px" }}
                    />
                  ) : (
                    <FaEye style={{ color: "#9e9e9e", fontSize: "20px" }} />
                  )}{" "}
                  {/* Toggle between eye and eye-slash */}
                </span>
              </div>
              <button className="submitBtn" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Zoom}
      />
    </>
  );
};

export default Login;
