import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ImageDetails.css";
import Header from "../../components/header/header";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { IoIosArrowBack } from "react-icons/io";

const ImageDetails = () => {
  const { id } = useParams(); // Get the image id from the URL params
  const [image, setImage] = useState(null);
  const [rating, setRating] = useState(0); // Rating state
  const [comment, setComment] = useState(""); // Comment state
  const [name, setName] = useState(""); // Commenter's name state
  const [comments, setComments] = useState([]); // Comments list
  const [user, setUser] = useState();

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("images")) || [];
    const selectedImage = storedImages.find((img) => img.id === parseInt(id));
    setImage(selectedImage);

    // Load existing comments for the image
    if (selectedImage && selectedImage.comments) {
      setComments(selectedImage.comments);
    }
    if (selectedImage && selectedImage.rating) {
      setRating(selectedImage.rating);
    }
  }, [id]);

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("images")) || [];
    const selectedImage = storedImages.find((img) => img.id === parseInt(id));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // eslint-disable-next-line array-callback-return
    users.map((user) => {
      if (user.username === selectedImage.username) {
        setUser(user);
      }
    });
  }, [id, image, user]);

  const handleRating = (rate) => {
    setRating(rate);
    // Update the image rating in localStorage
    const storedImages = JSON.parse(localStorage.getItem("images")) || [];
    const updatedImages = storedImages.map((img) =>
      img.id === parseInt(id) ? { ...img, rating: rate } : img
    );
    localStorage.setItem("images", JSON.stringify(updatedImages));
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddComment = () => {
    if (name.trim() && comment.trim()) {
      const newComment = {
        name: name,
        text: comment,
        date: new Date().toLocaleString(),
      };
      setComments([...comments, newComment]);
      setComment("");
      setName("");

      // Save new comment to localStorage
      const storedImages = JSON.parse(localStorage.getItem("images")) || [];
      const updatedImages = storedImages.map((img) =>
        img.id === parseInt(id)
          ? { ...img, comments: [...comments, newComment] }
          : img
      );
      localStorage.setItem("images", JSON.stringify(updatedImages));
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

  if (!image) {
    return <p>Image not found!</p>;
  }

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <button className="backBtn" onClick={handleBack}>
        <IoIosArrowBack style={{color: '#e8eaf6', fontSize: '16px', marginRight: '10px'}} />
        back
      </button>
      <div className="detail-body">
        <div className="title-row">
          <h1>{image.title}</h1>
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
        <img className="detailImge" src={image.image} alt={image.title} />
        <div className="creator-details">
          <img className="creatorImg" src={user.photo} alt={user.username} />
          <button>{image.username}</button>
        </div>

        <p className="imageDesc">{image.description}</p>

        {/* Comments */}
        <div className="comment-section">
          <h3 style={{ color: "#7986cb" }}>Comments</h3>
          <div className="comments-body">
            {comments.length === 0 ? (
              <p style={{ color: "#9fa8da" }}>No comments yet.</p>
            ) : (
              comments.map((comment, index) => (
                <div className="comment-item" key={index}>
                  <strong style={{ marginBottom: "10px", color: "#283593" }}>
                    {comment.name}
                  </strong>{" "}
                  {comment.text}
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

export default ImageDetails;
