import React, { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons
import AuthContext from "../../context/AuthContext";
import Header from "../../components/header/header";
import { ToastContainer, toast, Zoom } from "react-toastify";

const EditProfile = () => {
  const { currentUser, logout, updateProfile, changePassword } =
    useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username || "");
      setDescription(currentUser.description || "");
      setImage(currentUser.photo || null);
    }
  }, [currentUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!currentUser) return;

    const updatedProfile = {
      username,
      description,
      photo: image,
    };

    updateProfile(updatedProfile);
    toast.success("Profile updated successfully!", {
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
  };

  const handlePage = (page) => {
    if (page === "dashboard") {
      navigate("/dashboard");
    }
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.", {
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

    if (!currentPassword || !newPassword) {
      toast.error("Please fill in all fields.", {
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

    changePassword(currentPassword, newPassword);
    toast.success("Password updated successfully!", {
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
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <div className="editProfile-body">
        <h1>Edit Profile</h1>

        <div style={{ margin: "20px 0" }}>
          {image ? (
            <div>
              <img
                src={image}
                alt="User"
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              />
              <br />
              <button
                className="uploadImage"
                onClick={() => document.getElementById("fileInput").click()}
              >
                Change photo
              </button>
              <button className="removeImage" onClick={() => setImage(null)}>
                Remove photo
              </button>
            </div>
          ) : (
            <p>No image uploaded</p>
          )}
        </div>

        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

        <input
          type="text"
          className="input-text"
          value={username}
          placeholder="Edit your username"
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "10px", width: "100%", boxSizing: "border-box" }}
        />

        <textarea
          value={description}
          placeholder="Edit your description"
          className="input-textarea"
          onChange={(e) => setDescription(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            height: "100px",
            boxSizing: "border-box",
          }}
        />

        {/* Password Fields with Toggle Visibility */}
        <div style={{ position: "relative" }}>
          <input
            type={showCurrentPassword ? "text" : "password"}
            className="input-text"
            value={currentPassword}
            placeholder="Enter current password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={{ padding: "10px", width: "100%", boxSizing: "border-box" }}
          />
          <span
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "12px",
              cursor: "pointer",
            }}
          >
            {showCurrentPassword ? (
              <FaEyeSlash style={{ color: "#424242" }} />
            ) : (
              <FaEye style={{ color: "#424242" }} />
            )}
          </span>
        </div>
        <div style={{ position: "relative" }}>
          <input
            type={showNewPassword ? "text" : "password"}
            className="input-text"
            value={newPassword}
            placeholder="Enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ padding: "10px", width: "100%", boxSizing: "border-box" }}
          />
          <span
            onClick={() => setShowNewPassword(!showNewPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "12px",
              cursor: "pointer",
            }}
          >
            {showNewPassword ? (
              <FaEyeSlash style={{ color: "#424242" }} />
            ) : (
              <FaEye style={{ color: "#424242" }} />
            )}
          </span>
        </div>
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="input-text"
            value={confirmPassword}
            placeholder="Confirm new password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ padding: "10px", width: "100%", boxSizing: "border-box" }}
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "12px",
              cursor: "pointer",
            }}
          >
            {showConfirmPassword ? (
              <FaEyeSlash style={{ color: "#424242" }} />
            ) : (
              <FaEye style={{ color: "#424242" }} />
            )}
          </span>
        </div>

        <button onClick={handlePasswordChange} className="change-password">
          Change Password
        </button>

        <button onClick={handleSave} className="saveBtn">
          Save Changes
        </button>

        <button onClick={() => handlePage("dashboard")} className="cancelBtn">
          Cancel
        </button>
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

export default EditProfile;
