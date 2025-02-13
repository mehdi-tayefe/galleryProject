import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { MdDeleteForever } from "react-icons/md";
import "./Dashboard.css";
import Header from '../../components/header/header';

const Dashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [userImages, setUserImages] = useState([]);
  const [editingImage, setEditingImage] = useState(null); // Track the image being edited
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      // Fetch images from localStorage
      const images = JSON.parse(localStorage.getItem("images")) || [];

      // Filter images by the current user's ID
      const userUploadedImages = images.filter(
        (image) => image.userId === currentUser.id
      );

      // Update state with user images
      setUserImages(userUploadedImages);
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Remove image from localStorage and state
  const handleRemoveImage = (imageId) => {
    const updatedImages = userImages.filter((image) => image.id !== imageId);
    localStorage.setItem("images", JSON.stringify(updatedImages)); // Update localStorage
    setUserImages(updatedImages); // Update state
  };

  // Handle start editing an image
  const handleEditImage = (image) => {
    setEditingImage(image);
    setNewTitle(image.title);
    setNewDescription(image.description);
  };

  // Handle save changes after editing
  const handleSaveEdit = () => {
    const updatedImages = userImages.map((image) =>
      image.id === editingImage.id
        ? { ...image, title: newTitle, description: newDescription }
        : image
    );
    localStorage.setItem("images", JSON.stringify(updatedImages)); // Update localStorage
    setUserImages(updatedImages); // Update state
    setEditingImage(null); // Reset editing mode
  };

  const handlePage = (page, username) => {
    if (page === "edit") {
      navigate("/profile");
    } else if (page === "view") {
      navigate(`/creator-profile/${username}`);
    } else if (page === "upload") {
      navigate("/upload");
    } else if (page === "viewImage") {
      navigate(`/image/${username}`);
    }
  };

  return (
    <>
    <Header />
      <div className="dashboard-body">
        <h1>Welcome, {currentUser.username}</h1>
        <div className="dashboard-profile">
          <div className="dashboard-profile-row">
            <img
              src={currentUser.photo}
              alt={currentUser.username}
              className="dashboard-profile-photo"
            />

            <div className="dashboard-profile-texts">
              <h2>{currentUser.username}</h2>
              <p>{currentUser.description}</p>
            </div>
          </div>

          <div className="dashboard-profile-btns">
            <button
              onClick={() => handlePage("edit", "")}
              className="outlineProfileBtn"
            >
              Edit Profile
            </button>
            <button
              onClick={() => handlePage("view", currentUser.username)}
              className="backgroundProfileBtn"
            >
              View Profile
            </button>
          </div>
        </div>

        {/* Display user-uploaded images */}
        <div className="dashboard-upload-body">
          <button
            onClick={() => handlePage("upload", "")}
            className="uploadBtn"
          >
            Upload Image
          </button>
        </div>

        <div className="dashboard-title">
          <h2>Your Uploaded Images</h2>
        </div>
        {userImages.length > 0 ? (
          <div className="images-body">
            {userImages.map((image) =>
              currentUser.username === image.username ? (
                <div
                  className="image-item"
                  key={image.id}
                  style={{ marginBottom: "20px" }}
                >
                  <img src={image.image} alt={image.title} />
                  <div>
                    <h3>{image.title}</h3>
                    <p>{image.description}</p>

                    {/* Edit button */}
                    <button
                      className="editBtn"
                      onClick={() => handleEditImage(image)}
                    >
                      Edit
                    </button>

                    <button
                      className="viewBtn"
                      onClick={() => handlePage("viewImage", image.id)}
                    >
                      View
                    </button>

                    {/* Remove button */}
                    <button
                      className="removeBtn"
                      onClick={() => handleRemoveImage(image.id)}
                    >
                      <MdDeleteForever
                        style={{ fontSize: "25px", color: "red" }}
                      />
                    </button>
                  </div>

                  {/* Edit Image Form */}
                  {editingImage?.id === image.id && (
                    <div className="edit-image-form">
                      <h3>Edit Details</h3>
                      <form onSubmit={(e) => e.preventDefault()}>
                        <input
                          type="text"
                          className="edit-image-input"
                          value={newTitle}
                          placeholder="Edit image title"
                          onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <textarea
                          value={newDescription}
                          className="edit-image-textarea"
                          placeholder="Edit image description"
                          onChange={(e) => setNewDescription(e.target.value)}
                        />
                        <button className="edit-detail-save" onClick={handleSaveEdit}>Save</button>
                        <button className="edit-detail-cancel" onClick={() => setEditingImage(null)}>
                          Cancel
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              ) : null
            )}
          </div>
        ) : (
          <p>No images uploaded yet.</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
