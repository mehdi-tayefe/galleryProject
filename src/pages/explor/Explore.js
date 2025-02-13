import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Explor.css";
import Header from "../../components/header/header";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Avatar from "@mui/material/Avatar";
import Loading from "../../components/loading/loading";

const Explore = () => {
  const [images, setImages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [loadingPage, setLoadingPage] = useState(true); // Loading page
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // Check if data has already been added to localStorage
      const isDataAdded = localStorage.getItem("dataAdded");

      if (!isDataAdded) {
        const storedImages = JSON.parse(localStorage.getItem("images")) || [];
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Combine default data with stored data
        const updatedImages = [...storedImages, ...imagesData];
        const updatedUsers = [...storedUsers, ...usersData];

        // Update state
        setImages(updatedImages);
        setUsers(updatedUsers);

        // Store updated data back into localStorage
        localStorage.setItem("images", JSON.stringify(updatedImages));
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // Set flag to indicate data has been added
        localStorage.setItem("dataAdded", "true");
      } else {
        // If data already added, load it from localStorage
        setImages(JSON.parse(localStorage.getItem("images")) || []);
        setUsers(JSON.parse(localStorage.getItem("users")) || []);
      }
    } catch (e) {
      setError("Failed to load images");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setLoadingPage(false);
      }, 1200);
    }
  }, []);

  const handleActions = (action, id) => {
    if (action === "profile") {
      navigate(`/creator-profile/${id}`);
    } else if (action === "details") {
      navigate(`/image/${id}`);
    }
  };

  if (loading) {
    return <p>Loading images...</p>; // Show loading state
  }

  if (error) {
    return <p>{error}</p>; // Show error message
  }

  return (
    <>
      {loadingPage ? (
        <Loading size={100} gradientStart="#FF5733" gradientEnd="#33FFCE" />
      ) : (
        <>
          <Header />
          <div>
            <ImageList variant="masonry" cols={3} gap={1}>
              {[...images].reverse().map((image, index) => (
                <div loading="lazy" className="container" key={index}>
                  <div className="gradient">
                    <ImageListItem>
                      <img
                        srcSet={image.image}
                        src={image.image}
                        alt={image.title}
                      />
                      <button
                        onClick={() => handleActions("profile", image.username)}
                        className="profileViewBtn"
                      >
                        <div className="profileViewRow">
                          {users
                            .filter((u) => u.username === image.username)
                            .map((user) => (
                              <Avatar
                                key={user.username}
                                sx={{ width: 30, height: 30 }}
                                alt={image.username}
                                src={user.photo}
                              />
                            ))}
                          <p variant="body1">{image.username}</p>
                        </div>
                      </button>
                      <h5 sx={{ mt: 2, padding: "0 10px" }}>{image.title}</h5>
                      <p sx={{ padding: "0 10px" }}>{image.description}</p>
                      <button
                        className="moreBtn"
                        onClick={() => handleActions("details", image.id)}
                      >
                        View Details
                      </button>
                    </ImageListItem>
                  </div>
                </div>
              ))}
            </ImageList>
          </div>
        </>
      )}
    </>
  );
};

export default Explore;

