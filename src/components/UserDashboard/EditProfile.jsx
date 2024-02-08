import React from "react";
import "../../css/edit-profile.css";

function EditProfile({ isMenuShow }) {
  return (
    <div
      className={
        !isMenuShow ? "edit-profile" : "edit-profile-blur"
      }
    >
      <div className="fields">
        Edit Profile
      </div>
    </div>
  );
}

export default EditProfile;
