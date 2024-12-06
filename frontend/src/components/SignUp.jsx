/** @format */

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset, 
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        data
      );
      alert(response.data.message);
      reset(); 
    } catch (error) {
      console.error(error.response?.data?.message || "Signup failed");
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  const password = watch("password");

  return (
    <div className="container mt-5">
      <h2 className="text-danger mb-4">Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            {...register("firstName", { required: "First Name is required" })}
          />
          {errors.firstName && (
            <div className="invalid-feedback">{errors.firstName.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            {...register("lastName", { required: "Last Name is required" })}
          />
          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="countryCode" className="form-label">
            Country Code
          </label>
          <input
            type="number"
            className={`form-control ${errors.countryCode ? "is-invalid" : ""}`}
            {...register("countryCode", {
              required: "Country Code is required",
              pattern: {
                value: /^\d{2}$/,
                message: "country code must be 2 digits",
              },
            })}
          />
          {errors.countryCode && (
            <div className="invalid-feedback">{errors.countryCode.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
            {...register("phoneNumber", {
              required: "Phone Number is required",
              pattern: {
                value: /^\d{10,15}$/,
                message: "Phone Number must be 10-15 digits",
              },
            })}
          />
          {errors.phoneNumber && (
            <div className="invalid-feedback">{errors.phoneNumber.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className={`form-control ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="dateOfBirth" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            className={`form-control ${errors.dateOfBirth ? "is-invalid" : ""}`}
            {...register("dateOfBirth", {
              required: "Date of Birth is required",
            })}
          />
          {errors.dateOfBirth && (
            <div className="invalid-feedback">{errors.dateOfBirth.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            className={`form-select ${errors.gender ? "is-invalid" : ""}`}
            {...register("gender", { required: "Gender is required" })}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <div className="invalid-feedback">{errors.gender.message}</div>
          )}
        </div>

        <button type="submit" className="text-center btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};
export default Signup;