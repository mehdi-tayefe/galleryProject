import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext"; // Import the AuthContext
import "./CreatorProfile.css";
import Header from "../../components/header/header";
import { ToastContainer, toast, Zoom } from "react-toastify";

const CreatorProfile = () => {
  const { username } = useParams(); // Retrieve the username from the URL
  const [creatorImages, setCreatorImages] = useState([]);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [comments, setComments] = useState([]); // Store comments for the creator
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Makes the scrolling smooth
    });
  }, []);
  
  // Fetch images of the creator
  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("images")) || [];
    const creatorImages = storedImages.filter(
      (image) => image.username === username
    );
    setCreatorImages(creatorImages);
  }, [username]);

  // Fetch and update likes and comments from users data
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const selectedUser = users.find((user) => user.username === username);
    // Find comments for the creator's profile
    if (selectedUser && selectedUser.comments) {
      setComments(selectedUser.comments);
    }
    // Find the current user's like count for this creator's profile
    if (selectedUser && selectedUser.rating) {
      setRating(selectedUser.rating);
    }
  }, [username]);

  // Handle liking the profile and updating the like count in real-time
  const handleRating = (rate) => {
    setRating(rate);
    // Update the image rating in localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = storedUsers.map((user) =>
      user.username === username ? { ...user, rating: rate } : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handlePage = (page, username) => {
    if (page === "viewImage") {
      navigate(`/image/${username}`);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = () => {
    if (name.trim() && comment.trim()) {
      const newComment = {
        userName: name,
        comment: comment,
        date: new Date().toLocaleString(),
      };
      setComments([...comments, newComment]);
      setComment("");
      setName("");

      // Save new comment to localStorage
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = storedUsers.map((user) =>
        user.username === username
          ? { ...user, comments: [...comments, newComment] }
          : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      toast.success("Comment added successfully.", {
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
      toast.error("Please enter both your name and comment.", {
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
      <div className="creator-profile">
        <div className="creator-body">
          <div className="title-row">
            <h1>{username}</h1>
            {/* Star rating */}
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRating(star)}
                  style={{
                    cursor: "pointer",
                    color: star <= rating ? "gold" : "gray",
                    fontSize: "24px",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Display images by the creator */}
          <div className="creator-images">
            {creatorImages.length === 0 ? (
              <p>No images by this creator.</p>
            ) : (
              creatorImages.map((image, index) => (
                <div key={index} className="image-card">
                  <img
                    src={image.image}
                    alt={image.title}
                    className="image-thumbnail"
                  />
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                  <button
                    onClick={() => handlePage("viewImage", image.id)}
                    className="detailBtn view-detail-btn"
                  >
                    View Details
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Add Comment */}
          <div className="comment-section">
            <h3 style={{ color: "#7986cb" }}>Comments</h3>
            <div className="comments-body">
              {comments.length === 0 ? (
                <p style={{ color: "#9fa8da" }}>No comments yet.</p>
              ) : (
                comments.map((comment, index) => (
                  <div className="comment-item" key={index}>
                    <strong style={{ marginBottom: "10px", color: "#283593" }}>
                      {comment.userName}
                    </strong>{" "}
                    {comment.comment}
                  </div>
                ))
              )}
            </div>

            <div>
              <input
                type="text"
                className="input-text"
                style={{ width: "98%", height: "25px" }}
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
              />
            </div>

            <textarea
              value={comment}
              className="input-textarea"
              style={{ width: "100%" }}
              onChange={handleCommentChange}
              placeholder="Add a comment"
            />
            <button className="detailBtn" onClick={handleAddComment}>
              Add Comment
            </button>
          </div>
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

export default CreatorProfile;