const imagesData = [
  {
    id: 10001,
    image: "https://www.lawsonstate.edu/_resources/assets/img/art9.jpg",
    title: "street art",
    username: "John Doe",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 10002,
    image:
      "https://i.pinimg.com/736x/bc/0c/91/bc0c9132a101d19b4a48595431cad174.jpg",
    title: "alone tree",
    username: "Sara White",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 10003,
    image:
      "https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/06/Female_Woods_hike_1296x728-header-1-1296x728.jpg?w=1155&h=1528",
    title: "traveling gril",
    username: "John Doe",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 10004,
    image:
      "https://webunwto.s3.eu-west-1.amazonaws.com/s3fs-public/2024-04/a-united-vision-for-nature-nature-positive-report-marks-new-collaborative-era-in-travel-tourism_0.jpeg",
    title: "birds",
    username: "Rose Franco",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 10005,
    image:
      "https://d150u0abw3r906.cloudfront.net/wp-content/uploads/2022/04/image27-1.png",
    title: "sky in red",
    username: "Sara White",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 10006,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfTDz-7dEcxbNCoIXnyckKJyAWAFxpl-iVdQ&s",
    title: "waiting",
    username: "John Doe",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 10007,
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9reW98ZW58MHx8MHx8fDA%3D",
    title: "tokyo",
    username: "Sara White",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 10008,
    image: "https://www.stockvault.net/data/2007/03/01/100489/thumb16.jpg",
    title: "cute cats",
    username: "Sara White",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 10009,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ420JgwLszDTEn64qbPl6KE3HXk21KI5UjqA&s",
    title: "hug me!",
    username: "John Doe",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 100010,
    image:
      "https://img.goodfon.com/wallpaper/big/f/6c/noch-gorod-parizh-frantsiia-foto.webp",
    title: "paris",
    username: "Rose Franco",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 100011,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL2de_EUA1aFedrjCcpFf8FbMObTcG3BkGcQ&s",
    title: "sheep",
    username: "Sara White",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 100012,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQNW-jSWoQKZ6-ddqD2kceunOYxSUOgGolqQ&s",
    title: "sunset",
    username: "John Doe",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 100013,
    image:
      "https://hips.hearstapps.com/hmg-prod/images/cute-baby-animals-1558535060.jpg",
    title: "baby dogs",
    username: "Sara White",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 100014,
    image:
      "https://media.istockphoto.com/id/612630478/photo/hong-kong-night-scene.jpg?s=612x612&w=0&k=20&c=LaqZW6aNVDZml82sogDY_JIsZflcKoZIXO8yeics5BA=",
    title: "neon",
    username: "Rose Franco",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 100015,
    image: "https://theclick.us/wp-content/uploads/2023/10/DaneShitagi.jpg",
    title: "fly",
    username: "John Doe",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 100016,
    image:
      "https://cdn-blog.superprof.com/blog_gb/wp-content/uploads/2018/02/photography-equipment.jpg",
    title: "set up",
    username: "Deann Braunstein",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 100017,
    image:
      "https://www.boredpanda.com/blog/wp-content/uploads/2022/01/61d2ea9a927a7_yipjnybxtj761__700.jpg",
    title: "pink!!!",
    username: "Juan Stokes",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 10001,
    image: "https://a-z-animals.com/media/2021/12/Friesian2.jpg",
    title: "black!",
    username: "John Doe",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 100018,
    image:
      "https://english.cdn.zeenews.com/sites/default/files/2025/01/10/1630385-beaches1.jpg",
    title: "summer",
    username: "Juan Stokes",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 100019,
    image:
      "https://i.pinimg.com/736x/bd/4a/56/bd4a56023b80b6b66f34cfaae9d8b20b.jpg",
    title: "rock",
    username: "John Doe",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 100020,
    image:
      "https://media.istockphoto.com/id/1322052213/photo/hand-holding-magnifying-glass-in-front-of-real-text.jpg?s=612x612&w=0&k=20&c=5oKu73TP5RmPT68po-c-LFXYoM98N14j0XGVcBYiOcs=",
    title: "real",
    username: "Juan Stokes",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 100021,
    image:
      "https://www.earth.com/assets/_next/image/?url=https%3A%2F%2Fcff2.earth.com%2Fuploads%2F2023%2F05%2F16064103%2FFarms-1400x850.jpg&w=1200&q=75",
    title: "big!",
    username: "Deann Braunstein",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 100022,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSksYfHt40kSdDF_Ceb1ZPjH-va3jvvJjuzeg&s",
    title: "family",
    username: "Deann Braunstein",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 100023,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUzA-wcI1QdebbUDW-4g4hlXvPUYoGLfQ3xg&s",
    title: "yellow",
    username: "Juan Stokes",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 100024,
    image:
      "https://www.farmaid.org/wp-content/uploads/2015/08/field_with_tractor_and_bales.jpg",
    title: "dont give up",
    username: "Don Clark",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 100025,
    image:
      "https://static.wixstatic.com/media/11062b_6037002b50f24c58b2dc28b405438497~mv2_d_5781_3854_s_4_2.jpg/v1/fill/w_568,h_378,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/11062b_6037002b50f24c58b2dc28b405438497~mv2_d_5781_3854_s_4_2.jpg",
    title: "whaaat",
    username: "Juan Stokes",
    description:
      "Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
];

const usersData = [
  {
    comments: [],
    description: "",
    rating: 4,
    password: "12345",
    photo: "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    username: "John Doe",
  },
  {
    comments: [],
    description: "",
    rating: 5,
    password: "12345",
    photo: "https://static.vecteezy.com/system/resources/previews/001/993/889/non_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg",
    username: "Sara White",
  },
  {
    comments: [],
    description: "",
    rating: 3,
    password: "12345",
    photo: "https://static.vecteezy.com/system/resources/previews/002/002/427/non_2x/man-avatar-character-isolated-icon-free-vector.jpg",
    username: "Juan Stokes",
  },
  {
    comments: [],
    description: "",
    rating: 5,
    password: "12345",
    photo: "https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg",
    username: "Rose Franco",
  },
  {
    comments: [],
    description: "",
    rating: 4,
    password: "12345",
    photo: "https://static.vecteezy.com/system/resources/previews/001/921/774/non_2x/beautiful-woman-red-hair-in-frame-circular-avatar-character-free-vector.jpg",
    username: "Deann Braunstein",
  },
  {
    comments: [],
    description: "",
    rating: 3,
    password: "12345",
    photo: "https://static.vecteezy.com/system/resources/previews/002/002/263/non_2x/black-man-with-beard-avatar-character-free-vector.jpg",
    username: "Don Clark",
  },
];
