/*Kaiyan (s3898303), Moosa (s3898303)*/
/* MyProfile.js */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { editUser, deleteUser, removeUser } from "../data/repository";
import '../style/UserProfile.css'; // Import your CSS file

export default function MyProfile(props) {
  const [name, setName] = useState(props.user.name);
  const [isEditing, setIsEditing] = useState(false); 
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setName(props.user.name); // Reset name changes
  };

  const handleSaveClick = async () => {
    await editUser(props.user.email, name);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteUser(props.user.email);
    removeUser();
    props.logoutUser();
    navigate("/");
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-section">
        <p className="profile-label">Email:</p>
        <p className="profile-value">{props.user.email}</p>
      </div>
      <div className="profile-section">
        <p className="profile-label">Name:</p>
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="profile-input"
          />
        ) : (
          <p className="profile-value">{name}</p>
        )}
      </div>
      <div className="profile-button-group">
        {isEditing ? (
          <>
            <button onClick={handleSaveClick} className="profile-button save-button">Save</button>
            <button onClick={handleCancelClick} className="profile-button cancel-button">Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleEditClick} className="profile-button edit-button">Edit Profile</button>
            <button onClick={handleDelete} className="profile-button delete-button">Delete Account</button>
          </>
        )}
      </div>
    </div>
  );
}