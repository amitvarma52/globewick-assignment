/** @format */

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });
  if (!user) {
    return null;
  }
  return (
    <div className="container mt-5 ">
      <h1 className="text-primary">
        Welcome! {user.firstName} {user.lastName}
      </h1>
      <h3 className="pt-3 ">Your account details </h3>
      <p>Email : {user.email}</p>
      <p>Gender : {user.gender}</p>
      <p>DOB : {new Date(user.dateOfBirth).toLocaleDateString()}</p>
      <p>Country Code : +{user.countryCode}</p>
      <p>Phone : {user.phoneNumber}</p>
      <p>created on :{new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default Welcome;
