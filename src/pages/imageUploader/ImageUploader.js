import React, { useState, useContext, useEffect } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./ImageUploader.css";
import Header from "../../components/header/header";
import { ToastContainer, toast, Zoom } from "react-toastify";

const ImageUploader = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userImages, setUserImages] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const images = JSON.parse(localStorage.getItem("images")) || [];
      const userUploadedImages = images.filter(
        (image) => image.userId === currentUser.id
      );
      setUserImages(userUploadedImages);
    }
  }, [currentUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!currentUser) {
      toast.error("You must be logged in to upload an image.", {
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
    if (!image) {
      toast.error("Please select an image to upload.", {
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
    if (!title) {
      toast.error("Please provide a title for the image.", {
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
    if (!description) {
      toast.error("Please provide a description for the image.", {
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

    try {
      const newImage = {
        id: Date.now(),
        image,
        title,
        description,
        userId: currentUser.id,
        username: currentUser.username,
      };

      const existingImages = JSON.parse(localStorage.getItem("images")) || [];
      existingImages.push(newImage);
      localStorage.setItem("images", JSON.stringify(existingImages));

      setTitle("");
      setDescription("");
      setImage(null);
      setFileName("No selected file");

      // Set success message
      toast.success("Image uploaded successfully!", {
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

      // Navigate after success
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      toast.error("An error occurred while uploading the image. Please try again.", {
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
      <div className="upload-body">
        <h1>Upload Image</h1>
        <main>
          <form
            className="uploadFile"
            onClick={() => document.querySelector(".input-field").click()}
          >
            <input
              type="file"
              accept="image/*"
              className="input-field"
              hidden
              onChange={handleImageChange}
            />

            {image ? (
              <img className="upload-image" src={image} alt={fileName} />
            ) : (
              <>
                <MdCloudUpload color="#3f51b5" size={60} />
                <p>Browse Files to upload</p>
              </>
            )}
          </form>

          <section className="uploaded-row">
            <AiFillFileImage color="#3f51b5" size={25} />
            <span className="upload-content">
              {fileName}
              <MdDelete
                onClick={() => {
                  setFileName("No selected file");
                  setImage(null);
                }}
                size={20}
                color="#d32f2f"
                style={{ marginLeft: "10px" }}
              />
            </span>
          </section>
        </main>

        <form>
          <input
            type="text"
            className="input-text"
            style={{ width: "98%", height: "30px", marginTop: "20px" }}
            value={title}
            placeholder="Enter image title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            className="input-textarea"
            style={{ width: "100%" }}
            placeholder="Enter image description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="detailBtn"
            style={{ fontSize: "18px" }}
            onClick={handleSubmit}
            type="submit"
          >
            Upload
          </button>
        </form>
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

export default ImageUploader;
