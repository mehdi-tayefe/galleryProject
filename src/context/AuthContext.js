import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap around the app 
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Load user from localStorage when the app starts
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        // Ensure rating is initialized as an empty array if missing
        user.rating = user.rating || [];
        setCurrentUser(user); // Parse user data as an object
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
    }
  }, []);

  // Login function
  const login = (username, password) => {
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        // Store full user data in currentUser
        localStorage.setItem("currentUser", JSON.stringify(user));
        setCurrentUser(user);
        return true;
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
    return false;
  };

  // Logout function
  const logout = () => {
    try {
      window.location.href = "/"; // Redirect to home page
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Register function
  const register = (username, password, photo, description) => {
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.some((u) => u.username === username);

      if (userExists) {
        return false; // Username already exists
      }

      // Create a new user object with additional fields
      const newUser = {
        username,
        password,
        photo, // Store photo as a base64 string or file URL
        description,
        rating: 0, // Ensure rating is initialized as an empty array
        comments: [], // Initialize comments
      };

      // Add the new user to the list
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Automatically log the user in after registration
      login(username, password);
      return true;
    } catch (error) {
      console.error("Error during registration:", error);
      return false;
    }
  };

  // Update profile function
  const updateProfile = (newProfileData) => {
    if (!currentUser) return; // If no current user, do nothing

    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = users.findIndex(
        (u) => u.username === currentUser.username
      ); // Find the current user by username

      if (userIndex !== -1) {
        // Update the user's profile with new data
        users[userIndex] = { ...users[userIndex], ...newProfileData };

        // Update localStorage with the new users list
        localStorage.setItem("users", JSON.stringify(users));

        // Update currentUser state with new profile fields
        const updatedUser = users[userIndex];
        setCurrentUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Error during profile update:", error);
    }
  };

  // Change password function
  const changePassword = (currentPassword, newPassword) => {
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = users.findIndex(
        (u) => u.username === currentUser.username
      );

      if (userIndex !== -1 && users[userIndex].password === currentPassword) {
        // Update the user's password
        users[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));

        // Optionally update the local currentUser state (not strictly necessary)
        const updatedUser = { ...users[userIndex] };
        setCurrentUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        console.log("Password changed successfully");
      } else {
        console.log("Current password is incorrect");
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        register,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export the AuthContext
export default AuthContext;
