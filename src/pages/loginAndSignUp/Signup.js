import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Header from "../../components/header/header";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import "./loginAndSignUp.css";
import { ToastContainer, toast, Zoom } from "react-toastify";

const Signup = () => {
  const { currentUser, register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password field
  const [photo, setPhoto] = useState(null); // For user profile photo
  const [description, setDescription] = useState(""); // For user description
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle confirm password visibility

  // Redirect if the user is already logged in
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  const handleSignup = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
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
      return;
    }

    // Check if username, password, and description are provided
    if (!username || !password || !confirmPassword || !description) {
      toast.error("All fields are required", {
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
      return;
    }

    // Check if profile photo is uploaded
    if (!photo) {
      toast.error("Profile photo is required", {
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
      return;
    }

    // Convert photo to a base64 string if provided
    if (photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoBase64 = reader.result; // Base64 string of the image
        processSignup(photoBase64);
      };
      reader.readAsDataURL(photo);
    } else {
      processSignup(null);
    }
  };

  const processSignup = async (photoBase64) => {
    try {
      // Call the register function from context
      const success = await register(username, password, photoBase64, description);
      if (success) {
        toast.success("Signup successful! You can now log in.", {
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
      } else {
        toast.error("Username already exists", {
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
    } catch (error) {
      toast.error("Signup failed. Please try again later.", {
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
      console.error("Signup error:", error);
    }
  };

  const handleRemoveImage = () => {
    setPhoto(null); // Remove image
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file); // Store the selected image file
    }
  };

  return (
    <>
      <Header />
      <div className="register-body">
        <div className="register-card">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <div className="register-form-long">
              {/* Image upload and preview */}
              <div className="image-upload">
                {photo && (
                  <div className="image-preview">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="preview"
                      className="preview-img"
                    />
                    <button
                      type="button"
                      className="remove-img-btn"
                      onClick={handleRemoveImage}
                    >
                      <MdDelete style={{ color: "#fff", fontSize: "20px" }} />
                    </button>
                  </div>
                )}
                {!photo && (
                  <div className="column-upload">
                    <FaCircleUser
                      style={{ color: "#9e9e9e", fontSize: "80px" }}
                    />
                    <label htmlFor="file-upload" className="add-img-btn">
                      Add Image
                    </label>
                  </div>
                )}
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="input-file"
                  required
                />
              </div>

              {/* Username */}
              <input
                type="text"
                placeholder="Username"
                className="input-text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <div className="password-row">
                {/* Password */}
                <div className="password-container-signup">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input-text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="toggle-password pass-signup"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash
                        style={{ color: "#9e9e9e", fontSize: "15px" }}
                      />
                    ) : (
                      <FaEye style={{ color: "#9e9e9e", fontSize: "15px" }} />
                    )}
                  </span>
                </div>

                {/* Confirm Password */}
                <div className="password-container-signup">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="input-text"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span
                    className="toggle-password pass-signup"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash
                        style={{ color: "#9e9e9e", fontSize: "15px" }}
                      />
                    ) : (
                      <FaEye style={{ color: "#9e9e9e", fontSize: "15px" }} />
                    )}
                  </span>
                </div>
              </div>

              {/* Description */}
              <textarea
                placeholder="Description"
                className="input-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required // Marked as required
              ></textarea>

              <button className="submitBtn" type="submit">
                Signup
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

export default Signup;
