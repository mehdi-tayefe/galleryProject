import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/loginAndSignUp/Login";
import Signup from "./pages/loginAndSignUp/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Explore from "./pages/explor/Explore";
import ImageDetails from "./pages/imageDetails/ImageDetails";
import ImageUploader from "./pages/imageUploader/ImageUploader";
import EditProfile from "./pages/profile/EditProfile";
import CreatorProfile from "./pages/profile/profile";
import PhotoGraphers from "./pages/photographers/photographers";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Explore />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<ImageUploader />} />
          <Route path="/photographers" element={<PhotoGraphers />} />
          <Route path="/image/:id" element={<ImageDetails />} />
          <Route path="/creator-profile/:username" element={<CreatorProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
